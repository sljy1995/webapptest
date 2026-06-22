// ── STATE ────────────────────────────────────────────────────────────────────
let currentTheatre  = "russia-ukraine";
let currentView     = "weeklies";
let currentCap      = "manoeuvre";
let currentWeekFile = null;   // e.g. "2026-06-22"
let currentDigestFile = null; // e.g. "2026-06"

let weeklyCache  = {};  // { "2026-06-22": { ...data } }
let digestCache  = {};  // { "2026-06": { ...data } }
let manifest     = null;

// ── GITHUB RAW BASE ──────────────────────────────────────────────────────────
// When hosted on GitHub Pages this resolves relative to the repo root.
// Adjust if hosting elsewhere.
const CONTENT_BASE = "content";

// ── INIT ─────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", async () => {
  await loadManifest();
});

// ── MANIFEST ─────────────────────────────────────────────────────────────────
async function loadManifest() {
  try {
    const res = await fetch(`${CONTENT_BASE}/manifest.json`);
    manifest = await res.json();
  } catch(e) {
    showError("Could not load content manifest.");
    return;
  }

  // Build week selector from manifest
  buildWeekSelector();
  buildMonthNav();
  renderStatusChart();

  // Load latest weekly by default
  if (manifest.weeklies.length > 0) {
    const latest = manifest.weeklies[manifest.weeklies.length - 1];
    await loadWeekly(latest);
  }

  // Load latest digest
  if (manifest.digests.length > 0) {
    const latest = manifest.digests[manifest.digests.length - 1];
    await loadDigest(latest);
  }
}

// ── BUILD WEEK SELECTOR ───────────────────────────────────────────────────────
function buildWeekSelector() {
  const sel = document.getElementById("weekSelector");
  sel.innerHTML = "";
  // Show most recent first
  const sorted = [...manifest.weeklies].reverse();
  sorted.forEach(w => {
    const opt = document.createElement("option");
    opt.value = w;
    opt.textContent = formatWeekLabel(w);
    sel.appendChild(opt);
  });
  sel.addEventListener("change", async () => {
    await loadWeekly(sel.value);
  });
}

function formatWeekLabel(dateStr) {
  // "2026-06-22" → "Week of 22 Jun 2026"
  const [y, m, d] = dateStr.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `Week of ${parseInt(d)} ${months[parseInt(m)-1]} ${y}`;
}

// ── BUILD MONTH NAV ───────────────────────────────────────────────────────────
function buildMonthNav() {
  const ul = document.querySelector(".month-nav ul");
  ul.innerHTML = "";
  // Group weeklies by month, derive unique months, show most recent first
  const months = [];
  const seen = new Set();
  [...manifest.weeklies].reverse().forEach(w => {
    const ym = w.slice(0, 7); // "2026-06"
    if (!seen.has(ym)) { seen.add(ym); months.push(ym); }
  });

  months.forEach((ym, i) => {
    const li = document.createElement("li");
    li.textContent = formatMonthLabel(ym);
    li.dataset.ym = ym;
    if (i === 0) li.classList.add("active");
    li.addEventListener("click", () => selectMonth(li, ym));
    ul.appendChild(li);
  });
}

function formatMonthLabel(ym) {
  const [y, m] = ym.split("-");
  const months = ["January","February","March","April","May","June",
                  "July","August","September","October","November","December"];
  return `${months[parseInt(m)-1]} ${y}`;
}

// ── LOAD WEEKLY ───────────────────────────────────────────────────────────────
async function loadWeekly(dateStr) {
  currentWeekFile = dateStr;

  if (!weeklyCache[dateStr]) {
    try {
      const res = await fetch(`${CONTENT_BASE}/weeklies/${dateStr}.json`);
      weeklyCache[dateStr] = await res.json();
    } catch(e) {
      showError(`Could not load weekly: ${dateStr}`);
      return;
    }
  }

  // Sync week selector
  const sel = document.getElementById("weekSelector");
  sel.value = dateStr;

  // Sync month nav
  const ym = dateStr.slice(0, 7);
  document.querySelectorAll(".month-nav li").forEach(li => {
    li.classList.toggle("active", li.dataset.ym === ym);
  });

  renderArticles();
}

// ── LOAD DIGEST ───────────────────────────────────────────────────────────────
async function loadDigest(ym) {
  currentDigestFile = ym;

  if (!digestCache[ym]) {
    try {
      const res = await fetch(`${CONTENT_BASE}/digests/${ym}.json`);
      digestCache[ym] = await res.json();
    } catch(e) {
      showError(`Could not load digest: ${ym}`);
      return;
    }
  }

  renderDigest();
}

// ── STATUS CHART ──────────────────────────────────────────────────────────────
function renderStatusChart() {
  if (!manifest) return;
  const grid = document.getElementById("statusChartGrid");
  grid.innerHTML = manifest.statusChart.map(item => `
    <div class="status-item">
      <div class="status-dot ${item.status}"></div>
      <span><strong>${item.theatre}</strong> — ${item.label}</span>
    </div>
  `).join("");
}

function toggleStatusChart() {
  document.getElementById("statusChartPanel").classList.toggle("open");
  document.getElementById("statusArrow").classList.toggle("open");
}

