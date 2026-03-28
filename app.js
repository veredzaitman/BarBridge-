const countries = [
  {
    id: "hungary",
    countryHe: "הונגריה",
    countryEn: "Hungary",
    region: "אירופה",
    severity: "גבוהה מאוד",
    freedomStatus: "Partly Free",
    freedomScore: 65,
    summary:
      "מאז 2010 ממשלת פידס בראשות ויקטור אורבן ביססה שליטה גוברת במוסדות הבקרה, בתקשורת ובחברה האזרחית, תוך שימוש בשיח ריבונות ו'אנטי-התערבות' להצדקת ריכוז הכוח.",
    actions: [
      "שינויים חוקתיים וחקיקתיים ארוכי טווח שאפשרו לרוב השלטוני להחליש איזונים ובלמים ולהעמיק שליטה במוסדות עצמאיים.",
      "שימוש מתרחב במנגנון 'הגנת הריבונות' וביוזמות חקיקה נגד מימון זר כדי להרתיע עמותות, אקדמיה וכלי תקשורת ביקורתיים.",
      "המשך לחץ על תקשורת עצמאית באמצעות רגולציה, קמפיינים משמיצים וסביבה עסקית מוטה לטובת גופי מדיה מקורבים.",
      "לחץ מתמשך על עצמאות שיפוטית ועל שומרי סף משפטיים, כולל התנכלות לקולות פנימיים המבקרים את הנהגת מערכת המשפט.",
      "הרחבת שימוש בחקיקה תרבותית-זהותית, לרבות צעדים נגד קהילת הלהט\"ב, כדי לצמצם מרחב זכויות ולגייס תמיכה פוליטית פופוליסטית."
    ],
    bar: {
      name: "Magyar Ügyvédi Kamara",
      titleHe: "לשכת עורכי הדין ההונגרית",
      leader: "Dr. Havasi Dezső",
      leaderTitle: "President",
      sourceType: "official",
      verificationNote: "עמוד הנהגה רשמי פעיל, נבדק ב-28 במרץ 2026",
      website: "https://www.xn--mk-xka.hu/",
      leadershipSource: "https://www.xn--mk-xka.hu/tisztsegviselok",
      contactSource: "https://www.xn--mk-xka.hu/kapcsolat",
      address: "1055 Budapest, Szalay utca 7, Hungary",
      email: "muk@muknet.hu",
      phone: "+36-1-311-9800"
    },
    letterDate: "March 28, 2026",
    sources: [
      {
        label: "Freedom House 2025 - Hungary",
        url: "https://freedomhouse.org/country/hungary/freedom-world/2025"
      },
      {
        label: "Human Rights Watch 2026 - Hungary",
        url: "https://www.hrw.org/world-report/2026/country-chapters/hungary"
      },
      {
        label: "Hungarian Bar official leadership page",
        url: "https://www.xn--mk-xka.hu/tisztsegviselok"
      },
      {
        label: "Hungarian Bar contact page",
        url: "https://www.xn--mk-xka.hu/kapcsolat"
      }
    ]
  },
  {
    id: "turkey",
    countryHe: "טורקיה",
    countryEn: "Turkey",
    region: "אירו-אסיה",
    severity: "גבוהה מאוד",
    freedomStatus: "Not Free",
    freedomScore: 33,
    summary:
      "בטורקיה נמשכת ריכוזיות נשיאותית חריפה: הממשלה משתמשת במערכת הפלילית, ברגולציית תקשורת ובשליטה גוברת בבתי המשפט כדי לצמצם אופוזיציה, מחאה ועצמאות מקצועית.",
    actions: [
      "ריכוז הכוח בידי הנשיא והמפלגה השלטת תוך החלשה מתמשכת של הפרדת הרשויות ושל הפיקוח הפרלמנטרי.",
      "מעצרים, חקירות והליכים פליליים נגד יריבים פוליטיים, עיתונאים, מפגינים ופעילי חברה אזרחית.",
      "שליטה רגולטורית ועסקית בשוק התקשורת, לצד צנזורה, חסימות מקוונות והעמדה לדין בגין ביקורת.",
      "שחיקה בעצמאות מערכת המשפט ואי-ציות לפסקי דין מחייבים של בית הדין האירופי לזכויות אדם.",
      "לחץ ישיר על לשכות עורכי דין ועורכי דין המייצגים נאשמים פוליטיים או מבקרים הפרות זכויות."
    ],
    bar: {
      name: "Union of Turkish Bar Associations",
      titleHe: "איגוד לשכות עורכי הדין של טורקיה",
      leader: "R. Erinç Sağkan",
      leaderTitle: "President",
      sourceType: "official",
      verificationNote: "מקור רשמי פעיל; כהונה מחודשת דווחה ב-13 בדצמבר 2024 ומופיעה גם בעדכוני 2026",
      website: "https://www.barobirlik.org.tr/en",
      leadershipSource: "https://www.barobirlik.org.tr/en/tbb-boards",
      contactSource: "https://www.barobirlik.org.tr/en/Contact",
      address: "Oğuzlar Mah. Barış Manço Cd. Av. Özdemir Özok Sk. No:8, Balgat, Ankara, Turkey",
      email: "info@barobirlik.org.tr",
      phone: "+90 312 292 59 00"
    },
    letterDate: "March 28, 2026",
    sources: [
      {
        label: "Freedom House 2025 - Turkey",
        url: "https://freedomhouse.org/country/turkey/freedom-world/2025"
      },
      {
        label: "Human Rights Watch 2026 - Türkiye",
        url: "https://www.hrw.org/world-report/2026/country-chapters/turkiye"
      },
      {
        label: "Union of Turkish Bar Associations - boards",
        url: "https://www.barobirlik.org.tr/en/tbb-boards"
      },
      {
        label: "Union of Turkish Bar Associations - contact",
        url: "https://www.barobirlik.org.tr/en/Contact"
      }
    ]
  },
  {
    id: "serbia",
    countryHe: "סרביה",
    countryEn: "Serbia",
    region: "אירופה",
    severity: "גבוהה",
    freedomStatus: "Partly Free",
    freedomScore: 56,
    summary:
      "בסרביה ניכרת שחיקה עקבית בזכויות פוליטיות ובחירויות אזרחיות באמצעות לחץ על התקשורת, סביבת בחירות בלתי הוגנת, שימוש בכוח כלפי מחאה והשפעה פוליטית על מוסדות המדינה.",
    actions: [
      "יצירת סביבת בחירות לא שוויונית באמצעות יתרון מבני למפלגת השלטון, שימוש במשאבי מדינה וטענות לזיופים ומניפולציה.",
      "לחץ חוקי וחוץ-חוקי על תקשורת עצמאית, כולל איומים, אלימות, תביעות השתקה ומעקב דיגיטלי.",
      "שימוש מופרז בכוח, מעצרים שרירותיים והטרדה של מפגינים ופעילי חברה אזרחית.",
      "חיזוק תלות מוסדית ופוליטיזציה של מנגנוני אכיפה, פיקוח ומשפט.",
      "שיח פופוליסטי המציג ביקורת פנימית וחיצונית כפגיעה בריבונות הלאומית ומצמצם מרחב לדיאלוג דמוקרטי."
    ],
    bar: {
      name: "Advokatska komora Srbije",
      titleHe: "לשכת עורכי הדין של סרביה",
      leader: "Dr Veljko Delibašić",
      leaderTitle: "President",
      sourceType: "official",
      verificationNote: "עמוד האורגנים הרשמי מציג את הנשיא המכהן; נבדק ב-28 במרץ 2026",
      website: "https://aks.org.rs/sr_lat/",
      leadershipSource: "https://aks.org.rs/sr_lat/organi/",
      contactSource: "https://aks.org.rs/sr_lat/contact/",
      address: "Dečanska 13/I, Belgrade, Serbia",
      email: "office@aks.org.rs",
      phone: "+381 11 32 39 072"
    },
    letterDate: "March 28, 2026",
    sources: [
      {
        label: "Freedom House 2025 - Serbia",
        url: "https://freedomhouse.org/country/serbia/freedom-world/2025"
      },
      {
        label: "Human Rights Watch 2026 - Serbia/Kosovo",
        url: "https://www.hrw.org/world-report/2026/country-chapters/serbia/kosovo"
      },
      {
        label: "Freedom on the Net 2025 - Serbia",
        url: "https://freedomhouse.org/country/serbia/freedom-net/2025"
      },
      {
        label: "Bar Association of Serbia - official organs page",
        url: "https://aks.org.rs/sr_lat/organi/"
      }
    ]
  },
  {
    id: "georgia",
    countryHe: "גאורגיה",
    countryEn: "Georgia",
    region: "אירו-אסיה",
    severity: "גבוהה מאוד",
    freedomStatus: "Partly Free",
    freedomScore: 55,
    summary:
      "בגאורגיה חלה החרפה מהירה במיוחד בשנים 2024-2026: הממשלה קידמה חקיקת 'סוכנים זרים', הרחיבה לחץ על מחאה ותקשורת, ופגעה עוד יותר במסלול האינטגרציה הדמוקרטי-אירופי.",
    actions: [
      "אימוץ והקשחה של חקיקת 'סוכנים זרים' כלפי ארגוני חברה אזרחית ויחידים המקבלים מימון זר, כולל איומי ענישה פלילית.",
      "הגבלת מרחב המחאה באמצעות פיזור אלים של הפגנות, מעצרים, קנסות נרחבים ופגיעה בעיתונאים המסקרים אותן.",
      "הקשחת שליטה ממשלתית על מימון חיצוני ועל פעילות של ארגונים בלתי ממשלתיים ומדיה ביקורתית.",
      "העמקת השפעה פוליטית על מוסדות המדינה ועל המערכת המשפטית, תוך פגיעה באמון הציבור בהליכי בחירות ושלטון החוק.",
      "קידום חקיקה שמצמצמת שוויון והגנות זכויות, לצד דה-לגיטימציה של מבקרי השלטון בשם 'ריבונות' ויציבות."
    ],
    bar: {
      name: "Georgian Bar Association",
      titleHe: "לשכת עורכי הדין של גאורגיה",
      leader: "Irakli Kandashvili",
      leaderTitle: "Chairperson",
      sourceType: "official",
      verificationNote: "מקור רשמי פעיל; בחירה פורסמה ב-22 בדצמבר 2025",
      website: "https://gba.ge/en",
      leadershipSource: "https://gba.ge/en/executive-board/about/members",
      contactSource: "https://gba.ge/en/about-us",
      address: "Tinatin Virsaladze I Dead End N1, Dighomi, Tbilisi, Georgia",
      email: "info@gba.ge",
      phone: "+995 32 298 78 78"
    },
    letterDate: "March 28, 2026",
    sources: [
      {
        label: "Freedom House 2025 - Georgia",
        url: "https://freedomhouse.org/country/georgia/freedom-world/2025"
      },
      {
        label: "Human Rights Watch 2026 - Georgia",
        url: "https://www.hrw.org/world-report/2026/country-chapters/georgia"
      },
      {
        label: "Human Rights Watch - March 26, 2025 foreign agents bill",
        url: "https://www.hrw.org/news/2025/03/26/georgia-drop-repressive-foreign-agents-bill"
      },
      {
        label: "Georgian Bar Association - executive board members",
        url: "https://gba.ge/en/executive-board/about/members"
      }
    ]
  },
  {
    id: "india",
    countryHe: "הודו",
    countryEn: "India",
    region: "אסיה",
    severity: "גבוהה",
    freedomStatus: "Partly Free",
    freedomScore: 63,
    summary:
      "בהודו נשמרים מנגנוני בחירות תחרותיים, אך גוברות הטענות לשימוש מפלגתי במוסדות המדינה, לפגיעה גוברת בעיתונות, לחצים על חברה אזרחית, ולהתרחקות מערכים ליברליים-חוקתיים בשם לאומיות רובנית.",
    actions: [
      "שימוש נטען במוסדות חקירה ואכיפה נגד יריבים פוליטיים, במיוחד סביב מערכות בחירות ומוקדי כוח אופוזיציוניים.",
      "הטרדה והגבלה של עיתונאים, ארגונים לא ממשלתיים ומבקרים אחרים של הממשלה באמצעות חקירה, רגולציה והליך פלילי.",
      "יישום מדיניות הנתפסת כמפלה כלפי מוסלמים ומיעוטים אחרים, ובכלל זה יישום Citizenship Amendment Act במרץ 2024.",
      "שחיקה באקדמיה ובשיח הציבורי דרך לחץ פוליטי, קמפיינים לאומניים והרתעת מוסדות חינוך ותרבות.",
      "העמקת תפיסה פופוליסטית-רובנית שלפיה ביקורת אזרחית ומשפטית נתפסת כמכשול לרצון הרוב ולא כמנגנון דמוקרטי הכרחי."
    ],
    bar: {
      name: "Bar Council of India",
      titleHe: "מועצת עורכי הדין של הודו",
      leader: "Manan Kumar Mishra",
      leaderTitle: "Chairman",
      sourceType: "reported",
      verificationNote: "לא נמצא מקור רשמי נגיש היטב במנוע החיפוש; השם נשען על דיווחי משפט עדכניים מ-1-2 במרץ 2025",
      website: "https://www.barcouncilofindia.org/",
      leadershipSource: "https://www.barandbench.com/news/manan-kumar-mishra-re-elected-as-chairman-of-bar-council-of-india-for-7th-consecutive-term",
      contactSource: "https://www.barcouncilofindia.org/",
      address: "New Delhi, India",
      email: "See official website",
      phone: "See official website"
    },
    letterDate: "March 28, 2026",
    sources: [
      {
        label: "Freedom House 2025 - India",
        url: "https://freedomhouse.org/country/india/freedom-world/2025"
      },
      {
        label: "Bar and Bench - March 1, 2025 BCI chair re-election",
        url: "https://www.barandbench.com/news/manan-kumar-mishra-re-elected-as-chairman-of-bar-council-of-india-for-7th-consecutive-term"
      },
      {
        label: "Juris Hour - March 2, 2025 BCI chair re-election notice report",
        url: "https://www.jurishour.in/notification/chairman-bar-council-of-india-for-7th-time"
      },
      {
        label: "Bar Council of India official website",
        url: "https://www.barcouncilofindia.org/"
      }
    ]
  }
];

