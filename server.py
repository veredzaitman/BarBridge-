from __future__ import annotations

import csv
import io
import json
import os
import re
import time
from dataclasses import dataclass
from datetime import datetime, timezone
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Dict, Iterable, List, Optional
from urllib.request import urlopen


ROOT = Path(__file__).resolve().parent
HOST = os.environ.get("HOST", "0.0.0.0")
PORT = int(os.environ.get("PORT", "8080"))
REMOTE_TIMEOUT_SECONDS = 20

BILLS_URL = "https://production.oknesset.org/pipelines/data/bills/kns_bill/kns_bill.csv"
BILL_INITIATORS_URL = (
    "https://production.oknesset.org/pipelines/data/bills/kns_billinitiator/kns_billinitiator.csv"
)
PEOPLE_URL = "https://production.oknesset.org/pipelines/data/members/kns_person/kns_person.csv"
COMMITTEES_URL = (
    "https://production.oknesset.org/pipelines/data/committees/kns_committee/kns_committee.csv"
)
STATUSES_URL = "https://production.oknesset.org/pipelines/data/knesset/kns_status/kns_status.csv"
DOCUMENT_BILLS_URL = (
    "https://production.oknesset.org/pipelines/data/bills/kns_documentbill/kns_documentbill.csv"
)
KNESSET_BILL_URL_TEMPLATE = (
    "https://main.knesset.gov.il/Activity/Legislation/Laws/Pages/LawBill.aspx"
    "?t=lawsuggestionssearch&lawitemid={bill_id}"
)
MAX_RESULTS = 60
MIN_RISK_SCORE = 55
CACHE_TTL_SECONDS = 900
SPECIAL_MEMBER_PERSON_ID = "30812"
SPECIAL_MEMBER_NAME = "ח\"כ שמחה רוטמן"
ATTORNEY_GENERAL_TOPIC_LABEL = "מעמד היועץ המשפטי לממשלה"
ATTORNEY_GENERAL_TOPIC_PATTERNS = [
    r"היועץ המשפטי לממשלה",
    r"היועצת המשפטית לממשלה",
    r"יועמ\"ש",
    r"יועמ׳ש",
    r"יועמ״ש",
]


DEMO_BILLS = [
    {
        "id": "bill-101",
        "title": "הצעת חוק הגבלת ביקורת שיפוטית על מינויים ממשלתיים",
        "summary": "צמצום דרמטי של יכולת בתי המשפט להתערב במינויים בכירים ובפסילת החלטות מנהליות גם כאשר נטענת חריגה קיצונית מסמכות.",
        "sponsor": 'ח"כ ארז דגן',
        "committee": "ועדת החוקה",
        "status": "הכנה לקריאה ראשונה",
        "severity": "קיצונית",
        "harmArea": "פגיעה בעצמאות הרשות השופטת",
        "riskScore": 92,
        "updatedAt": "2026-03-27T11:30:00+00:00",
        "nextStep": "דיון הכנה בוועדה ביום שני",
        "riskNote": "מחלישה בלם מרכזי על הרשות המבצעת ומצמצמת ביקורת אפקטיבית על מינויים פוליטיים.",
        "tags": ["מערכת משפט", "איזונים ובלמים", "מינויים"],
    },
    {
        "id": "bill-102",
        "title": "הצעת חוק הרחבת סמכויות סגירת כלי תקשורת בצו מנהלי",
        "summary": "הענקת סמכות לשר להורות על השעיית פעילות של גוף שידור או אתר חדשות לתקופה ממושכת ללא הליך שיפוטי מלא ומיידי.",
        "sponsor": 'ח"כ עדי כץ',
        "committee": "ועדת הכלכלה",
        "status": "קריאה טרומית",
        "severity": "קיצונית",
        "harmArea": "פגיעה בחופש העיתונות והביטוי",
        "riskScore": 95,
        "updatedAt": "2026-03-26T09:10:00+00:00",
        "nextStep": "הצבעה במליאה על העברה לוועדה",
        "riskNote": "פותחת פתח לצנזורה שלטונית ולהרתעת כלי תקשורת באמצעות הליך מנהלי מהיר.",
        "tags": ["תקשורת", "חופש ביטוי", "צנזורה"],
    },
]

