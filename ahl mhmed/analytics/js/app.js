/* ============================================================
   لوحة تحليلات الزوار — Analytics Dashboard
   JavaScript / بيانات تجريبية + رسم بياني + فلاتر + بحث + الوقت الحقيقي
   ============================================================

   ⚠️ IMPORTANT:
   جميع البيانات المعروضة في هذا الملف هي Demo Data (بيانات تجريبية)
   لأغراض التصميم فقط وليست بيانات حقيقية.
   لاحقًا سيتم استبدالها ببيانات حقيقية قادمة من API وقاعدة بيانات،
   وذلك من خلال الدالة async function loadAnalyticsData().
   ============================================================ */

"use strict";

/* ------------------------------------------------------------
   أدوات مساعدة
   ------------------------------------------------------------ */
const $ = (sel, root) => (root || document).querySelector(sel);
const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

function fmt(n) {
  return Number(n).toLocaleString("en-US");
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getCssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function hexToRgba(hex, a) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/* ------------------------------------------------------------
   حالة الواجهة
   ------------------------------------------------------------ */
const uiState = {
  period: "30d",
  search: ""
};

const live = { now: 37, views: 220, baseNow: 37 };

/* ------------------------------------------------------------
   الأيقونات (SVG بسيطة)
   ------------------------------------------------------------ */
const ICONS = {
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  timer: '<line x1="10" y1="2" x2="14" y2="2"/><line x1="12" y1="14" x2="15" y2="11"/><circle cx="12" cy="14" r="8"/>',
  layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  trendUp: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
  trendDown: '<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>'
};

function iconEl(name, size) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:${size || 18}px;height:${size || 18}px">${ICONS[name] || ""}</svg>`;
}

/* ------------------------------------------------------------
   ⚠️ Demo Data - Replace later with API data
   البيانات الأساسية لقيم الفترات الزمنية
   ------------------------------------------------------------ */
const PERIOD_PARAMS = {
  day: {
    label: "اليوم",
    total: 986,
    today: 986,
    views: 1890,
    now: 37,
    avgTime: "03:24",
    sessions: 754,
    changes: { total: 12.4, today: 8.2, views: 5.6, now: 12.1, avgTime: -1.2, sessions: 9.4 }
  },
  "7d": {
    label: "آخر 7 أيام",
    total: 4320,
    today: 1245,
    views: 9840,
    now: 37,
    avgTime: "04:02",
    sessions: 3210,
    changes: { total: 6.2, today: 12.8, views: 4.1, now: 9.6, avgTime: -0.8, sessions: 7.5 }
  },
  "30d": {
    label: "آخر 30 يومًا",
    total: 12845,
    today: 1245,
    views: 26420,
    now: 37,
    avgTime: "04:32",
    sessions: 8420,
    changes: { total: 14.2, today: 9.6, views: 7.8, now: 12.1, avgTime: 2.3, sessions: 10.4 }
  },
  "90d": {
    label: "آخر 90 يومًا",
    total: 31680,
    today: 1245,
    views: 68940,
    now: 37,
    avgTime: "04:41",
    sessions: 20540,
    changes: { total: 18.3, today: 9.6, views: 11.2, now: 8.9, avgTime: 1.4, sessions: 13.6 }
  },
  year: {
    label: "هذا العام",
    total: 112490,
    today: 1245,
    views: 243800,
    now: 37,
    avgTime: "04:38",
    sessions: 73650,
    changes: { total: 21.5, today: 11.2, views: 9.7, now: 10.2, avgTime: 1.1, sessions: 17.4 }
  }
};

/* ------------------------------------------------------------
   ⚠️ Demo Data - Replace later with API data
   القوائم التجريبية الأساسية (للترتيب، ثم تُقاس حسب الفترة)
   ------------------------------------------------------------ */