const resistanceOrganizations = [
  {
    name: "Hungarian Association of Judges (MABIE)",
    country: "הונגריה",
    type: "ארגון שופטים",
    focus: "הארגון המקצועי המרכזי של שופטים בהונגריה, שפועל להגנת עצמאות השפיטה ותנאי היסוד של שלטון החוק.",
    role: "שופטים",
    actions: [
      "פרסם עמדות פומביות נגד רפורמות שנתפסו כפוגעות בעצמאות מערכת המשפט ובמעמד השופטים.",
      "הזהיר מפני פוליטיזציה של ניהול בתי המשפט ומפני פגיעה באמון הציבור בבתי המשפט.",
      "שיתף פעולה עם גופי משפט אירופיים סביב סטנדרטים של עצמאות שיפוטית."
    ],
    details: [
      "מדינה: הונגריה",
      "מעמד: ארגון מקצועי פעיל",
      "אתר: https://mabie.hu/",
      "אימות: אתר רשמי ופרסומי ארגוני שופטים אירופיים"
    ],
    sources: [
      { label: "MABIE official site", url: "https://mabie.hu/" },
      { label: "European Association of Judges - Hungary statements context", url: "https://www.iaj-uim.org/iuw/" }
    ]
  },
  {
    name: "Hungarian Helsinki Committee",
    country: "הונגריה",
    type: "ארגון משפטנים וזכויות אדם",
    focus: "ארגון משפטי מוביל שמנהל ליטיגציה, מחקר והסברה נגד ריכוז כוח שלטוני ופגיעה בחברה האזרחית ובהליך ההוגן.",
    role: "עורכי דין ומשפטנים",
    actions: [
      "ניהל מאבקים משפטיים וציבוריים בנושאי עצמאות שיפוטית, חקיקה נגד עמותות ומדיניות שלטונית הפוגעת בזכויות.",
      "פרסם ניתוחים שיטתיים על פגיעות בשלטון החוק ובהפרדת הרשויות.",
      "קידם פניות למוסדות אירופיים ובינלאומיים נגד צעדי ממשלה אנטי-ליברליים."
    ],
    details: [
      "מדינה: הונגריה",
      "מעמד: ארגון פעיל",
      "אתר: https://helsinki.hu/en/",
      "אימות: אתר רשמי פעיל"
    ],
    sources: [
      { label: "Hungarian Helsinki Committee official site", url: "https://helsinki.hu/en/" },
      { label: "Hungarian Helsinki Committee - rule of law", url: "https://helsinki.hu/en/in-defence-of-the-rule-of-law/" }
    ]
  },
  {
    name: "Union of Turkish Bar Associations",
    country: "טורקיה",
    type: "ארגון לשכות עורכי דין",
    focus: "הגוף הארצי של לשכות עורכי הדין בטורקיה, שפעל נגד צעדים שהגבילו את עצמאות הלשכות והמערכת המשפטית.",
    role: "עורכי דין",
    actions: [
      "התנגד לחקיקה שניסתה לפצל לשכות גדולות ולהחליש את עצמאותן הארגונית והציבורית.",
      "פרסם עמדות והשתתף במאבקים ציבוריים להגנת מקצוע עריכת הדין ועצמאות ההגנה המשפטית.",
      "שימש פלטפורמה ארצית לביקורת על פגיעה בזכויות, בחופש הביטוי ובעצמאות מערכת המשפט."
    ],
    details: [
      "מדינה: טורקיה",
      "מעמד: גוף רשמי פעיל",
      "אתר: https://www.barobirlik.org.tr/en",
      "אימות: אתר רשמי פעיל"
    ],
    sources: [
      { label: "Union of Turkish Bar Associations official site", url: "https://www.barobirlik.org.tr/en" },
      { label: "IBA - Turkish bars and rule of law concerns", url: "https://www.ibanet.org/" }
    ]
  },
  {
    name: "YARSAV - Union of Judges and Prosecutors",
    country: "טורקיה",
    type: "ארגון שופטים ותובעים",
    focus: "ארגון מקצועי של שופטים ותובעים בטורקיה, שזוהה במשך שנים עם התנגדות לפוליטיזציה של הרשות השופטת ולבסוף פורק בצו חירום לאחר ניסיון ההפיכה ב-2016.",
    role: "שופטים ותובעים",
    actions: [
      "ביקר צעדים שפגעו בעצמאות השיפוטית ובהגנות המוסדיות על שופטים ותובעים.",
      "קיים קשרי עבודה עם ארגוני שופטים בינלאומיים והתריע על פוליטיזציה גוברת במינוי ובהדחת שופטים.",
      "עצם פירוקו נתפס בעיני גופי זכויות ואיגודי שופטים בעולם כסמל לדיכוי קולות מקצועיים עצמאיים."
    ],
    details: [
      "מדינה: טורקיה",
      "מעמד: פורק על ידי הממשלה ב-2016",
      "אתר: https://yarsav.org.tr/index.asp?lang=1",
      "אימות: אתר הארגון ותיעוד בינלאומי מתמשך"
    ],
    sources: [
      { label: "YARSAV official site", url: "https://yarsav.org.tr/index.asp?lang=1" },
      { label: "Council of Europe / international concern over YARSAV", url: "https://www.coe.int/" }
    ]
  },
  {
    name: "Judges' Association of Serbia",
    country: "סרביה",
    type: "ארגון שופטים",
    focus: "הארגון המקצועי המרכזי של שופטי סרביה, שפועל לקידום עצמאות מערכת המשפט ולהתנגדות לרפורמות או פרקטיקות שמעמיקות תלות פוליטית.",
    role: "שופטים",
    actions: [
      "פרסם עמדות מקצועיות על חקיקה מבנית בתחום השיפוט והכשרת שופטים, תוך אזהרה מפני פגיעה בעצמאות.",
      "השתתף בדיונים ציבוריים על מודל הכשרת השופטים ומבנה האקדמיה השיפוטית.",
      "התריע מפני רפורמות שאינן מחזקות בפועל אי-תלות שיפוטית."
    ],
    details: [
      "מדינה: סרביה",
      "מעמד: ארגון פעיל",
      "אתר: https://sudije.rs/",
      "אימות: אתר רשמי פעיל"
    ],
    sources: [
      { label: "Judges' Association of Serbia official site", url: "https://sudije.rs/" },
      { label: "JAS 2024 statement on Judicial Academy law", url: "https://sudije.rs/Item/Details/1018" }
    ]
  },
  {
    name: "YUCOM - Lawyers' Committee for Human Rights",
    country: "סרביה",
    type: "ארגון עורכי דין וזכויות אדם",
    focus: "ארגון משפטנים ותיק שמעניק סיוע משפטי, מתעד פגיעות בזכויות אדם ונאבק בהיחלשות שלטון החוק בסרביה.",
    role: "עורכי דין ומשפטנים",
    actions: [
      "מוביל ליטיגציה, דוחות ופעילות הסברה בנושאי שלטון החוק, חופש הביטוי והגנה על מפגינים ועיתונאים.",
      "עוקב אחרי תביעות השתקה, ניצול לרעה של מוסדות השלטון ופגיעות בזכויות יסוד.",
      "מחבר בין מאבק משפטי מקומי למסגרות זכויות אדם בינלאומיות."
    ],
    details: [
      "מדינה: סרביה",
      "מעמד: ארגון פעיל",
      "אתר: https://yucom.org.rs/en/home/",
      "אימות: אתר רשמי פעיל"
    ],
    sources: [
      { label: "YUCOM official site", url: "https://yucom.org.rs/en/home/" },
      { label: "YUCOM publications and reports", url: "https://yucom.org.rs/en/publications/" }
    ]
  },
  {
    name: "Georgian Young Lawyers' Association (GYLA)",
    country: "גאורגיה",
    type: "ארגון עורכי דין",
    focus: "אחד הארגונים המשפטיים המשפיעים בגאורגיה, שפועל להגנת זכויות אדם, שקיפות, חופש מידע ושלטון החוק.",
    role: "עורכי דין",
    actions: [
      "נאבק משפטית וציבורית בחקיקה ובצעדים הפוגעים בחברה האזרחית, בזכות למחאה ובחופש ההתאגדות.",
      "מעניק ייצוג, מפרסם דוחות ומנהל מעקב אחר בחירות, מוסדות שלטון ושימוש לרעה בכוח המדינה.",
      "שימש קול משפטי מרכזי נגד חקיקת 'הסוכנים הזרים' ונגד פגיעה בזכויות מפגינים ועיתונאים."
    ],
    details: [
      "מדינה: גאורגיה",
      "מעמד: ארגון פעיל",
      "אתר: https://gyla.ge/en",
      "אימות: אתר רשמי פעיל"
    ],
    sources: [
      { label: "GYLA official site", url: "https://gyla.ge/en" },
      { label: "GYLA about page", url: "https://gyla.ge/en/post/chven-shesakheb" }
    ]
  },
  {
    name: "Lawyers Collective",
    country: "הודו",
    type: "ארגון עורכי דין וזכויות אדם",
    focus: "ארגון משפטי הודי ותיק המזוהה עם ליטיגציה חוקתית, הגנה על חירויות אזרחיות ומאבק בצעדים שלטוניים הפוגעים בזכויות יסוד.",
    role: "עורכי דין ומשפטנים",
    actions: [
      "ניהל התדיינויות ופעילות ציבורית בנושאי חופש אזרחי, זכויות מיעוטים ושמירה על מוסדות חוקתיים.",
      "ביקר שימוש מפלגתי במוסדות המדינה והגבלות רגולטוריות על החברה האזרחית.",
      "המשיך לפעול גם תחת לחצים רגולטוריים ומשפטיים מצד הרשויות."
    ],
    details: [
      "מדינה: הודו",
      "מעמד: ארגון פעיל",
      "אתר: https://lawyerscollective.org/",
      "אימות: אתר רשמי פעיל"
    ],
    sources: [
      { label: "Lawyers Collective official site", url: "https://lawyerscollective.org/" },
      { label: "Lawyers Collective about", url: "https://lawyerscollective.org/who-we-are/" }
    ]
  },
  {
    name: "Polish Judges Association Iustitia",
    country: "פולין",
    type: "ארגון שופטים",
    focus: "ארגון השופטים העצמאי המרכזי בפולין, שהפך לשחקן מוביל בהתנגדות לפוליטיזציה של מערכת המשפט בתקופת ממשלות PiS.",
    role: "שופטים",
    actions: [
      "ניהל קמפיינים ציבוריים ומשפטיים להגנת עצמאות השופטים ובתי המשפט.",
      "תיעד והסביר לציבור כיצד רפורמות ממשלתיות פוגעות בהפרדת הרשויות ובזכות להליך הוגן.",
      "שיתף פעולה עם ארגוני שופטים ועורכי דין באירופה ובנה רשת סולידריות בינלאומית סביב שלטון החוק."
    ],
    details: [
      "מדינה: פולין",
      "מעמד: ארגון פעיל",
      "אתר: https://www.do2024.iustitia.pl/en",
      "אימות: אתר רשמי פעיל"
    ],
    sources: [
      { label: "Iustitia official site", url: "https://www.do2024.iustitia.pl/en" },
      { label: "Iustitia constitution and mission", url: "https://www.do2024.iustitia.pl/en/about-us/constitution-of-the-polish-judges-association-iustitia" }
    ]
  },
  {
    name: "Association of Judges THEMIS",
    country: "פולין",
    type: "ארגון שופטים",
    focus: "ארגון שופטים פולני שקידם מודרניזציה, אירופיזציה והגנה על עצמאות מערכת המשפט, ובשנות משבר שלטון החוק פעל לצד Iustitia במרחב הציבורי.",
    role: "שופטים",
    actions: [
      "הציג עמדה ציבורית עקבית נגד פוליטיזציה של הרשות השופטת.",
      "הדגיש את הצורך בחיזוק אמון הציבור דרך עצמאות שיפוטית ולא דרך כפיפות פוליטית.",
      "שיתף פעולה עם ארגונים משפטיים ועמותות להגנת בתי המשפט הדמוקרטיים."
    ],
    details: [
      "מדינה: פולין",
      "מעמד: ארגון פעיל",
      "אתר: https://themis-sedziowie.eu/",
      "אימות: אתר רשמי פעיל"
    ],
    sources: [
      { label: "THEMIS official site", url: "https://themis-sedziowie.eu/" },
      { label: "THEMIS program declaration", url: "https://themis-sedziowie.eu/czym-sie-zajmujemy/" }
    ]
  },
  {
    name: "Naczelna Rada Adwokacka (Polish Bar Council)",
    country: "פולין",
    type: "ארגון עורכי דין",
    focus: "המועצה הארצית של לשכת עורכי הדין בפולין, שהתייצבה שוב ושוב להגנת עצמאות בתי המשפט, שלטון החוק וזכויות האזרח.",
    role: "עורכי דין",
    actions: [
      "הוציאה עמדות פומביות והשתתפה בקואליציות להגנת עצמאות השיפוט והחוקה.",
      "חיברה בין עמדת המקצוע המשפטי למאבק הציבורי הרחב יותר נגד פוליטיזציה של בתי המשפט.",
      "שמרה על נוכחות מוסדית בוויכוח החוקתי והדמוקרטי בתקופת רפורמות שנויות במחלוקת."
    ],
    details: [
      "מדינה: פולין",
      "מעמד: גוף לשכה ארצי פעיל",
      "אתר: https://www.nra.pl/",
      "אימות: אתר רשמי ועמודי קשר רשמיים"
    ],
    sources: [
      { label: "Polish Bar Council official site", url: "https://www.nra.pl/" },
      { label: "Polish Bar Council contact page", url: "https://www.bip.nra.pl/kontakt-nra/" }
    ]
  },
  {
    name: "MEDEL - Magistrats européens pour la démocratie et les libertés",
    country: "אירופה",
    type: "ארגון שופטים ותובעים",
    focus: "רשת אירופית של שופטים ותובעים המחויבת לדמוקרטיה, לחירויות יסוד, לעצמאות שיפוטית ולשלטון החוק, ופועלת בסולידריות עם ארגונים מקצועיים במדינות הנתונות ללחץ פוליטי.",
    role: "שופטים ותובעים",
    actions: [
      "מפרסם הצהרות ותמיכה פומבית כאשר ממשלות פוגעות בעצמאות בתי המשפט, תובעים או עורכי דין.",
      "מקיים כנסים, שיתופי פעולה ופניות בינלאומיות בנושאי שלטון החוק, עצמאות השפיטה והגנה על חירויות.",
      "מאגד ארגוני-חבר ממדינות רבות, כולל פולין, סרביה וטורקיה, וכך יוצר מסגרת אירופית ללחץ מקצועי וסולידריות.",
      "מופיע באתרו גם עם פרקי פעולה ייעודיים כמו 'An independent Judiciary' ו-'Defense of Liberties'."
    ],
    details: [
      "מסגרת: ארגון אירופי על-לאומי",
      "נשיאה: Mariarosaria Guglielmi",
      "אתר: https://medelnet.eu/",
      "אימות: אתר רשמי פעיל; דף הנהלה רשמי ודיווח רשמי על bureau חדש ב-23 בנובמבר 2025"
    ],
    sources: [
      { label: "MEDEL official site", url: "https://medelnet.eu/" },
      { label: "MEDEL management board", url: "https://medelnet.eu/management-board/" },
      { label: "MEDEL new bureau 2025-2028", url: "https://medelnet.eu/new-bureau-of-medel-2025/" },
      { label: "Short history of MEDEL", url: "https://medelnet.eu/short-history-of-medel/" }
    ]
  }
];

