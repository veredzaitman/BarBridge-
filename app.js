const STORAGE_KEY = "law-monitor-watchlist";
const MANUAL_BILLS_STORAGE_KEY = "law-monitor-manual-bills";
const BILL_METADATA_STORAGE_KEY = "law-monitor-bill-metadata";

const state = {
  bills: [],
  manualBills: loadManualBills(),
  billMetadata: loadBillMetadata(),
  watchlist: loadWatchlist(),
  filters: {
    query: "",
    status: "all",
    committee: "all",
    severity: "all",
    harmArea: "all",
    specialMemberOnly: false,
    attorneyGeneralOnly: false,
    watchlistOnly: false,
  },
  meta: {
    sourceLabel: "טוען...",
    sourceKind: "loading",
    fetchedAt: null,
    fallback: false,
  },
  loading: true,
  error: "",
};

const elements = {
  searchInput: document.querySelector("#searchInput"),
  statusFilter: document.querySelector("#statusFilter"),
  committeeFilter: document.querySelector("#committeeFilter"),
  severityFilter: document.querySelector("#severityFilter"),
  harmFilter: document.querySelector("#harmFilter"),
  specialMemberToggle: document.querySelector("#specialMemberToggle"),
  attorneyGeneralToggle: document.querySelector("#attorneyGeneralToggle"),
  watchlistOnlyToggle: document.querySelector("#watchlistOnlyToggle"),
  manualBillForm: document.querySelector("#manualBillForm"),
  manualFormMessage: document.querySelector("#manualFormMessage"),
  billGrid: document.querySelector("#billGrid"),
  metricsGrid: document.querySelector("#metricsGrid"),
  activityFeed: document.querySelector("#activityFeed"),
  resultsSummary: document.querySelector("#resultsSummary"),
  activeCount: document.querySelector("#activeCount"),
  watchlistCount: document.querySelector("#watchlistCount"),
  criticalCount: document.querySelector("#criticalCount"),
  lastUpdatedLabel: document.querySelector("#lastUpdatedLabel"),
  refreshButton: document.querySelector("#refreshButton"),
  watchlistFocusButton: document.querySelector("#watchlistFocusButton"),
  billCardTemplate: document.querySelector("#billCardTemplate"),
  sourceBadge: document.querySelector("#sourceBadge"),
  sourceHint: document.querySelector("#sourceHint"),
};

init();

async function init() {
  bindEvents();
  await loadBills();
}