const BASE = {
  countries: [
    { code: "dz", name: "الجزائر", base: 8420 },
    { code: "fr", name: "فرنسا", base: 1530 },
    { code: "ca", name: "كندا", base: 610 },
    { code: "es", name: "إسبانيا", base: 480 },
    { code: "de", name: "ألمانيا", base: 320 },
    { code: "us", name: "الولايات المتحدة", base: 265 },
    { code: "it", name: "إيطاليا", base: 190 }
  ],
  wilayas: [
    { name: "وهران", base: 3480 },
    { name: "الجزائر العاصمة", base: 2310 },
    { name: "قسنطينة", base: 1720 },
    { name: "سيدي بلعباس", base: 980 },
    { name: "البليدة", base: 880 },
    { name: "تلمسان", base: 760 },
    { name: "بجاية", base: 610 },
    { name: "مستغانم", base: 540 }
  ],
  cities: [
    { city: "وهران", wilaya: "وهران", base: 2140 },
    { city: "سيدي بلعباس", wilaya: "سيدي بلعباس", base: 1560 },
    { city: "الجزائر العاصمة", wilaya: "الجزائر", base: 1280 },
    { city: "مستغانم", wilaya: "مستغانم", base: 890 },
    { city: "تلمسان", wilaya: "تلمسان", base: 720 },
    { city: "قسنطينة", wilaya: "قسنطينة", base: 690 },
    { city: "عنابة", wilaya: "عنابة", base: 560 },
    { city: "بسكرة", wilaya: "بسكرة", base: 430 }
  ],
  communes: [
    { name: "رأس عين عميروش", wilaya: "معسكر", base: 2310 },
    { name: "معسكر", wilaya: "معسكر", base: 1840 },
    { name: "غريس", wilaya: "معسكر", base: 920 },
    { name: "عقاز", wilaya: "معسكر", base: 680 },
    { name: "المحمدية", wilaya: "معسكر", base: 540 },
    { name: "وهران", wilaya: "وهران", base: 420 },
    { name: "الجزائر الوسطى", wilaya: "الجزائر", base: 290 },
    { name: "غير محددة", wilaya: "", base: 350 }
  ],
  devices: [
    { name: "الهاتف", base: 8700, color: "#6366f1" },
    { name: "الكمبيوتر", base: 3470, color: "#0ea5e9" },
    { name: "الجهاز اللوحي", base: 640, color: "#f59e0b" }
  ],
  browsers: [
    { name: "Chrome", base: 7600 },
    { name: "Safari", base: 1980 },
    { name: "Edge", base: 1650 },
    { name: "Firefox", base: 1040 },
    { name: "Samsung Internet", base: 520 }
  ],
  operatingSystems: [
    { name: "Android", base: 5400 },
    { name: "Windows", base: 4120 },
    { name: "iOS", base: 1690 },
    { name: "macOS", base: 1180 },
    { name: "Linux", base: 410 }
  ],
  trafficSources: [
    { name: "Google", base: 4280, color: "#6366f1" },
    { name: "Direct", base: 1910, color: "#0ea5e9" },
    { name: "Facebook", base: 840, color: "#22d3ee" },
    { name: "Instagram", base: 610, color: "#a855f7" },
    { name: "YouTube", base: 480, color: "#ef4444" },
    { name: "Telegram", base: 320, color: "#10b981" },
    { name: "Other", base: 265, color: "#94a3b8" }
  ],
  pages: [
    { title: "الصفحة الرئيسية", url: "/", baseViews: 8420, baseVisitors: 5210, avg: "05:10", bounce: 32 },
    { title: "الأخبار", url: "/news", baseViews: 3860, baseVisitors: 2410, avg: "03:42", bounce: 48 },
    { title: "الخدمات", url: "/services", baseViews: 2140, baseVisitors: 1320, avg: "04:25", bounce: 41 },
    { title: "المتجر", url: "/shop", baseViews: 3120, baseVisitors: 1860, avg: "06:05", bounce: 55 },
    { title: "المقالات", url: "/articles", baseViews: 1780, baseVisitors: 1240, avg: "05:44", bounce: 62 }
  ],
  realtime: [
    { flag: "dz", country: "الجزائر", wilaya: "وهران", city: "وهران", page: "/العروض", device: "هاتف", browser: "Chrome", since: 8 },
    { flag: "fr", country: "فرنسا", wilaya: "–", city: "باريس", page: "/المقالات", device: "كمبيوتر", browser: "Safari", since: 21 },
    { flag: "dz", country: "الجزائر", wilaya: "سيدي بلعباس", city: "سيدي بلعباس", page: "/الأخبار", device: "هاتف", browser: "Chrome", since: 35 },
    { flag: "ca", country: "كندا", wilaya: "–", city: "مونتريال", page: "/المتجر", device: "كمبيوتر", browser: "Edge", since: 48 },
    { flag: "dz", country: "الجزائر", wilaya: "قسنطينة", city: "قسنطينة", page: "/الخدمات", device: "هاتف", browser: "Firefox", since: 62 },
    { flag: "es", country: "إسبانيا", wilaya: "–", city: "مدريد", page: "/الرئيسية", device: "جهاز لوحي", browser: "Samsung Internet", since: 79 },
    { flag: "dz", country: "الجزائر", wilaya: "الجزائر", city: "الجزائر العاصمة", page: "/المقالات", device: "هاتف", browser: "Chrome", since: 94 }
  ]
};

/* ------------------------------------------------------------
   ⚠️ Demo Data - Replace later with API data
   توليد سلسلة زمنية واقعية حسب الفترة
   ------------------------------------------------------------ */
const DAY_NAMES = ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"];
const MONTHS = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];

const TIMELINE_CFG = {
  day: { n: 24, labelFn: (i) => `${String(i).padStart(2, "0")}:00` },
  "7d": { n: 7, labelFn: (i) => DAY_NAMES[i % 6] },
  "30d": { n: 30, labelFn: (i) => `يوم ${i + 1}` },
  "90d": { n: 26, labelFn: (i) => `يوم ${i * 3 + 1}` },
  year: { n: 12, labelFn: (i) => MONTHS[i] }
};