const generalLetterTemplate = `Subject: Proposal for Professional Cooperation Between Bar Associations in Defense of Democratic Institutions

Dear President,

I write on behalf of colleagues in the Israel Bar Association with respect and professional solidarity.

We are reaching out to leading bar associations in jurisdictions where democratic institutions, judicial independence, civic freedoms, and the rule of law are under increasing pressure. We believe bar associations have a unique institutional responsibility to defend constitutionalism, legal ethics, independent courts, and equal access to justice.

We would welcome a structured dialogue with your bar association in order to explore possible forms of cooperation between our institutions. Such cooperation could include exchange of legal strategies, comparative analysis of threats to democratic governance, joint professional statements, coordination around international advocacy, and practical discussion of steps that bar associations can take to protect judicial independence, fundamental rights, and the integrity of legal institutions.

If this is of interest, we would be grateful to arrange an initial online meeting at your convenience.

We would be honored to learn from your experience and to consider together how bar associations can respond, within their professional mandates, to democratic erosion and populist pressures.

Yours sincerely,
[Name]
Israel Bar Association`;

const state = {
  search: "",
  region: "all",
  severity: "all",
  officialOnly: false,
  activeTab: "bars"
};

const elements = {
  searchInput: document.querySelector("#searchInput"),
  regionFilter: document.querySelector("#regionFilter"),
  severityFilter: document.querySelector("#severityFilter"),
  officialSourceOnly: document.querySelector("#officialSourceOnly"),
  resetFiltersButton: document.querySelector("#resetFiltersButton"),
  copyGeneralLetterButton: document.querySelector("#copyGeneralLetterButton"),
  barsTabButton: document.querySelector("#barsTabButton"),
  orgsTabButton: document.querySelector("#orgsTabButton"),
  barsPanel: document.querySelector("#barsPanel"),
  orgsPanel: document.querySelector("#orgsPanel"),
  countryGrid: document.querySelector("#countryGrid"),
  countryCardTemplate: document.querySelector("#countryCardTemplate"),
  orgGrid: document.querySelector("#orgGrid"),
  orgCardTemplate: document.querySelector("#orgCardTemplate"),
  countryCount: document.querySelector("#countryCount"),
  leadersCount: document.querySelector("#leadersCount"),
  actionsCount: document.querySelector("#actionsCount"),
  resultsCount: document.querySelector("#resultsCount"),
  resultsSummary: document.querySelector("#resultsSummary")
};