CURATED_BILLS = [
    {
        "id": "curated-death-penalty-terrorism",
        "title": "הצעת חוק עונש מוות למחבלים",
        "summary": "הצעה להרחיב את האפשרות להטיל עונש מוות בעבירות טרור מסוימות, תוך צמצום חסמים פרוצדורליים והרחבת שיקול הדעת הענישתי של המדינה.",
        "sponsor": "פריט מנוהל ידנית",
        "committee": "ועדת החוקה",
        "status": "הכנה לקריאה ראשונה",
        "monitoringStage": "הכנה לקריאה ראשונה",
        "severity": "גבוהה",
        "harmArea": "פגיעה בזכויות נאשמים ובבלמים מוסדיים",
        "riskScore": 78,
        "updatedAt": "2026-03-28T00:00:00+00:00",
        "nextStep": "מעקב אחר דיון הכנה והתקדמות בוועדה",
        "riskNote": "לפי מסגרת הסיכון של האפליקציה, הרחבת עונש מוות במשפט פלילי מעלה חשש לפגיעה בזכות להליך הוגן, להעצמת ענישה בלתי הפיכה תחת לחץ פוליטי וביטחוני, ולהחלשת ריסונים מוסדיים במצבי קצה.",
        "tags": ["עונש מוות", "הליך הוגן", "זכויות נאשמים", "משפט פלילי"],
        "backgroundMaterials": [],
    }
]


@dataclass(frozen=True)
class Rule:
    name: str
    patterns: List[str]
    score: int
    harm_area: str
    note: str
    tags: List[str]


RULES = [
    Rule(
        name="judiciary",
        patterns=[
            r"ביקורת שיפוטית",
            r"ועדה לבחירת שופטים",
            r"חסינות",
            r"יועמ\"ש",
            r"היועץ המשפטי",
            r"בית המשפט",
        ],
        score=36,
        harm_area="פגיעה בעצמאות הרשות השופטת",
        note="מצמצם את עצמאות המערכת המשפטית או את היכולת לבקר את הרשות המבצעת.",
        tags=["מערכת משפט", "איזונים ובלמים"],
    ),
    Rule(
        name="media",
        patterns=[r"תקשורת", r"שידור", r"עיתונות", r"צנזורה", r"חדשות"],
        score=34,
        harm_area="פגיעה בחופש העיתונות והביטוי",
        note="מעלה חשש לצנזורה, השתקה או לחץ רגולטורי על כלי תקשורת וביטוי פוליטי.",
        tags=["תקשורת", "חופש ביטוי"],
    ),
    Rule(
        name="elections",
        patterns=[r"בחירות", r"ועדת הבחירות", r"ספירת קולות", r"תעמולת בחירות"],
        score=38,
        harm_area="פגיעה בהוגנות הבחירות",
        note="משפיע על שלמות הליך הבחירות, ניטרליות הניהול או שוויון ההשתתפות הפוליטית.",
        tags=["בחירות", "הליך דמוקרטי"],
    ),
    Rule(
        name="protest",
        patterns=[r"מחאה", r"מפגינים", r"הפגנה", r"ביומטר", r"מעקב", r"ניטור"],
        score=30,
        harm_area="פגיעה בחופש המחאה והפרטיות",
        note="מגדיל מעקב, הרתעה או הגבלות על השתתפות אזרחית בפעילות פוליטית חוקית.",
        tags=["מחאה", "פרטיות"],
    ),
    Rule(
        name="civil_society",
        patterns=[r"עמותה", r"עמותות", r"ארגון", r"חברה אזרחית", r"מימון זר", r"זכויות אדם"],
        score=28,
        harm_area="פגיעה בחברה האזרחית ובחופש ההתאגדות",
        note="עלול להכביד על ארגוני ביקורת, סנגור וזכויות אדם באופן מצנן או מפלה.",
        tags=["חברה אזרחית", "התאגדות"],
    ),
    Rule(
        name="oversight",
        patterns=[r"חקירה", r"נציב", r"מבקר המדינה", r"משטרה", r"חסינות"],
        score=26,
        harm_area="פגיעה במנגנוני פיקוח ואכיפה",
        note="מקשה על פיקוח, ביקורת או אכיפה שוויונית מול נבחרי ציבור או רשויות.",
        tags=["פיקוח", "אכיפה"],
    ),
]