function bindEvents() {
  elements.searchInput.addEventListener("input", (event) => {
    state.filters.query = event.target.value.trim().toLowerCase();
    renderBills();
  });

  elements.statusFilter.addEventListener("change", (event) => {
    state.filters.status = event.target.value;
    renderBills();
  });

  elements.committeeFilter.addEventListener("change", (event) => {
    state.filters.committee = event.target.value;
    renderBills();
  });

  elements.severityFilter.addEventListener("change", (event) => {
    state.filters.severity = event.target.value;
    renderBills();
  });

  elements.harmFilter.addEventListener("change", (event) => {
    state.filters.harmArea = event.target.value;
    renderBills();
  });

  elements.specialMemberToggle.addEventListener("change", (event) => {
    state.filters.specialMemberOnly = event.target.checked;
    renderBills();
  });

  elements.attorneyGeneralToggle.addEventListener("change", (event) => {
    state.filters.attorneyGeneralOnly = event.target.checked;
    renderBills();
  });

  elements.watchlistOnlyToggle.addEventListener("change", (event) => {
    state.filters.watchlistOnly = event.target.checked;
    renderBills();
  });

  elements.manualBillForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addManualBill(new FormData(elements.manualBillForm));
  });

  elements.refreshButton.addEventListener("click", async () => {
    await loadBills();
  });

  elements.watchlistFocusButton.addEventListener("click", () => {
    state.filters.watchlistOnly = true;
    elements.watchlistOnlyToggle.checked = true;
    renderBills();
    document.querySelector("#billList")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

async function loadBills() {
  state.loading = true;
  state.error = "";
  elements.refreshButton.disabled = true;
  elements.refreshButton.textContent = "טוען נתונים...";
  render();

  try {
    const response = await fetch("/api/bills");
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const payload = await response.json();
    state.bills = mergeBills(Array.isArray(payload.items) ? payload.items : [], state.manualBills);
    state.meta = {
      sourceLabel: payload.sourceLabel || "מקור לא ידוע",
      sourceKind: payload.sourceKind || "unknown",
      fetchedAt: payload.fetchedAt || null,
      fallback: Boolean(payload.fallback),
    };

    populateFilters();
  } catch (error) {
    state.error = "לא הצלחנו לטעון נתונים חיים כרגע.";
    state.bills = mergeBills([], state.manualBills);
    state.meta = {
      sourceLabel: "טעינה נכשלה",
      sourceKind: "error",
      fetchedAt: null,
      fallback: true,
    };
  } finally {
    state.loading = false;
    elements.refreshButton.disabled = false;
    elements.refreshButton.textContent = "רענון מהמקור";
    render();
  }
}

function populateFilters() {
  refillSelect(elements.statusFilter, "כל הסטטוסים", [
    ...new Set(state.bills.map((bill) => bill.monitoringStage || bill.status).filter(Boolean)),
  ]);
  refillSelect(elements.committeeFilter, "כל הוועדות", [
    ...new Set(state.bills.map((bill) => bill.committee).filter(Boolean)),
  ]);
  refillSelect(elements.harmFilter, "כל סוגי הפגיעה", [
    ...new Set(state.bills.map((bill) => bill.harmArea).filter(Boolean)),
  ]);
}

function refillSelect(selectElement, defaultLabel, values) {
  const defaultValue = "all";
  const currentValue = selectElement.value || defaultValue;
  selectElement.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.value = defaultValue;
  defaultOption.textContent = defaultLabel;
  selectElement.append(defaultOption);

  values.sort((left, right) => left.localeCompare(right, "he"));
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    selectElement.append(option);
  });

  selectElement.value = values.includes(currentValue) ? currentValue : defaultValue;
}

function render() {
  renderHeaderStats();
  renderMetrics();
  renderActivityFeed();
  renderBills();
  renderSourceMeta();
}

function addManualBill(formData) {
  const title = String(formData.get("title") || "").trim();
  const summary = String(formData.get("summary") || "").trim();
  const harmArea = String(formData.get("harmArea") || "").trim();
  const riskNote = String(formData.get("riskNote") || "").trim();

  if (!title || !summary || !harmArea || !riskNote) {
    elements.manualFormMessage.textContent = "צריך למלא שם הצעה, הסבר, מוקד פגיעה ונימוק.";
    return;
  }

  const manualBill = {
    id: `manual-${Date.now()}`,
    title,
    summary,
    sponsor: String(formData.get("sponsor") || "").trim() || "הזנה ידנית",
    committee: String(formData.get("committee") || "").trim() || "לא שויך",
    status: String(formData.get("status") || "").trim() || "הוזנה ידנית",
    monitoringStage: "",
    severity: String(formData.get("severity") || "גבוהה"),
    harmArea,
    riskScore: severityToScore(String(formData.get("severity") || "גבוהה")),
    updatedAt: new Date().toISOString(),
    nextStep: "נדרש מעקב ידני",
    riskNote,
    tags: parseTags(String(formData.get("tags") || "")),
    knessetUrl: normalizeOptionalUrl(String(formData.get("knessetUrl") || "")),
    backgroundMaterials: [],
    isManual: true,
  };

  state.manualBills = [manualBill, ...state.manualBills];
  saveManualBills();
  state.bills = mergeBills(state.bills, state.manualBills);
  populateFilters();
  elements.manualBillForm.reset();
  elements.manualFormMessage.textContent = "הצעת החוק נוספה לרשימת הסיכונים.";
  render();
}