// مولد عشوائي حتمي (لتكرار نفس الشكل عند إرجاع البيانات)
function seededRng(seed) {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateTimeline(period, targetTotal) {
  const cfg = TIMELINE_CFG[period];
  const rng = seededRng(period.length * 7919 + 13);
  const base = targetTotal / cfg.n;
  const points = cfg.n;

  const values = [];
  let walk = base * 0.55;
  for (let i = 0; i < points; i++) {
    const t = points <= 1 ? 0 : i / (points - 1);
    const trend = 1 + t * 1.1;
    const wave = Math.sin(t * Math.PI * 2.4) * 0.16 + Math.sin(t * Math.PI * 5.2) * 0.05;
    const noise = (rng() - 0.5) * 0.4;
    walk = walk * (0.92 + 0.14 * rng());
    let val = base * trend * (1 + wave + noise) * 0.55 + walk * 0.45;
    values.push(Math.max(5, val));
  }

  const sum = values.reduce((a, b) => a + b, 0) || 1;
  const scaled = values.map((v) => Math.max(1, Math.round((v / sum) * targetTotal)));

  const labels = [];
  for (let i = 0; i < points; i++) labels.push(cfg.labelFn(i));

  return { labels, values: scaled };
}

/* ------------------------------------------------------------
   بنية البيانات الموحّدة
   (نفس الشكل الذي ستعيده الـ API لاحقًا)
   ------------------------------------------------------------ */
const analyticsData = {
  period: "30d",
  overview: {},
  countries: [],
  wilayas: [],
  communes: [],
  cities: [],
  devices: [],
  browsers: [],
  operatingSystems: [],
  trafficSources: [],
  pages: [],
  realtime: [],
  timeline: { labels: [], values: [] }
};

/* ------------------------------------------------------------
   حساب النسبة المئوية لكل عنصر ضمن قائمته
   ------------------------------------------------------------ */
function attachPct(list) {
  const total = list.reduce((a, b) => a + (b.count || 0), 0) || 1;
  return list.map((x) => ({ ...x, pct: Math.round((x.count / total) * 1000) / 10 }));
}

/* ------------------------------------------------------------
   بناء بيانات تجريبية للفترة المحددة
   ⚠️ Demo Data - Replace later with API data
   ------------------------------------------------------------ */
function buildDemoData(period) {
  const params = PERIOD_PARAMS[period];
  const base30 = PERIOD_PARAMS["30d"].total;
  const scale = params.total / base30;

  const scaleItem = (x) => ({ ...x, count: Math.max(1, Math.round(x.base * scale)) });

  const countries = attachPct(BASE.countries.map(scaleItem));
  const wilayas = attachPct(BASE.wilayas.map(scaleItem));
  const communes = attachPct(BASE.communes.map(scaleItem));
  const cities = attachPct(BASE.cities.map(scaleItem));
  const devices = attachPct(BASE.devices.map(scaleItem));
  const browsers = attachPct(BASE.browsers.map(scaleItem));
  const operatingSystems = attachPct(BASE.operatingSystems.map(scaleItem));
  const trafficSources = attachPct(BASE.trafficSources.map(scaleItem));
  const pages = BASE.pages.map((p) => ({
    title: p.title,
    url: p.url,
    views: Math.max(1, Math.round(p.baseViews * scale)),
    visitors: Math.max(1, Math.round(p.baseVisitors * scale)),
    avg: p.avg,
    bounce: p.bounce
  }));

  return {
    period,
    overview: {
      total: params.total,
      today: params.today,
      views: params.views,
      now: params.now,
      avgTime: params.avgTime,
      sessions: params.sessions,
      changes: params.changes
    },
    countries,
    wilayas,
    communes,
    cities,
    devices,
    browsers,
    operatingSystems,
    trafficSources,
    pages,
    realtime: BASE.realtime.map((r) => ({ ...r })),
    timeline: generateTimeline(period, params.views)
  };
}

/* حالة مصدر البيانات: live = حقيقية، demo = تجريبية، error = خادم غير متاح */
let dataSource = "demo";

function setSourceNotice(status, message) {
  const el = $("#sourceNotice");
  const txt = $("#sourceNoticeText");
  if (!el || !txt) return;
  el.className = "demo-notice " + (status === "live" ? "notice-live" : status === "error" ? "notice-error" : "notice-idle");
  txt.innerHTML = message;
}

/* ------------------------------------------------------------------
   تنسيق المدة بالثواني إلى دقائق:ثواني (مثل "3:45")
   ------------------------------------------------------------------ */
function fmtDuration(sec) {
  sec = Math.max(0, Math.round(Number(sec) || 0));
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m + ":" + String(s).padStart(2, "0");
}

/* ألوان الرسم البياني الدائري للأجهزة ومصادر الزيارات
   (أسماء إنجليزية من الخادم + أسماء عربية من بيانات التجربة) */
const DEVICE_COLORS = {
  phone: "var(--primary)",
  tablet: "var(--info)",
  desktop: "var(--success)",
  "الهاتف": "var(--primary)",
  "الجهاز اللوحي": "var(--info)",
  "الكمبيوتر": "var(--success)",
  unknown: "var(--text-3)"
};
const SOURCE_COLORS = {
  Direct: "var(--primary)",
  "مباشر": "var(--primary)",
  Google: "var(--success)",
  "بحث عضوي": "var(--success)",
  Facebook: "var(--info)",
  Instagram: "var(--info)",
  Telegram: "var(--info)",
  "مواقع التواصل": "var(--info)",
  YouTube: "var(--danger)",
  Twitter: "var(--info)",
  X: "var(--info)",
  WhatsApp: "var(--success)",
  Bing: "var(--info)",
  Yahoo: "var(--info)",
  DuckDuckGo: "var(--info)",
  LinkedIn: "var(--info)",
  "إحالات": "var(--warning)",
  "أخرى": "var(--text-3)"
};

/* ------------------------------------------------------------------
   مواءمة بيانات الخادم مع تنسيق الواجهة:
   - الخادم يعيد  uniqueVisitors/online بدل total/now
   - مفاتيح التغيّرات مختلفة (uv/pv/pvDay/sid/avgTime/online)
   - الأجهزة/المصادر بدون ألوان → إضافة الألوان هنا
   - متوسط مدة الزيارة بالثواني → تنسيق م:ث
   ------------------------------------------------------------------ */
function normalizeServerData() {
  const ov = analyticsData.overview;
  if (!ov) return;
  if (typeof ov.total !== "number") ov.total = ov.uniqueVisitors || 0;
  if (typeof ov.now !== "number") ov.now = ov.online || 0;
  if (typeof ov.sessions !== "number") ov.sessions = ov.sidCount || 0;
  if (typeof ov.avgTime !== "string") ov.avgTime = fmtDuration(ov.avgTime);
  const ch = ov.changes || {};
  ov.changes = {
    total: ch.total != null ? ch.total : (ch.uv != null ? ch.uv : 0),
    today: ch.today != null ? ch.today : (ch.pvDay != null ? ch.pvDay : 0),
    views: ch.views != null ? ch.views : (ch.pv != null ? ch.pv : 0),
    now: ch.now != null ? ch.now : (ch.online != null ? ch.online : 0),
    avgTime: ch.avgTime != null ? ch.avgTime : 0,
    sessions: ch.sessions != null ? ch.sessions : (ch.sid != null ? ch.sid : 0)
  };

  if (Array.isArray(analyticsData.devices)) {
    analyticsData.devices = analyticsData.devices.map((d) => ({
      ...d,
      color: DEVICE_COLORS[d.name] || "var(--text-3)"
    }));
  }
  if (Array.isArray(analyticsData.trafficSources)) {
    analyticsData.trafficSources = analyticsData.trafficSources.map((s) => ({
      ...s,
      color: SOURCE_COLORS[s.name] || "var(--text-3)"
    }));
  }
}

/* ------------------------------------------------------------
   الدالة الرئيسية لتحميل البيانات
   تحمّل البيانات الحقيقية من الخادم (api/analytics.php)،
   وإن تعذّر الوصول للخادم تعرض بيانات تجريبية Demo Data
   مع تنبيه واضح بأنها ليست حقيقية.
   ------------------------------------------------------------ */
async function loadAnalyticsData() {
  setSourceNotice("idle", "جارٍ تحميل البيانات من الخادم...");

  let serverData = null;
  try {
    const res = await fetch("../api/analytics.php?read=1&period=" + encodeURIComponent(uiState.period), { cache: "no-store" });
    if (res.ok) {
      const j = await res.json();
      if (j && j.server === true) serverData = j;
    }
  } catch (e) {
    serverData = null;
  }

  if (serverData) {
    Object.assign(analyticsData, serverData);
    analyticsData.period = uiState.period;
    dataSource = "server";
    normalizeServerData();
    setSourceNotice(
      "live",
      "<strong>بيانات حقيقية من الخادم:</strong> هذه الأرقام مأخوذة من سجل زيارات الزوار الفعلي عبر api/analytics.php."
    );
  } else {
    // Demo Data - Replace later with API data
    Object.assign(analyticsData, buildDemoData(uiState.period));
    dataSource = "demo";
    setSourceNotice(
      "error",
      "<strong>تعذّر الوصول إلى الخادم (api/analytics.php):</strong> يتم عرض بيانات تجريبية Demo Data فقط لأغراض التصميم وليست حقيقية. لتشغيل البيانات الحقيقية، شغّل الموقع على استضافة أو خادم محلي يدعم PHP."
    );
  }

  live.baseNow = analyticsData.overview.now || 0;
  live.now = live.baseNow;
  live.views = Math.max(0, Math.round(live.baseNow * 6));

  renderAll();
}

function renderAll() {
  renderOverview();
  renderTimelineChart();
  renderDevices();
  renderSources();
  renderCountries();
  renderWilayas();
  renderCommunes();
  renderCities();
  renderBrowsers();
  renderOS();
  renderPages();
  renderRealtime();
  notifyParentSize();
}

/* ------------------------------------------------------------
   بطاقات الإحصائيات الرئيسية
   ------------------------------------------------------------ */
const OVERVIEW_CARDS = [
  { key: "total", icon: "users", tone: "primary", label: "إجمالي الزوار" },
  { key: "today", icon: "activity", tone: "info", label: "زوار اليوم" },
  { key: "views", icon: "eye", tone: "success", label: "مشاهدات الصفحات" },
  { key: "now", icon: "timer", tone: "warning", label: "الزوار الآن" },
  { key: "avgTime", icon: "layers", tone: "secondary", label: "متوسط مدة الزيارة" },
  { key: "sessions", icon: "file", tone: "danger", label: "عدد الجلسات" }
];

const TONES = {
  primary: { bg: "var(--primary-soft)", color: "var(--primary)", bar: "var(--primary)" },
  info: { bg: "var(--info-soft)", color: "var(--info)", bar: "var(--info)" },
  success: { bg: "var(--success-soft)", color: "var(--success)", bar: "var(--success)" },
  warning: { bg: "var(--warning-soft)", color: "var(--warning)", bar: "var(--warning)" },
  secondary: { bg: "var(--primary-soft)", color: "var(--primary-2)", bar: "var(--primary-2)" },
  danger: { bg: "var(--danger-soft)", color: "var(--danger)", bar: "var(--danger)" }
};

function cardValue(card, overview) {
  const v = overview[card.key];
  if (card.key === "avgTime") return v;
  if (card.key === "now") return fmt(v);
  return fmt(v);
}

function renderOverview() {
  const ov = analyticsData.overview;
  const box = $("#overviewCards");
  if (!box) return;

  box.innerHTML = OVERVIEW_CARDS.map((card) => {
    const change = ov.changes[card.key];
    const up = change >= 0;
    const value = cardValue(card, ov);
    const tone = TONES[card.tone];
    const sparkWidth = Math.min(96, Math.max(20, 20 + Math.abs(change) * 4));

    return `
      <article class="stat-card">
        <div class="stat-card-top">
          <span class="stat-icon" style="background:${tone.bg};color:${tone.color}">${iconEl(card.icon, 20)}</span>
          <span class="stat-change ${up ? "up" : "down"}">
            ${iconEl(up ? "trendUp" : "trendDown", 12)}
            ${up ? "+" : ""}${change}%
          </span>
        </div>
        <div class="stat-value">${value}</div>
        <div class="stat-label">${card.label}</div>
        <div class="stat-spark"><i style="width:${sparkWidth}%;background:${tone.bar}"></i></div>
      </article>
    `;
  }).join("");
}

/* ------------------------------------------------------------
   الرسوم البيانية (Chart.js)
   ------------------------------------------------------------ */
const charts = {};

function chartDefaults() {
  return {
    grid: getCssVar("--border"),
    text: getCssVar("--text-2"),
    primary: getCssVar("--primary"),
    surface2: getCssVar("--surface-2")
  };
}

function destroyChart(name) {
  if (charts[name]) {
    charts[name].destroy();
    charts[name] = null;
  }
}

function tooltipStyle() {
  const c = chartDefaults();
  return {
    backgroundColor: getCssVar("--text"),
    titleColor: getCssVar("--surface"),
    bodyColor: getCssVar("--surface-2"),
    borderColor: c.primary,
    borderWidth: 1,
    padding: 12,
    cornerRadius: 10,
    titleFont: { family: "Cairo", weight: 700 },
    bodyFont: { family: "Cairo", size: 12 },
    displayColors: true,
    boxWidth: 8,
    boxHeight: 8
  };
}

/* الرسم الرئيسي: الزيارات خلال الفترة */
function renderTimelineChart() {
  const el = $("#trafficChart");
  const emptyEl = $("#trafficEmpty");
  if (!el || typeof Chart === "undefined") return;
  destroyChart("traffic");
  if (emptyEl) emptyEl.classList.add("hidden");

  const c = chartDefaults();
  const labels = analyticsData.timeline.labels;
  const values = analyticsData.timeline.values;
  const total = values.reduce((a, b) => a + b, 0);

  const rangeTotal = $("#rangeTotal");

  if (!values.length) {
    if (emptyEl) emptyEl.classList.remove("hidden");
    if (rangeTotal) rangeTotal.textContent = "لا توجد زيارات مسجلة في هذه الفترة";
    return;
  }

  if (rangeTotal) rangeTotal.textContent = `${fmt(total)} زيارة خلال ${PERIOD_PARAMS[uiState.period].label}`;

  const gradient = el.getContext("2d").createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, hexToRgba(c.primary, 0.3));
  gradient.addColorStop(1, hexToRgba(c.primary, 0));

  charts.traffic = new Chart(el, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "الزيارات",
          data: values,
          borderColor: c.primary,
          backgroundColor: gradient,
          fill: true,
          tension: 0.42,
          borderWidth: 2.5,
          pointRadius: 0,
          pointHitRadius: 18,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: c.primary,
          pointHoverBorderColor: "#fff",
          pointHoverBorderWidth: 2
        }
      ]
    },
    options: {
      rtl: true,
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          ...tooltipStyle(),
          callbacks: {
            label: (ctx) => ` الزيارات: ${fmt(ctx.parsed.y)}`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: {
            color: c.text,
            font: { family: "Cairo", size: 11.5, weight: 600 },
            maxTicksLimit: labels.length > 12 ? 8 : labels.length,
            autoSkip: true,
            maxRotation: 0
          }
        },
        y: {
          beginAtZero: true,
          border: { display: false },
          grid: { color: c.grid },
          ticks: {
            color: c.text,
            font: { family: "Cairo", size: 11.5 },
            callback: (v) => fmt(v),
            maxTicksLimit: 6
          }
        }
      }
    }
  });
}