_CACHE: Dict[str, object] = {
    "payload": None,
    "expires_at": 0.0,
}


class AppHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):
        if self.path == "/api/bills":
            self.handle_api_bills()
            return

        super().do_GET()

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def handle_api_bills(self):
        try:
            payload = fetch_live_payload()
            body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
            self.send_response(200)
        except Exception as exc:  # pragma: no cover - defensive fallback
            payload = {
                "items": merge_curated_bills(DEMO_BILLS),
                "sourceLabel": "Fallback מקומי",
                "sourceKind": "demo",
                "fallback": True,
                "fetchedAt": utc_now_iso(),
                "error": str(exc),
            }
            body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
            self.send_response(200)

        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


def fetch_live_payload() -> Dict[str, object]:
    if _CACHE["payload"] and time.time() < _CACHE["expires_at"]:
        return dict(_CACHE["payload"])

    bills = merge_curated_bills(fetch_open_knesset_bills())
    payload = {
        "items": bills,
        "sourceLabel": "כנסת פתוחה / CSV יומי",
        "sourceKind": "remote",
        "fallback": False,
        "fetchedAt": utc_now_iso(),
    }
    _CACHE["payload"] = payload
    _CACHE["expires_at"] = time.time() + CACHE_TTL_SECONDS
    return dict(payload)