function renderHeaderStats() {
  elements.activeCount.textContent = state.bills.length;
  elements.watchlistCount.textContent = state.watchlist.length;
  elements.criticalCount.textContent = state.bills.filter(
    (bill) => bill.severity === "קיצונית"
  ).length;

  if (state.meta.fetchedAt) {
    elements.lastUpdatedLabel.textContent = formatDate(state.meta.fetchedAt);
  } else if (state.loading) {
    elements.lastUpdatedLabel.textContent = "טוען...";
  } else {
    elements.lastUpdatedLabel.textContent = "אין עדכון";
  }
}

function renderMetrics() {
  const metrics = [
    {
      label: "הכנה לראשונה",
      value: state.bills.filter((bill) => bill.monitoringStage === "הכנה לקריאה ראשונה").length,
    },
    {
      label: "הכנה לשנייה ושלישית",
      value: state.bills.filter((bill) => bill.monitoringStage === "הכנה לקריאה שנייה ושלישית").length,
    },
    {
      label: "סיכון קיצוני",
      value: state.bills.filter((bill) => bill.severity === "קיצונית").length,
    },
    {
      label: "של שמחה רוטמן",
      value: state.bills.filter((bill) => bill.isSpecialMemberBill).length,
    },
    {
      label: "מעמד היועמ״ש",
      value: state.bills.filter((bill) => bill.isAttorneyGeneralStatusBill).length,
    },
  ];

  elements.metricsGrid.innerHTML = "";

  metrics.forEach((metric) => {
    const card = document.createElement("article");
    card.className = "metric-card";
    card.innerHTML = `<span>${metric.label}</span><strong>${metric.value}</strong>`;
    elements.metricsGrid.append(card);
  });
}

function renderActivityFeed() {
  const feedItems = [...state.bills]
    .sort((left, right) => new Date(right.updatedAt || 0) - new Date(left.updatedAt || 0))
    .slice(0, 4);

  elements.activityFeed.innerHTML = "";

  if (!feedItems.length) {
    elements.activityFeed.innerHTML = `<div class="activity-item"><strong>אין נתונים להצגה</strong><p>הפיד יתמלא אחרי טעינה מוצלחת של מקורות החקיקה.</p></div>`;
    return;
  }

  feedItems.forEach((bill) => {
    const item = document.createElement("article");
    item.className = "activity-item";
    item.innerHTML = `
      <strong>${bill.title}</strong>
      <p>${bill.monitoringStage || bill.status} • ${formatDate(bill.updatedAt)}</p>
      <p>${bill.harmArea}</p>
    `;
    elements.activityFeed.append(item);
  });
}

function renderBills() {
  const filteredBills = getFilteredBills();
  elements.billGrid.innerHTML = "";

  if (state.loading) {
    elements.billGrid.innerHTML = `
      <div class="empty-state">
        <h4>טוען הצעות חוק</h4>
        <p>אנחנו מושכים כרגע את כל ההצעות שהמערכת מסווגת כבעלות סיכון לדמוקרטיה הישראלית.</p>
      </div>
    `;
  } else if (state.error) {
    elements.billGrid.innerHTML = `
      <div class="empty-state">
        <h4>טעינת הנתונים נכשלה</h4>
        <p>${state.error}</p>
      </div>
    `;
  } else if (!filteredBills.length) {
    const message = state.bills.length
      ? "נסו להרחיב את הסינון או לבטל מעקב אישי כדי לראות איומים נוספים."
      : "המקור נטען, אבל לא נמצאו כרגע הצעות שעברו את סף הסיכון שהוגדר.";
    elements.billGrid.innerHTML = `
      <div class="empty-state">
        <h4>לא נמצאו הצעות חוק</h4>
        <p>${message}</p>
      </div>
    `;
  } else {
    filteredBills.forEach((bill) => elements.billGrid.append(createBillCard(bill)));
  }

  elements.resultsSummary.textContent = `${filteredBills.length} הצעות בסיכון מתוך ${state.bills.length}`;
  elements.watchlistCount.textContent = state.watchlist.length;
}