/* رسم الأجهزة */
function renderDevices() {
  const el = $("#devicesChart");
  const legend = $("#devicesLegend");
  if (!el || typeof Chart === "undefined") return;
  destroyChart("devices");

  const data = analyticsData.devices;

  if (!data.length) {
    if (legend) legend.innerHTML =
      `<div class="empty-state">${iconEl("search", 30)}<div>لا توجد بيانات لعرضها</div></div>`;
    return;
  }

  charts.devices = new Chart(el, {
    type: "doughnut",
    data: {
      labels: data.map((d) => d.name),
      datasets: [
        {
          data: data.map((d) => d.count),
          backgroundColor: data.map((d) => d.color),
          borderColor: getCssVar("--surface"),
          borderWidth: 4,
          hoverOffset: 8
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "72%",
      plugins: {
        legend: { display: false },
        tooltip: {
          ...tooltipStyle(),
          callbacks: {
            label: (ctx) => {
              const d = data[ctx.dataIndex];
              return ` ${d.name}: ${fmt(d.count)} (${d.pct}%)`;
            }
          }
        }
      }
    }
  });

  if (legend) {
    legend.innerHTML = data.map((d) => `
      <li>
        <span class="dot" style="background:${d.color}"></span>
        <span>${d.name}</span>
        <span class="legend-pct">${d.pct}%</span>
        <span class="legend-value">${fmt(d.count)}</span>
      </li>
    `).join("");
  }
}

/* رسم مصادر الزيارات */
function renderSources() {
  const el = $("#sourcesChart");
  const legend = $("#sourcesLegend");
  if (!el || typeof Chart === "undefined") return;
  destroyChart("sources");

  const data = analyticsData.trafficSources;

  if (!data.length) {
    if (legend) legend.innerHTML =
      `<div class="empty-state">${iconEl("search", 30)}<div>لا توجد بيانات لعرضها</div></div>`;
    return;
  }

  charts.sources = new Chart(el, {
    type: "doughnut",
    data: {
      labels: data.map((d) => d.name),
      datasets: [
        {
          data: data.map((d) => d.count),
          backgroundColor: data.map((d) => d.color),
          borderColor: getCssVar("--surface"),
          borderWidth: 3,
          hoverOffset: 8
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "68%",
      plugins: {
        legend: { display: false },
        tooltip: {
          ...tooltipStyle(),
          callbacks: {
            label: (ctx) => {
              const d = data[ctx.dataIndex];
              return ` ${d.name}: ${fmt(d.count)} (${d.pct}%)`;
            }
          }
        }
      }
    }
  });

  if (legend) {
    legend.innerHTML = data.map((d) => `
      <li>
        <span class="dot" style="background:${d.color}"></span>
        <span>${d.name}</span>
        <span class="legend-pct">${d.pct}%</span>
        <span class="legend-value">${fmt(d.count)}</span>
      </li>
    `).join("");
  }
}

/* ------------------------------------------------------------
   الزوار حسب البلد
   ------------------------------------------------------------ */
function listFilter(items, q, fields) {
  const query = q.trim();
  if (!query) return items;
  const norm = (s) => String(s).toLowerCase();
  return items.filter((it) =>
    fields.some((f) => norm(it[f]).includes(norm(query)))
  );
}

const PROGRESS_CLASSES = ["", "alt1", "alt2", "alt3", "alt4"];

function progressRow(item, index) {
  return `
    <li class="list-item">
      <img class="flag" src="https://flagcdn.com/w40/${item.code}.png" alt="${escapeHtml(item.name)}" loading="lazy" />
      <div class="list-main">
        <div class="list-title">${escapeHtml(item.name)}</div>
        <div class="progress"><i class="${PROGRESS_CLASSES[index % PROGRESS_CLASSES.length]}" style="width:${Math.min(100, item.pct)}%"></i></div>
      </div>
      <div class="list-meta">
        <strong>${fmt(item.count)}</strong>
        <em>${item.pct}%</em>
      </div>
    </li>
  `;
}

function renderCountries() {
  const box = $("#countriesList");
  if (!box) return;
  const rows = listFilter(analyticsData.countries, uiState.search, ["name"]);
  box.innerHTML = rows.length
    ? rows.map(progressRow).join("")
    : `<div class="empty-state">${iconEl("search", 30)}<div>لا توجد نتائج مطابقة للبحث</div></div>`;
}

/* ------------------------------------------------------------
   الزوار حسب الولاية
   ------------------------------------------------------------ */
function renderWilayas() {
  const box = $("#wilayasList");
  if (!box) return;
  const rows = listFilter(analyticsData.wilayas, uiState.search, ["name"]);
  box.innerHTML = rows.length
    ? rows.map((w, i) => `
      <li class="list-item">
        <span class="stat-icon" style="width:34px;height:34px;background:${TONES.info.bg};color:${TONES.info.color};border-radius:9px">${iconEl("globe", 16)}</span>
        <div class="list-main">
          <div class="list-title">${escapeHtml(w.name)}</div>
          <div class="progress"><i class="${PROGRESS_CLASSES[i % PROGRESS_CLASSES.length]}" style="width:${Math.min(100, w.pct)}%"></i></div>
        </div>
        <div class="list-meta">
          <strong>${fmt(w.count)}</strong>
          <em>${w.pct}%</em>
        </div>
      </li>
    `).join("")
    : `<div class="empty-state">${iconEl("search", 30)}<div>لا توجد نتائج مطابقة للبحث</div></div>`;
}

/* ------------------------------------------------------------
   الزوار حسب البلدية
   ------------------------------------------------------------ */
function renderCommunes() {
  const box = $("#communesList");
  if (!box) return;
  const rows = listFilter(analyticsData.communes, uiState.search, ["name", "wilaya"]);
  box.innerHTML = rows.length
    ? rows.map((c, i) => `
      <li class="list-item">
        <span class="stat-icon" style="width:34px;height:34px;background:${TONES.secondary.bg};color:${TONES.secondary.color};border-radius:9px">${iconEl("globe", 16)}</span>
        <div class="list-main">
          <div class="list-title">${escapeHtml(c.name)}</div>
          <div class="list-sub">${c.wilaya ? escapeHtml(c.wilaya) : "—"}</div>
          <div class="progress"><i class="${PROGRESS_CLASSES[i % PROGRESS_CLASSES.length]}" style="width:${Math.min(100, c.pct)}%"></i></div>
        </div>
        <div class="list-meta">
          <strong>${fmt(c.count)}</strong>
          <em>${c.pct}%</em>
        </div>
      </li>
    `).join("")
    : `<div class="empty-state">${iconEl("search", 30)}<div>لا توجد نتائج مطابقة للبحث</div></div>`;
}

/* ------------------------------------------------------------
   الزوار حسب المدينة
   ------------------------------------------------------------ */
function renderCities() {
  const box = $("#citiesBody");
  if (!box) return;
  const rows = listFilter(analyticsData.cities, uiState.search, ["city", "wilaya"]);
  box.innerHTML = rows.length
    ? rows.map((c) => `
      <tr>
        <td><strong>${escapeHtml(c.city)}</strong></td>
        <td>${escapeHtml(c.wilaya)}</td>
        <td>${fmt(c.count)}</td>
        <td>
          <div class="progress" style="width:110px"><i style="width:${Math.min(100, c.pct)}%"></i></div>
          <span style="font-size:11px;color:var(--text-3);font-weight:700">${c.pct}%</span>
        </td>
      </tr>
    `).join("")
    : `<tr><td colspan="4"><div class="empty-state">${iconEl("search", 30)}<div>لا توجد نتائج مطابقة للبحث</div></div></td></tr>`;
}

/* ------------------------------------------------------------
   المتصفحات
   ------------------------------------------------------------ */
const BROWSER_DOTS = {
  Chrome: "#6366f1",
  Safari: "#0ea5e9",
  Edge: "#8b5cf6",
  Firefox: "#ef4444",
  "Samsung Internet": "#22d3ee"
};

function renderBrowsers() {
  const box = $("#browsersList");
  if (!box) return;
  const rows = analyticsData.browsers;
  box.innerHTML = rows.length
    ? rows.map((b, i) => `
    <li class="list-item">
      <span class="dot" style="width:10px;height:10px;border-radius:3px;background:${BROWSER_DOTS[b.name] || TONES.primary.color}"></span>
      <div class="list-main">
        <div class="list-title">${escapeHtml(b.name)}</div>
        <div class="progress"><i class="${PROGRESS_CLASSES[i % PROGRESS_CLASSES.length]}" style="width:${Math.min(100, b.pct)}%"></i></div>
      </div>
      <div class="list-meta">
        <strong>${fmt(b.count)}</strong>
        <em>${b.pct}%</em>
      </div>
    </li>
  `).join("")
    : `<div class="empty-state">${iconEl("search", 30)}<div>لا توجد بيانات لعرضها</div></div>`;
}

/* ------------------------------------------------------------
   أنظمة التشغيل
   ------------------------------------------------------------ */
const OS_DOTS = {
  Android: "#10b981",
  Windows: "#0ea5e9",
  iOS: "#a855f7",
  macOS: "#8b5cf6",
  Linux: "#f59e0b"
};

function renderOS() {
  const box = $("#osList");
  if (!box) return;
  const rows = analyticsData.operatingSystems;
  box.innerHTML = rows.length
    ? rows.map((o, i) => `
    <li class="list-item">
      <span class="dot" style="width:10px;height:10px;border-radius:3px;background:${OS_DOTS[o.name] || TONES.primary.color}"></span>
      <div class="list-main">
        <div class="list-title">${escapeHtml(o.name)}</div>
        <div class="progress"><i class="${PROGRESS_CLASSES[i % PROGRESS_CLASSES.length]}" style="width:${Math.min(100, o.pct)}%"></i></div>
      </div>
      <div class="list-meta">
        <strong>${fmt(o.count)}</strong>
        <em>${o.pct}%</em>
      </div>
    </li>
  `).join("")
    : `<div class="empty-state">${iconEl("search", 30)}<div>لا توجد بيانات لعرضها</div></div>`;
}

/* ------------------------------------------------------------
   الصفحات الأكثر زيارة
   ------------------------------------------------------------ */
function bounceBadge(val) {
  if (val < 40) return `<span class="badge badge-bounce-low">${val}%</span>`;
  if (val < 55) return `<span class="badge badge-bounce-mid">${val}%</span>`;
  return `<span class="badge badge-bounce-high">${val}%</span>`;
}

function renderPages() {
  const box = $("#pagesBody");
  if (!box) return;
  const rows = listFilter(analyticsData.pages, uiState.search, ["title", "url"]);
  box.innerHTML = rows.length
    ? rows.map((p, i) => `
      <tr>
        <td>
          <div class="page-cell">
            ${iconEl("file", 17)}
            <div>
              <span style="color:${i === 0 ? "var(--primary)" : "var(--text)"};font-weight:800">${escapeHtml(p.title)}</span>
              <span class="page-url" dir="ltr">${escapeHtml(p.url)}</span>
            </div>
          </div>
        </td>
        <td><strong>${fmt(p.views)}</strong></td>
        <td>${fmt(p.visitors)}</td>
        <td>${p.avg}</td>
        <td>${bounceBadge(p.bounce)}</td>
      </tr>
    `).join("")
    : `<tr><td colspan="5"><div class="empty-state">${iconEl("search", 30)}<div>لا توجد نتائج مطابقة للبحث</div></div></td></tr>`;
}

/* ------------------------------------------------------------
   الزوار الآن — الوقت الحقيقي
   ------------------------------------------------------------ */
function renderRealtime() {
  const count = $("#liveCount");
  const views = $("#liveViews");
  const list = $("#realtimeList");
  if (!list) return;
  if (count) count.textContent = fmt(live.now);
  if (views) views.textContent = fmt(live.views);

  if (!analyticsData.realtime.length) {
    list.innerHTML = `<div class="empty-state">${iconEl("clock", 30)}<div>لا يوجد زوار في الوقت الحالي</div></div>`;
    return;
  }

  list.innerHTML = analyticsData.realtime.map((r, i) => `
    <li class="rt-item" style="animation-delay:${i * 0.05}s">
      <span class="rt-flag">
        <img class="flag" src="https://flagcdn.com/w40/${escapeHtml(r.flag)}.png" alt="${escapeHtml(r.country)}" loading="lazy" />
      </span>
      <div class="rt-info">
        <div class="rt-top">
          <span class="rt-city">${escapeHtml(r.city)}</span>
        </div>
        <div class="rt-wilaya">${r.wilaya === "–" ? escapeHtml(r.country) : escapeHtml(r.wilaya)}</div>
        <div class="rt-metas">
          <span class="rt-meta">${escapeHtml(r.device)}</span>
          <span class="rt-meta">${escapeHtml(r.browser)}</span>
          <span class="rt-meta">${escapeHtml(r.page)}</span>
        </div>
      </div>
      <span class="rt-since">منذ <b>${r.since}</b> ث</span>
    </li>
  `).join("");
}

function tickRealtime() {
  analyticsData.realtime.forEach((r) => {
    r.since += 3;
    if (r.since > 600) r.since = 3;
  });

  const delta = Math.round(Math.random() * 3 - 1);
  live.now = Math.max(0, live.baseNow + delta);

  const viewsDelta = Math.round(Math.random() * 12 - 4);
  live.views = Math.max(0, live.views + viewsDelta);

  renderRealtime();
}

/* ------------------------------------------------------------
   الوضع الليلي / النهاري
   ------------------------------------------------------------ */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("analytics-theme", theme);
  } catch (e) {
    /* تجاهل أخطاء التخزين */
  }
  renderTimelineChart();
  renderDevices();
  renderSources();
}

function getSavedTheme() {
  const urlTheme = new URLSearchParams(window.location.search).get("theme");
  if (urlTheme === "dark" || urlTheme === "light") return urlTheme;
  try {
    const saved = localStorage.getItem("analytics-theme");
    if (saved === "dark" || saved === "light") return saved;
  } catch (e) {
    /* تجاهل أخطاء التخزين */
  }
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/* ------------------------------------------------------------
   التوافق مع الدمج داخل لوحة التحكم (iframe)
   - إشعار اللوحة الأم بارتفاع المحتوى لضبط حجم الإطار
   - استقبال أمر تغيير الوضع الليلي من اللوحة الأم
   ------------------------------------------------------------ */
function notifyParentSize() {
  if (window.parent && window.parent !== window) {
    const height = Math.max(400, document.documentElement.scrollHeight);
    window.parent.postMessage({ type: "ahl-height", height }, "*");
  }
}

window.addEventListener("message", (e) => {
  const d = e.data;
  if (!d || typeof d !== "object") return;
  if (d.type === "ahl-theme") {
    applyTheme(d.theme === "dark" ? "dark" : "light");
  }
});

let resizeTimer = null;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(notifyParentSize, 250);
});

/* ------------------------------------------------------------
   Toast
   ------------------------------------------------------------ */
let toastTimer = null;
function showToast(message, isError) {
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.className = `toast show${isError ? " error" : ""}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.className = "toast";
  }, 2600);
}

/* ------------------------------------------------------------
   ربط الأحداث
   ------------------------------------------------------------ */
function bindEvents() {
  /* الفلتر الزمني */
  const segBtns = $$(".seg-btn");
  segBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      uiState.period = btn.dataset.period;
      segBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      loadAnalyticsData();
    });
  });

  /* البحث المباشر */
  const searchInput = $("#globalSearch");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      uiState.search = searchInput.value;
      renderCountries();
      renderWilayas();
      renderCommunes();
      renderCities();
      renderPages();
    });
  }

  /* الوضع الليلي */
  const themeBtn = $("#themeToggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      applyTheme(current === "dark" ? "light" : "dark");
    });
  }

  /* زر التحديث */
  const refreshBtn = $("#refreshBtn");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      refreshBtn.classList.add("loading");
      setTimeout(() => {
        loadAnalyticsData().then(() => {
          refreshBtn.classList.remove("loading");
          showToast("تم تحديث البيانات (Demo Data)");
        });
      }, 900);
    });
  }

  /* القائمة الجانبية */
  const menuBtn = $("#menuBtn");
  const sidebar = $("#sidebar");
  const overlay = $("#sidebarOverlay");
  const sidebarClose = $("#sidebarClose");

  const openSidebar = () => {
    sidebar.classList.add("open");
    overlay.classList.add("show");
  };
  const closeSidebar = () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
  };

  if (menuBtn) menuBtn.addEventListener("click", openSidebar);
  if (sidebarClose) sidebarClose.addEventListener("click", closeSidebar);
  if (overlay) overlay.addEventListener("click", closeSidebar);

  /* روابط القائمة الجانبية */
  const navItems = $$(".nav-item");
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navItems.forEach((n) => n.classList.remove("active"));
      item.classList.add("active");
      closeSidebar();

      if (item.dataset.target === "settings") {
        showToast("الإعدادات: سيتم تفعيلها لاحقًا");
      } else {
        const target = document.querySelector(item.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* شعار اللوحة يعيد إلى الأعلى */
  const logoLink = $("#logoLink");
  if (logoLink) {
    logoLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      closeSidebar();
    });
  }

  /* إغلاق القائمة بمفتاح Escape */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSidebar();
  });
}

/* تمييز العنصر النشط في القائمة أثناء التمرير */
function bindScrollSpy() {
  const navItems = $$(".nav-item[data-target]");
  const sections = navItems
    .map((n) => document.querySelector(n.getAttribute("href")))
    .filter(Boolean);

  if (!("IntersectionObserver" in window) || !sections.length) return;

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navItems.forEach((n) => {
            n.classList.toggle("active", n.dataset.target === id);
          });
        }
      });
    },
    { rootMargin: "-20% 0px -70% 0px" }
  );

  sections.forEach((s) => spy.observe(s));
}

/* ------------------------------------------------------------
   التهيئة
   ------------------------------------------------------------ */
function init() {
  Chart.defaults.font.family = "Cairo, sans-serif";

  applyTheme(getSavedTheme());
  bindEvents();
  bindScrollSpy();

  loadAnalyticsData().then(() => {
    console.log("لوحة Analytics جاهزة — البيانات الحالية هي Demo Data وليست حقيقية.");
    // إعادة إرسال الارتفاع بعد اكتمال تحميل الخطوط والأعلام
    [1200, 2600, 4200].forEach((ms) => setTimeout(notifyParentSize, ms));
  });

  /* تحديثات مباشرة تجريبية كل 3 ثوانٍ */
  setInterval(tickRealtime, 3000);
}

init();