init();

function init() {
  populateRegionFilter();
  bindEvents();
  render();
}

function populateRegionFilter() {
  const regions = [...new Set(countries.map((country) => country.region))].sort((a, b) =>
    a.localeCompare(b, "he")
  );

  regions.forEach((region) => {
    const option = document.createElement("option");
    option.value = region;
    option.textContent = region;
    elements.regionFilter.append(option);
  });
}

function bindEvents() {
  elements.searchInput.addEventListener("input", (event) => {
    state.search = event.target.value.trim().toLowerCase();
    render();
  });

  elements.regionFilter.addEventListener("change", (event) => {
    state.region = event.target.value;
    render();
  });

  elements.severityFilter.addEventListener("change", (event) => {
    state.severity = event.target.value;
    render();
  });

  elements.officialSourceOnly.addEventListener("change", (event) => {
    state.officialOnly = event.target.checked;
    render();
  });

  elements.resetFiltersButton.addEventListener("click", () => {
    state.search = "";
    state.region = "all";
    state.severity = "all";
    state.officialOnly = false;

    elements.searchInput.value = "";
    elements.regionFilter.value = "all";
    elements.severityFilter.value = "all";
    elements.officialSourceOnly.checked = false;
    render();
  });

  elements.copyGeneralLetterButton.addEventListener("click", async () => {
    const ok = await copyText(generalLetterTemplate);
    elements.copyGeneralLetterButton.textContent = ok ? "הנוסח הועתק" : "לא הצלחנו להעתיק";
    window.setTimeout(() => {
      elements.copyGeneralLetterButton.textContent = "העתק נוסח כללי";
    }, 1800);
  });

  elements.barsTabButton.addEventListener("click", () => setActiveTab("bars"));
  elements.orgsTabButton.addEventListener("click", () => setActiveTab("orgs"));
}

