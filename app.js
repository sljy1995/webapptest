// ── STATE ────────────────────────────────────────────────────────────────────
let currentTheatre  = "russia-ukraine";
let currentView     = "weeklies";
let currentCap      = "manoeuvre";
let currentSec      = "opportunities";
let currentWeekFile = null;
let currentDigestFile = null;

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
  // Default to latest month
  const latestWeek = manifest.weeklies[manifest.weeklies.length - 1];
  const latestYM = latestWeek.slice(0, 7);
  const weeksInMonth = manifest.weeklies.filter(w => w.startsWith(latestYM)).reverse();
  sel.innerHTML = weeksInMonth.map(w =>
    `<option value="${w}">${formatWeekLabel(w)}</option>`
  ).join("");
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
  const ul = document.getElementById("monthStripList");
  if (!ul) return;
  ul.innerHTML = "";
  const months = [];
  const seen = new Set();
  [...manifest.weeklies].reverse().forEach(w => {
    const ym = w.slice(0, 7);
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

  const ym = dateStr.slice(0, 7);

  // Sync month strip active state
  document.querySelectorAll("#monthStripList li").forEach(li => {
    li.classList.toggle("active", li.dataset.ym === ym);
  });

  // Rebuild week selector to show this month's weeks, select current
  const sel = document.getElementById("weekSelector");
  const weeksInMonth = manifest.weeklies.filter(w => w.startsWith(ym)).reverse();
  sel.innerHTML = weeksInMonth.map(w =>
    `<option value="${w}"${w === dateStr ? " selected" : ""}>${formatWeekLabel(w)}</option>`
  ).join("");

  renderStatusChart();
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
  const grid = document.getElementById("statusChartGrid");

  // Use current week's status data if available, else fall back to manifest
  let rows = null;
  if (currentWeekFile && weeklyCache[currentWeekFile] && weeklyCache[currentWeekFile].statusChart) {
    rows = weeklyCache[currentWeekFile].statusChart;
  } else if (manifest && manifest.statusChart) {
    rows = manifest.statusChart;
  }

  if (!rows) { grid.innerHTML = ""; return; }

  // Render as a proper table matching the reference design
  const phaseClass = (phase) => {
    const p = phase.toLowerCase();
    if (p.includes('collapsed') || p.includes('active') || p.includes('attritional')) return 'ph-active';
    if (p.includes('ceasefire') || p.includes('holding')) return 'ph-cease';
    return 'ph-pause';
  };
  const trendColor = (trend) => {
    if (trend.includes('↑')) return '#ef4444';
    if (trend.includes('→')) return '#94a3b8';
    return '#f59e0b';
  };

  grid.innerHTML = `
    <table class="status-table">
      <thead>
        <tr>
          <th>Theatre</th>
          <th>Phase</th>
          <th>Trend</th>
          <th>Progress to date</th>
        </tr>
      </thead>
      <tbody>
        ${rows.map(r => `
          <tr>
            <td class="st-theatre">${r.theatre}</td>
            <td class="st-phase"><span class="st-pill ${phaseClass(r.phase)}">${r.phase}</span></td>
            <td class="st-trend" style="color:${trendColor(r.trend)}">${r.trend}</td>
            <td class="st-progress">${r.progress}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
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

function showView(view) {
  currentView = view;
  const weekliesView   = document.getElementById("weekliesView");
  const digestView     = document.getElementById("digestView");
  const theatreTabs    = document.getElementById("theatreTabs");
  const weekWrap       = document.getElementById("weekSelectorWrap");
  const statusBarWrap  = document.getElementById("statusBarWrap");
  const monthStripWrap = document.getElementById("monthStripWrap");

  if (view === "digest") {
    weekliesView.classList.add("hidden");
    digestView.classList.remove("hidden");
    theatreTabs.style.display = "none";
    weekWrap.style.display = "none";
    if (statusBarWrap)  statusBarWrap.style.display  = "none";
    if (monthStripWrap) monthStripWrap.style.display = "none";
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
    if (statusBarWrap)  statusBarWrap.style.display  = "";
    if (monthStripWrap) monthStripWrap.style.display = "";
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
  document.querySelectorAll("#monthStripList li").forEach(li => li.classList.remove("active"));
  el.classList.add("active");

  const sel = document.getElementById("weekSelector");
  const weeksInMonth = manifest.weeklies.filter(w => w.startsWith(ym)).reverse();
  sel.innerHTML = weeksInMonth.map(w =>
    `<option value="${w}">${formatWeekLabel(w)}</option>`
  ).join("");

  if (weeksInMonth.length > 0) {
    await loadWeekly(weeksInMonth[0]);
  }
}

// ── RENDER ARTICLES ───────────────────────────────────────────────────────────
function renderArticles() {
  const panel = document.getElementById("articlePanel");

  if (!currentWeekFile || !weeklyCache[currentWeekFile]) {
    panel.innerHTML = `<div class="article-inner"><p style="color:var(--text-dim);padding:40px 0;text-align:center;">Loading content…</p></div>`;
    return;
  }

  const data = weeklyCache[currentWeekFile];
  const theatreData = data.theatres.find(t => t.id === currentTheatre);

  if (!theatreData || !theatreData.articles.length) {
    panel.innerHTML = `<div class="article-inner"><p style="color:var(--text-dim);padding:40px 0;text-align:center;">No content for this theatre this week.</p></div>`;
    return;
  }

  // Infographic link — check for week-specific file, fall back to methodology.png
  const infraLink = `
    <a href="content/methodology.png" target="_blank" class="infographic-link">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
      View Infographic
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="opacity:0.5"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
    </a>
  `;

  panel.innerHTML = `
    <div class="article-inner">
      ${infraLink}
      <div class="article-theatre-header">
        <div class="article-title">${theatreData.title}</div>
        ${theatreData.subtitle ? `<div class="article-subtitle">${theatreData.subtitle}</div>` : ''}
      </div>
      ${theatreData.articles.map(a => renderArticle(a)).join("")}
    </div>
  `;
}

function renderArticle(a) {
  const tags = a.tags.map(t => `<span class="tag">${t}</span>`).join("");
  const sources = (a.sources || []).map(s => `<span class="source-tag"># ${s}</span>`).join("");
  const implications = (a.implications || []).length > 0 ? `
    <div class="implication-block">
      <div class="implication-label">IMPLICATION <span>[${a.implicationLabel}]</span></div>
      <ul class="implication-points">
        ${a.implications.map(i => `<li>${i}</li>`).join("")}
      </ul>
    </div>
  ` : "";

  return `
    <div class="story-card">
      <div class="story-card-tags">${tags}</div>
      <div class="story-label">${a.headline}</div>
      <div class="story-body">${a.body} ${sources}</div>
      ${implications}
    </div>
  `;
}

// ── DIGEST ────────────────────────────────────────────────────────────────────
function toggleDigestChanged() {
  document.getElementById("digestChangedPanel").classList.toggle("open");
  document.getElementById("digestChangedArrow").classList.toggle("open");
}

function selectCap(btn) {
  document.querySelectorAll("#capTabsRow .theatre-tab").forEach(t => t.classList.remove("active"));
  btn.classList.add("active");
  currentCap = btn.dataset.cap;
  renderDigest();
}

function selectSec(el) {
  document.querySelectorAll("#digestView .side-nav li").forEach(li => li.classList.remove("active"));
  el.classList.add("active");
  currentSec = el.dataset.sec;
  renderDigest();
}

function renderDigest() {
  if (!currentDigestFile || !digestCache[currentDigestFile]) return;
  const digestData = digestCache[currentDigestFile];
  const d = digestData.capabilities[currentCap];
  const panel = document.getElementById("digestContent");
  if (!d || !panel) return;

  // Populate "What Changed" bar text
  const changedBody = document.getElementById("digestChangedBody");
  if (changedBody) changedBody.textContent = d.changed || "";

  const secLabels = {
    opportunities:   "Opportunities",
    vulnerabilities: "Vulnerabilities",
    capdevs:         "Capability Developments"
  };

  const items = d[currentSec] || [];
  const prefix = currentSec === "opportunities" ? "Opportunity"
               : currentSec === "vulnerabilities" ? "Vulnerability"
               : "CapDev";

  let html = `<div class="article-inner">`;
  html += `<div class="digest-section-header">${secLabels[currentSec] || currentSec}</div>`;
  html += items.map((item, i) => `
    <div class="digest-card">
      <div class="digest-card-number">${prefix} #${i+1}</div>
      <div class="digest-card-title">${item.title}</div>
      <div class="digest-card-body">${item.body}</div>
    </div>
  `).join("");
  html += `</div>`;
  panel.innerHTML = html;
}

// ── ERROR ─────────────────────────────────────────────────────────────────────
function showError(msg) {
  console.error(msg);
}