def fetch_open_knesset_bills() -> List[Dict[str, object]]:
    bill_rows = read_csv_rows(BILLS_URL)
    initiator_rows = read_csv_rows(BILL_INITIATORS_URL)
    person_rows = read_csv_rows(PEOPLE_URL)
    committee_rows = read_csv_rows(COMMITTEES_URL)
    status_rows = read_csv_rows(STATUSES_URL)
    document_rows = read_csv_rows(DOCUMENT_BILLS_URL)

    people_by_id = {
        row.get("PersonID"): join_person_name(row.get("FirstName"), row.get("LastName"))
        for row in person_rows
        if row.get("PersonID")
    }
    committees_by_id = {
        row.get("CommitteeID"): row.get("Name", "").strip()
        for row in committee_rows
        if row.get("CommitteeID")
    }
    statuses_by_id = {
        row.get("StatusID"): first_non_empty(
            row.get("Description"),
            row.get("StatusDesc"),
            row.get("Name"),
            row.get("StatusName"),
        )
        for row in status_rows
        if row.get("StatusID")
    }
    background_materials_by_bill = build_background_materials(document_rows)

    initiators_by_bill: Dict[str, List[tuple]] = {}
    rothman_bill_ids = set()
    for row in initiator_rows:
        bill_id = row.get("BillID")
        person_id = row.get("PersonID")
        if not bill_id or not person_id:
            continue
        if normalize_bool(row.get("IsInitiator")) is False:
            continue
        ordinal = safe_int(row.get("Ordinal"), 999)
        initiators_by_bill.setdefault(bill_id, []).append((ordinal, people_by_id.get(person_id)))
        if person_id == SPECIAL_MEMBER_PERSON_ID:
            rothman_bill_ids.add(bill_id)

    current_knesset = max((safe_int(row.get("KnessetNum")) for row in bill_rows if row.get("KnessetNum")), default=0)
    results = []

    for row in bill_rows:
        title = (row.get("Name") or "").strip()
        summary = normalize_summary(row.get("SummaryLaw"))
        if not title:
            continue

        publication_date = first_non_empty(row.get("PublicationDate"), row.get("LastUpdatedDate"))
        is_attorney_general_bill = matches_attorney_general_topic(
            title=title,
            summary=summary,
            subtype=first_non_empty(row.get("SubTypeDesc"), row.get("TypeDesc")),
            publication_date=publication_date,
        )
        if safe_int(row.get("KnessetNum")) != current_knesset and not is_attorney_general_bill:
            continue

        committee_name = committees_by_id.get(row.get("CommitteeID")) or "לא שויך"
        subtype = first_non_empty(row.get("SubTypeDesc"), row.get("TypeDesc"))
        status = statuses_by_id.get(row.get("StatusID")) or f"סטטוס {row.get('StatusID') or 'לא ידוע'}"
        updated_at = first_non_empty(row.get("LastUpdatedDate"), row.get("PublicationDate"))

        classification = classify_bill(
            title=title,
            summary=summary,
            committee_name=committee_name,
            subtype=subtype,
            status=status,
        )
        is_rothman_bill = (row.get("BillID") or "") in rothman_bill_ids
        if not classification and not is_rothman_bill and not is_attorney_general_bill:
            continue
        if classification and classification["riskScore"] < MIN_RISK_SCORE and not is_rothman_bill and not is_attorney_general_bill:
            continue
        if not classification and is_rothman_bill:
            classification = build_manual_review_classification()
        if not classification and is_attorney_general_bill:
            classification = build_attorney_general_classification()

        sponsor_names = sorted(initiators_by_bill.get(row.get("BillID"), []), key=lambda item: item[0])
        sponsor = ", ".join(name for _, name in sponsor_names if name) or "יוזם לא זמין"

        results.append(
            {
                "id": row.get("BillID") or title,
                "title": title,
                "summary": summary or "לא פורסם תקציר במקור הנתונים.",
                "sponsor": sponsor,
                "committee": committee_name,
                "status": status,
                "monitoringStage": normalize_monitoring_stage(status),
                "severity": classification["severity"],
                "harmArea": classification["harmArea"],
                "riskScore": classification["riskScore"],
                "updatedAt": normalize_datetime(updated_at),
                "nextStep": infer_next_step(status),
                "riskNote": classification["riskNote"],
                "tags": classification["tags"] + [tag for tag in [subtype] if tag],
                "knessetUrl": build_knesset_bill_url(row.get("BillID")),
                "backgroundMaterials": background_materials_by_bill.get(row.get("BillID"), []),
                "isSpecialMemberBill": is_rothman_bill,
                "isAttorneyGeneralStatusBill": is_attorney_general_bill,
                "specialTopicLabel": ATTORNEY_GENERAL_TOPIC_LABEL if is_attorney_general_bill else "",
            }
        )

    results.sort(
        key=lambda item: (
            1 if item.get("isAttorneyGeneralStatusBill") else 0,
            1 if item.get("isSpecialMemberBill") else 0,
            item["riskScore"],
            item["updatedAt"],
        ),
        reverse=True,
    )
    return results[: max(MAX_RESULTS, len(results))]


def merge_curated_bills(items: List[Dict[str, object]]) -> List[Dict[str, object]]:
    merged = list(CURATED_BILLS)
    seen_ids = {item["id"] for item in CURATED_BILLS}
    for item in items:
        item_id = item.get("id")
        if item_id in seen_ids:
            continue
        merged.append(item)
        seen_ids.add(item_id)
    return merged