function render() {
  renderSummaryStats();
  renderCountries();
  renderOrganizations();
  renderTabs();
}

function renderSummaryStats() {
  elements.countryCount.textContent = countries.length;
  elements.leadersCount.textContent = countries.filter((country) => country.bar.leader).length;
  elements.actionsCount.textContent = countries.reduce(
    (total, country) => total + country.actions.length,
    0
  );
}

function renderCountries() {
  const filteredCountries = getFilteredCountries();
  elements.countryGrid.innerHTML = "";
  elements.resultsCount.textContent = String(filteredCountries.length);
  elements.resultsSummary.textContent =
    filteredCountries.length === countries.length
      ? "מוצג המאגר המלא."
      : `מוצגות ${filteredCountries.length} מדינות מתוך ${countries.length}.`;

  if (!filteredCountries.length) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.textContent =
      "לא נמצאו התאמות לסינון שבחרת. אפשר לנסות חיפוש כללי יותר או לאפס את הסינון.";
    elements.countryGrid.append(emptyState);
    return;
  }

  filteredCountries.forEach((country) => {
    const fragment = elements.countryCardTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".country-card");
    const copyButton = fragment.querySelector(".copy-letter-button");

    fragment.querySelector(".country-region").textContent = country.region;
    fragment.querySelector(".country-name").textContent = country.countryHe;
    fragment.querySelector(".country-subtitle").textContent = `${country.countryEn} | ${country.freedomStatus}`;
    fragment.querySelector(".bar-name").textContent = `${country.bar.name} (${country.bar.titleHe})`;
    fragment.querySelector(".leader-name").textContent = `${country.bar.leader} | ${country.bar.leaderTitle}`;
    fragment.querySelector(".verification-note").textContent = country.bar.verificationNote;
    fragment.querySelector(".freedom-score").textContent = `${country.freedomScore}/100`;
    fragment.querySelector(".country-summary").textContent = country.summary;

    const severityBadge = fragment.querySelector(".severity-badge");
    severityBadge.textContent = country.severity;
    severityBadge.dataset.severity = country.severity;

    const actionsList = fragment.querySelector(".actions-list");
    country.actions.forEach((action) => {
      const item = document.createElement("li");
      item.textContent = action;
      actionsList.append(item);
    });

    const contactList = fragment.querySelector(".contact-list");
    [
      `אתר: ${country.bar.website}`,
      `מקור הנהגה: ${country.bar.leadershipSource}`,
      `כתובת: ${country.bar.address}`,
      `דוא"ל: ${country.bar.email}`,
      `טלפון: ${country.bar.phone}`
    ].forEach((entry) => {
      const line = document.createElement("div");
      line.className = "contact-item";
      line.innerHTML = `<strong>${escapeHtml(entry.split(":")[0])}:</strong> ${escapeHtml(
        entry.slice(entry.indexOf(":") + 1).trim()
      )}`;
      contactList.append(line);
    });

    fragment.querySelector(".letter-text").textContent = buildCountryLetter(country);

    const sourcesList = fragment.querySelector(".sources-list");
    country.sources.forEach((source) => {
      const anchor = document.createElement("a");
      anchor.href = source.url;
      anchor.target = "_blank";
      anchor.rel = "noreferrer";
      anchor.textContent = source.label;
      sourcesList.append(anchor);
    });

    copyButton.addEventListener("click", async () => {
      const ok = await copyText(buildCountryLetter(country));
      copyButton.textContent = ok ? "הועתק" : "שגיאת העתקה";
      window.setTimeout(() => {
        copyButton.textContent = "העתק מכתב";
      }, 1800);
    });

    elements.countryGrid.append(card);
  });
}