function renderSourceMeta() {
  elements.sourceBadge.textContent = state.meta.sourceLabel;
  elements.sourceBadge.dataset.kind = state.meta.sourceKind;

  if (state.meta.fallback) {
    elements.sourceHint.textContent = "מוצג מקור חלופי או מצב fallback. אפשר לרענן שוב בהמשך.";
  } else {
    elements.sourceHint.textContent = "הניטור מכסה את כלל הצעות החוק שהמערכת מסווגת כפוגעות בדמוקרטיה הישראלית.";
  }
}

function getFilteredBills() {
  return state.bills.filter((bill) => {
    const matchesQuery =
      !state.filters.query ||
      [bill.title, bill.summary, bill.sponsor, bill.harmArea, bill.riskNote, ...bill.tags]
        .join(" ")
        .toLowerCase()
        .includes(state.filters.query);

    const matchesStatus =
      state.filters.status === "all" ||
      (bill.monitoringStage || bill.status) === state.filters.status;
    const matchesCommittee =
      state.filters.committee === "all" || bill.committee === state.filters.committee;
    const matchesSeverity =
      state.filters.severity === "all" || bill.severity === state.filters.severity;
    const matchesHarmArea =
      state.filters.harmArea === "all" || bill.harmArea === state.filters.harmArea;
    const matchesWatchlist =
      !state.filters.watchlistOnly || state.watchlist.includes(bill.id);
    const matchesSpecialMember =
      !state.filters.specialMemberOnly || bill.isSpecialMemberBill;
    const matchesAttorneyGeneral =
      !state.filters.attorneyGeneralOnly || bill.isAttorneyGeneralStatusBill;

    return (
      matchesQuery &&
      matchesStatus &&
      matchesCommittee &&
      matchesSeverity &&
      matchesHarmArea &&
      matchesSpecialMember &&
      matchesAttorneyGeneral &&
      matchesWatchlist
    );
  });
}

function createBillCard(bill) {
  const template = elements.billCardTemplate.content.cloneNode(true);
  const statusPill = template.querySelector(".status-pill");
  const priorityPill = template.querySelector(".priority-pill");
  const manualPill = template.querySelector(".manual-pill");
  const focusPill = template.querySelector(".focus-pill");
  const watchButton = template.querySelector(".watch-button");
  const knessetLink = template.querySelector(".knesset-link");
  const civilOrgsField = template.querySelector(".bill-civil-orgs");
  const taskManagerField = template.querySelector(".bill-task-manager");
  const saveOpsButton = template.querySelector(".bill-ops-save");
  const opsMessage = template.querySelector(".bill-ops-message");
  const existingMetadata = state.billMetadata[bill.id] || {};

  statusPill.textContent = bill.monitoringStage || bill.status;
  priorityPill.textContent = `סיכון ${bill.severity}`;
  if (bill.severity === "גבוהה") {
    priorityPill.classList.add("priority-high");
  }
  if (bill.severity === "קיצונית") {
    priorityPill.classList.add("priority-critical");
  }
  if (bill.isManual) {
    manualPill.textContent = "הוזן ידנית";
    manualPill.classList.remove("is-hidden");
  } else if (bill.isSpecialMemberBill) {
    manualPill.textContent = "שמחה רוטמן";
    manualPill.classList.remove("is-hidden");
  } else {
    manualPill.classList.add("is-hidden");
  }
  if (bill.specialTopicLabel) {
    focusPill.textContent = bill.specialTopicLabel;
    focusPill.classList.remove("is-hidden");
  } else {
    focusPill.classList.add("is-hidden");
  }

  template.querySelector(".bill-title").textContent = bill.title;
  template.querySelector(".bill-summary").textContent = bill.summary;
  template.querySelector(".bill-sponsor").textContent = bill.sponsor;
  template.querySelector(".bill-committee").textContent = bill.committee;
  template.querySelector(".bill-updated").textContent = formatDate(bill.updatedAt);
  template.querySelector(".bill-next-step").textContent = bill.nextStep;
  template.querySelector(".bill-harm-area").textContent = bill.harmArea;
  template.querySelector(".bill-risk-score").textContent = `${bill.riskScore}/100`;
  template.querySelector(".risk-note").textContent = bill.riskNote;
  if (bill.knessetUrl) {
    knessetLink.href = bill.knessetUrl;
    knessetLink.textContent = "לצפייה בהצעת החוק באתר הכנסת";
    knessetLink.classList.add("is-visible");
  }
  civilOrgsField.value = existingMetadata.civilOrgs || "";
  taskManagerField.value = existingMetadata.taskManager || "";

  const materialsContainer = template.querySelector(".materials-list");
  const materials = Array.isArray(bill.backgroundMaterials) ? bill.backgroundMaterials : [];
  if (!materials.length) {
    const empty = document.createElement("span");
    empty.className = "material-empty";
    empty.textContent = "לא נמצא חומר רקע";
    materialsContainer.append(empty);
  } else {
    materials.forEach((material) => {
      const link = document.createElement("a");
      link.className = "material-link";
      link.href = material.url;
      link.target = "_blank";
      link.rel = "noreferrer noopener";
      link.textContent = material.label || "חומר רקע";
      materialsContainer.append(link);
    });
  }

  const tagsContainer = template.querySelector(".bill-tags");
  bill.tags.forEach((tag) => {
    const pill = document.createElement("span");
    pill.className = "tag-pill";
    pill.textContent = tag;
    tagsContainer.append(pill);
  });

  updateWatchButton(watchButton, bill.id);
  watchButton.addEventListener("click", () => {
    toggleWatchlist(bill.id);
    updateWatchButton(watchButton, bill.id);
    renderBills();
  });

  saveOpsButton.addEventListener("click", () => {
    state.billMetadata[bill.id] = {
      civilOrgs: civilOrgsField.value.trim(),
      taskManager: taskManagerField.value.trim(),
    };
    saveBillMetadata();
    opsMessage.textContent = "הנתונים נשמרו להצעת החוק.";
  });

  return template;
}