def build_background_materials(document_rows: List[Dict[str, str]]) -> Dict[str, List[Dict[str, str]]]:
    materials_by_bill: Dict[str, List[Dict[str, str]]] = {}
    seen_materials = set()
    for row in document_rows:
        bill_id = row.get("BillID")
        group_type = (row.get("GroupTypeDesc") or "").strip()
        file_path = normalize_file_url(row.get("FilePath"))
        if not bill_id or "חומר רקע" not in group_type or not file_path:
            continue
        extension = (row.get("ApplicationDesc") or "").strip() or guess_extension(file_path)
        material_key = (bill_id, file_path)
        if material_key in seen_materials:
            continue
        seen_materials.add(material_key)
        entry = {
            "label": f"חומר רקע ({extension})" if extension else "חומר רקע",
            "url": file_path,
            "type": extension or "קובץ",
        }
        materials_by_bill.setdefault(bill_id, []).append(entry)
    for bill_id, entries in materials_by_bill.items():
        entries.sort(key=lambda item: (item["type"], item["url"]))
    return materials_by_bill


def build_knesset_bill_url(bill_id: Optional[str]) -> str:
    cleaned_bill_id = str(bill_id or "").strip()
    if not cleaned_bill_id.isdigit():
        return ""
    return KNESSET_BILL_URL_TEMPLATE.format(bill_id=cleaned_bill_id)


def classify_bill(*, title: str, summary: str, committee_name: str, subtype: str, status: str) -> Optional[Dict[str, object]]:
    text = " ".join([title, summary, committee_name, subtype, status]).lower()
    matched_rules = []
    score = 0

    for rule in RULES:
        if any(re.search(pattern, text, re.IGNORECASE) for pattern in rule.patterns):
            matched_rules.append(rule)
            score += rule.score

    if committee_name == "ועדת החוקה":
        score += 12
    if "יסוד" in text:
        score += 8
    if not matched_rules:
        return None

    score = min(99, score)
    primary_rule = max(matched_rules, key=lambda item: item.score)
    severity = "בינונית"
    if primary_rule.name == "judiciary":
        score = max(score, 85)
        severity = "קיצונית"
    elif score >= 85:
        severity = "קיצונית"
    elif score >= 68:
        severity = "גבוהה"

    tags = unique_preserving_order(tag for rule in matched_rules for tag in rule.tags)
    notes = unique_preserving_order(rule.note for rule in matched_rules)

    return {
        "severity": severity,
        "harmArea": primary_rule.harm_area,
        "riskScore": score,
        "riskNote": " ".join(notes[:2]),
        "tags": tags[:4],
    }


def build_manual_review_classification() -> Dict[str, object]:
    return {
        "severity": "בינונית",
        "harmArea": "נדרש מיון ידני",
        "riskScore": 60,
        "riskNote": "ההצעה נוספה למעקב משום שיוזם ההצעה הוא ח\"כ שמחה רוטמן, אך היא טרם סווגה אוטומטית כמסכנת דמוקרטיה ונדרשת בחינה ידנית.",
        "tags": ["שמחה רוטמן", "מיון ידני"],
    }


def build_attorney_general_classification() -> Dict[str, object]:
    return {
        "severity": "גבוהה",
        "harmArea": ATTORNEY_GENERAL_TOPIC_LABEL,
        "riskScore": 74,
        "riskNote": "ההצעה נמשכה למעקב משום שהיא עוסקת במעמדו, בסמכויותיו או במבנה התפקיד של היועץ המשפטי לממשלה בשנים 2023–2025.",
        "tags": [ATTORNEY_GENERAL_TOPIC_LABEL, "מיון נושאי"],
    }


def matches_attorney_general_topic(*, title: str, summary: str, subtype: str, publication_date: str) -> bool:
    if not is_date_in_range(publication_date, 2023, 2025):
        return False
    text = " ".join([title, summary, subtype])
    return any(re.search(pattern, text, re.IGNORECASE) for pattern in ATTORNEY_GENERAL_TOPIC_PATTERNS)


