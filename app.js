// ── STATE ────────────────────────────────────────────────────────────────────
let currentTheatre = "russia-ukraine";
let currentMonth   = "jun2026";
let currentView    = "weeklies";   // "weeklies" | "digest"
let currentCap     = "manoeuvre";

// ── INIT ─────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderStatusChart();
  renderArticles();
  renderDigest();
});

// ── SIDEBAR ──────────────────────────────────────────────────────────────────
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("open");
  document.getElementById("sidebarOverlay").classList.toggle("active");
}
function closeSidebar() {
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("sidebarOverlay").classList.remove("active");
}

// ── VIEW SWITCHING ────────────────────────────────────────────────────────────
function showView(view) {
  currentView = view;
  const weekliesView = document.getElementById("weekliesView");
  const digestView   = document.getElementById("digestView");
  const theatreTabs  = document.getElementById("theatreTabs");
  const statusBar    = document.getElementById("statusBar");
  const weekWrap     = document.getElementById("weekSelectorWrap");

  if (view === "digest") {
    weekliesView.classList.add("hidden");
    digestView.classList.remove("hidden");
    theatreTabs.style.display = "none";
    weekWrap.style.display = "none";
  } else {
    digestView.classList.add("hidden");
    weekliesView.classList.remove("hidden");
    theatreTabs.style.display = "";
    weekWrap.style.display = "";
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
const monthMap = {
  jun2026: "jun2026",
  may2026: "may2026",
  apr2026: "apr2026",
  mar2026: "mar2026"
};
function selectMonth(el, month) {
  document.querySelectorAll(".month-nav li").forEach(li => li.classList.remove("active"));
  el.classList.add("active");
  currentMonth = month;
  renderArticles();
}

// ── STATUS CHART ──────────────────────────────────────────────────────────────
function renderStatusChart() {
  const grid = document.getElementById("statusChartGrid");
  grid.innerHTML = DATA.statusChart.map(item => `
    <div class="status-item">
      <div class="status-dot ${item.status}"></div>
      <span><strong>${item.theatre}</strong> — ${item.label}</span>
    </div>
  `).join("");
}

function toggleStatusChart() {
  const panel = document.getElementById("statusChartPanel");
  const arrow = document.getElementById("statusArrow");
  panel.classList.toggle("open");
  arrow.classList.toggle("open");
}

// ── RENDER ARTICLES ───────────────────────────────────────────────────────────
function renderArticles() {
  const panel = document.getElementById("articlePanel");
  const theatreData = DATA.weeklies[currentTheatre];
  const monthData = theatreData ? theatreData[currentMonth] : null;

  if (!monthData || monthData.length === 0) {
    panel.innerHTML = `<div style="color:var(--text-dim);padding:40px;text-align:center;font-style:italic;">No content available for this selection.</div>`;
    return;
  }

  panel.innerHTML = monthData.map(section => `
    <div class="theatre-badge">${section.theatreNum}</div>
    <div class="article-block">
      <div class="article-title">${section.title}</div>
      <div class="article-subtitle">${section.subtitle}</div>
      ${section.articles.map(a => renderArticle(a)).join("")}
    </div>
  `).join("");
}

function renderArticle(a) {
  const tags = a.tags.map(t => `<span class="tag">${t}</span>`).join("");
  const sources = a.sources.map(s => `<span class="source-tag"># ${s}</span>`).join("");
  const implications = a.implications.length > 0 ? `
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
  const d = DATA.digest[currentCap];
  if (!d) return;

  document.getElementById("digestChanged").innerHTML = `<p style="font-family:Georgia,serif;font-size:13.5px;color:var(--text-muted);line-height:1.75;">${d.changed}</p>`;

  document.getElementById("digestOpportunities").innerHTML = d.opportunities.map((o, i) => `
    <div class="digest-card">
      <div class="digest-card-title">Opportunity #${i+1}: ${o.title}</div>
      <div class="digest-card-body">${o.body}</div>
    </div>
  `).join("");

  document.getElementById("digestVulnerabilities").innerHTML = d.vulnerabilities.map((v, i) => `
    <div class="digest-card">
      <div class="digest-card-title">Vulnerability #${i+1}: ${v.title}</div>
      <div class="digest-card-body">${v.body}</div>
    </div>
  `).join("");

  document.getElementById("digestCapdev").innerHTML = d.capdevs.map((c, i) => `
    <div class="digest-card">
      <div class="digest-card-title">CapDev #${i+1}: ${c.title}</div>
      <div class="digest-card-body">${c.body}</div>
    </div>
  `).join("");
}