function renderOrganizations() {
  elements.orgGrid.innerHTML = "";

  resistanceOrganizations.forEach((organization) => {
    const fragment = elements.orgCardTemplate.content.cloneNode(true);

    fragment.querySelector(".org-country").textContent = organization.country;
    fragment.querySelector(".org-name").textContent = organization.name;
    fragment.querySelector(".org-type").textContent = `${organization.type} | ${organization.role}`;
    fragment.querySelector(".org-summary").textContent = organization.focus;
    fragment.querySelector(".org-badge").textContent = organization.type;

    const actionsList = fragment.querySelector(".org-actions");
    organization.actions.forEach((action) => {
      const item = document.createElement("li");
      item.textContent = action;
      actionsList.append(item);
    });

    const metaList = fragment.querySelector(".org-meta-list");
    organization.details.forEach((detail) => {
      const line = document.createElement("div");
      line.className = "contact-item";
      line.textContent = detail;
      metaList.append(line);
    });

    const sourcesList = fragment.querySelector(".org-sources-list");
    organization.sources.forEach((source) => {
      const anchor = document.createElement("a");
      anchor.href = source.url;
      anchor.target = "_blank";
      anchor.rel = "noreferrer";
      anchor.textContent = source.label;
      sourcesList.append(anchor);
    });

    elements.orgGrid.append(fragment);
  });
}