// ── SIDEBAR ───────────────────────────────────────────────────────────────────
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("open");
  document.getElementById("sidebarOverlay").classList.toggle("active");
}
function closeSidebar() {
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("sidebarOverlay").classList.remove("active");
}

// ── VIEW SWITCHING ─────────────────────────────────────────────────────────────
function showView(view) {
  currentView = view;
  const weekliesView = document.getElementById("weekliesView");
  const digestView   = document.getElementById("digestView");
  const theatreTabs  = document.getElementById("theatreTabs");
  const weekWrap     = document.getElementById("weekSelectorWrap");

  if (view === "digest") {
    weekliesView.classList.add("hidden");
    digestView.classList.remove("hidden");
    theatreTabs.style.display = "none";
    weekWrap.style.display = "none";
    // Load latest digest for the current month if not loaded
    if (!currentDigestFile && manifest && manifest.digests.length > 0) {
      loadDigest(manifest.digests[manifest.digests.length - 1]);
    } else {
      renderDigest();
    }
  } else {
    digestView.classList.add("hidden");
    weekliesView.classList.remove("hidden");
    theatreTabs.style.display = "";
    weekWrap.style.display = "";
    renderArticles();
  }
}

// ── THEATRE TABS ──────────────────────────────────────────────────────────────
function selectTheatre(btn) {
  document.querySelectorAll(".theatre-tab").forEach(t => t.classList.remove("active"));
  btn.classList.add("active");
  currentTheatre = btn.dataset.theatre;
  renderArticles();
}

// ── MONTH NAV ─────────────────────────────────────────────────────────────────
async function selectMonth(el, ym) {
  document.querySelectorAll(".month-nav li").forEach(li => li.classList.remove("active"));
  el.classList.add("active");

  // Find the most recent weekly for this month
  const weeksInMonth = manifest.weeklies.filter(w => w.startsWith(ym));
  if (weeksInMonth.length > 0) {
    const latest = weeksInMonth[weeksInMonth.length - 1];
    await loadWeekly(latest);
  }
}

// ── RENDER ARTICLES ───────────────────────────────────────────────────────────
function renderArticles() {
  const panel = document.getElementById("articlePanel");

  if (!currentWeekFile || !weeklyCache[currentWeekFile]) {
    panel.innerHTML = `<div class="empty-state">Loading content…</div>`;
    return;
  }

  const data = weeklyCache[currentWeekFile];
  const theatreData = data.theatres.find(t => t.id === currentTheatre);

  if (!theatreData) {
    panel.innerHTML = `<div class="empty-state">No content for this theatre this week.</div>`;
    return;
  }

  panel.innerHTML = `
    <div class="theatre-badge">${theatreData.theatreNum}</div>
    <div class="article-block">
      <div class="article-title">${theatreData.title}</div>
      <div class="article-subtitle">${theatreData.subtitle}</div>
      ${theatreData.articles.map(a => renderArticle(a)).join("")}
    </div>
  `;
}

function renderArticle(a) {
  const tags = a.tags.map(t => `<span class="tag">${t}</span>`).join("");
  const sources = (a.sources || []).map(s => `<span class="source-tag"># ${s}</span>`).join("");
  const implications = (a.implications || []).length > 0 ? `
    <div class="implication-block">
      <div class="implication-label">IMPLICATION [${a.implicationLabel}]</div>
      <ul class="implication-points">
        ${a.implications.map(i => `<li>${i}</li>`).join("")}
      </ul>
    </div>
  ` : "";

  return `
    <div class="story-block">
      <div class="article-tags">${tags}</div>
      <div class="story-label">${a.headline}</div>
      <div class="story-body">${a.body} ${sources}</div>
      ${implications}
    </div>
  `;
}

// ── DIGEST ────────────────────────────────────────────────────────────────────
function selectCap(btn) {
  document.querySelectorAll(".cap-tab").forEach(t => t.classList.remove("active"));
  btn.classList.add("active");
  currentCap = btn.dataset.cap;
  renderDigest();
}

function renderDigest() {
  if (!currentDigestFile || !digestCache[currentDigestFile]) return;
  const d = digestCache[currentDigestFile].capabilities[currentCap];
  if (!d) return;

  document.getElementById("digestChanged").innerHTML =
    `<p style="font-family:Georgia,serif;font-size:13.5px;color:var(--text-muted);line-height:1.75;">${d.changed}</p>`;

  document.getElementById("digestOpportunities").innerHTML =
    d.opportunities.map((o, i) => `
      <div class="digest-card">
        <div class="digest-card-title">Opportunity #${i+1}: ${o.title}</div>
        <div class="digest-card-body">${o.body}</div>
      </div>
    `).join("");

  document.getElementById("digestVulnerabilities").innerHTML =
    d.vulnerabilities.map((v, i) => `
      <div class="digest-card">
        <div class="digest-card-title">Vulnerability #${i+1}: ${v.title}</div>
        <div class="digest-card-body">${v.body}</div>
      </div>
    `).join("");

  document.getElementById("digestCapdev").innerHTML =
    d.capdevs.map((c, i) => `
      <div class="digest-card">
        <div class="digest-card-title">CapDev #${i+1}: ${c.title}</div>
        <div class="digest-card-body">${c.body}</div>
      </div>
    `).join("");
}

// ── ERROR ─────────────────────────────────────────────────────────────────────
function showError(msg) {
  console.error(msg);
}