function updateWatchButton(button, billId) {
  const isActive = state.watchlist.includes(billId);
  button.textContent = isActive ? "במעקב" : "הוסף למעקב";
  button.classList.toggle("active", isActive);
}

function toggleWatchlist(billId) {
  if (state.watchlist.includes(billId)) {
    state.watchlist = state.watchlist.filter((id) => id !== billId);
  } else {
    state.watchlist = [...state.watchlist, billId];
  }

  saveWatchlist();
}

function loadWatchlist() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveWatchlist() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.watchlist));
}

function loadManualBills() {
  try {
    const raw = window.localStorage.getItem(MANUAL_BILLS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveManualBills() {
  window.localStorage.setItem(MANUAL_BILLS_STORAGE_KEY, JSON.stringify(state.manualBills));
}

function loadBillMetadata() {
  try {
    const raw = window.localStorage.getItem(BILL_METADATA_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveBillMetadata() {
  window.localStorage.setItem(BILL_METADATA_STORAGE_KEY, JSON.stringify(state.billMetadata));
}

function mergeBills(remoteBills, manualBills) {
  const merged = [...manualBills];
  const seenIds = new Set(manualBills.map((bill) => bill.id));
  remoteBills.forEach((bill) => {
    if (seenIds.has(bill.id)) {
      return;
    }
    merged.push(bill);
  });
  return merged;
}

function parseTags(rawValue) {
  return rawValue
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function severityToScore(severity) {
  if (severity === "קיצונית") {
    return 90;
  }
  if (severity === "בינונית") {
    return 65;
  }
  return 78;
}

function normalizeOptionalUrl(rawValue) {
  const value = rawValue.trim();
  if (!value) {
    return "";
  }
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }
  return `https://${value}`;
}

function isRecentlyUpdated(dateString, hours) {
  if (!dateString) {
    return false;
  }

  const updateTime = new Date(dateString).getTime();
  const windowMs = 1000 * 60 * 60 * hours;
  return Date.now() - updateTime <= windowMs;
}

function formatDate(dateString) {
  if (!dateString) {
    return "לא זמין";
  }

  return new Intl.DateTimeFormat("he-IL", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateString));
}