def normalize_monitoring_stage(status: str) -> str:
    status = status or ""
    if "הכנה" in status and "ראשונה" in status:
        return "הכנה לקריאה ראשונה"
    if "הכנה" in status and "שנייה" in status and "שלישית" in status:
        return "הכנה לקריאה שנייה ושלישית"
    return ""


def read_csv_rows(url: str) -> List[Dict[str, str]]:
    with urlopen(url, timeout=REMOTE_TIMEOUT_SECONDS) as response:
        charset = response.headers.get_content_charset() or "utf-8"
        body = response.read().decode(charset, errors="replace")
    return list(csv.DictReader(io.StringIO(body)))


def join_person_name(first_name: Optional[str], last_name: Optional[str]) -> str:
    return " ".join(part for part in [first_name, last_name] if part and part.strip()).strip()


def normalize_summary(summary: Optional[str]) -> str:
    if not summary:
        return ""
    return " ".join(summary.replace("\r", " ").replace("\n", " ").split())


def normalize_datetime(value: Optional[str]) -> str:
    if not value:
        return utc_now_iso()

    cleaned = value.strip()
    for fmt in ("%Y-%m-%dT%H:%M:%S", "%Y-%m-%d %H:%M:%S"):
        try:
            parsed = datetime.strptime(cleaned, fmt)
            return parsed.replace(tzinfo=timezone.utc).isoformat()
        except ValueError:
            continue

    return cleaned


def normalize_file_url(value: Optional[str]) -> str:
    if not value:
        return ""
    cleaned = re.sub(r"[\x00-\x1f]", "", value).replace("\\", "/").strip()
    cleaned = cleaned.replace("https:/", "https://").replace("http:/", "http://")
    if cleaned.startswith("https://"):
        cleaned = "https://" + re.sub(r"/{2,}", "/", cleaned[len("https://") :])
    elif cleaned.startswith("http://"):
        cleaned = "http://" + re.sub(r"/{2,}", "/", cleaned[len("http://") :])
    else:
        cleaned = re.sub(r"/{2,}", "/", cleaned)
    return cleaned


def guess_extension(file_url: str) -> str:
    suffix = Path(file_url).suffix.replace(".", "").upper()
    return suffix


def is_date_in_range(value: str, start_year: int, end_year: int) -> bool:
    if not value:
        return False
    year_fragment = str(value).strip()[:4]
    if not year_fragment.isdigit():
        return False
    year = int(year_fragment)
    return start_year <= year <= end_year


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def infer_next_step(status: str) -> str:
    status = status or ""
    if "טרומית" in status:
        return "מעקב אחר דיון במליאה או העברה לוועדה"
    if "ראשונה" in status:
        return "מעקב אחר הכנה לקריאה שנייה ושלישית"
    if "שנייה" in status or "שלישית" in status:
        return "מעקב אחר הצבעה סופית במליאה"
    if "ועדה" in status:
        return "מעקב אחר ישיבת ועדה והכנת נוסח"
    if "מליאה" in status:
        return "מעקב אחר פרסום תוצאות ההצבעה"
    return "בדיקת סטטוס חקיקה מעודכן"


def safe_int(value: Optional[str], default: int = 0) -> int:
    try:
        return int(value)
    except (TypeError, ValueError):
        return default


def normalize_bool(value: Optional[str]) -> Optional[bool]:
    if value is None or value == "":
        return None
    return str(value).strip().lower() in {"true", "1", "yes"}


def first_non_empty(*values: Optional[str]) -> str:
    for value in values:
        if value and str(value).strip():
            return str(value).strip()
    return ""


def unique_preserving_order(values: Iterable[str]) -> List[str]:
    seen = set()
    result = []
    for value in values:
        if not value or value in seen:
            continue
        seen.add(value)
        result.append(value)
    return result


def main():
    os.chdir(ROOT)
    server = ThreadingHTTPServer((HOST, PORT), AppHandler)
    print(f"Serving on http://{HOST}:{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