function renderTabs() {
  const isBarsActive = state.activeTab === "bars";

  elements.barsTabButton.classList.toggle("is-active", isBarsActive);
  elements.orgsTabButton.classList.toggle("is-active", !isBarsActive);
  elements.barsTabButton.setAttribute("aria-selected", String(isBarsActive));
  elements.orgsTabButton.setAttribute("aria-selected", String(!isBarsActive));

  elements.barsPanel.classList.toggle("is-active", isBarsActive);
  elements.orgsPanel.classList.toggle("is-active", !isBarsActive);
  elements.barsPanel.hidden = !isBarsActive;
  elements.orgsPanel.hidden = isBarsActive;
}

function setActiveTab(tabName) {
  state.activeTab = tabName;
  renderTabs();
}

function getFilteredCountries() {
  return countries.filter((country) => {
    if (state.region !== "all" && country.region !== state.region) {
      return false;
    }

    if (state.severity !== "all" && country.severity !== state.severity) {
      return false;
    }

    if (state.officialOnly && country.bar.sourceType !== "official") {
      return false;
    }

    if (!state.search) {
      return true;
    }

    const haystack = [
      country.countryHe,
      country.countryEn,
      country.region,
      country.summary,
      country.bar.name,
      country.bar.leader,
      ...country.actions
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(state.search);
  });
}

function buildCountryLetter(country) {
  return `Date: ${country.letterDate}

Subject: Proposal for Cooperation Between the ${country.bar.name} and the Israel Bar Association on Protecting Democratic Institutions

Dear ${country.bar.leaderTitle} ${country.bar.leader},

I write with respect on behalf of colleagues in the Israel Bar Association.

We are reaching out to your distinguished bar association because legal professionals in ${country.countryEn} are operating in a period of sustained pressure on democratic institutions, the rule of law, civil society, and the independence of legal actors. We believe bar associations have a special responsibility, within their professional mandate, to defend constitutional governance, judicial independence, professional ethics, and equal access to justice.

We would be honored to explore practical cooperation between the ${country.bar.name} and the Israel Bar Association. In particular, we would welcome a professional exchange on legal and institutional steps that bar associations can take in order to help resist democratic erosion, protect independent courts and lawyers, support civic freedoms, and strengthen public confidence in lawful democratic governance.

Possible areas of cooperation may include comparative legal analysis, exchange of professional strategies, joint statements or convenings, mutual learning on bar-association advocacy, and the development of practical frameworks for defending the independence of the legal profession.

If this proposal is of interest, we would be grateful to arrange an initial online meeting at a time convenient for you and your colleagues.

We would value the opportunity to learn from your experience and to consider together how bar associations can contribute, responsibly and effectively, to safeguarding democracy in their respective societies.

Yours sincerely,
[Name]
Israel Bar Association`;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    return false;
  }
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
