// PMO Copilot AI — Decision Dashboard Dynamic Content
// Reads structured AI agent response payload dynamically from shared AIAgentService.

document.addEventListener('DOMContentLoaded', async () => {
  // --- Parse URL Parameters ---
  const params = new URLSearchParams(window.location.search);
  const projectDesc = params.get('desc') || 'AI-Powered Customer Support Platform';
  const industry = params.get('ind') || 'Technology';
  const goal = params.get('goal') || 'Build a New Product';

  // --- Populate Header Metadata ---
  const projectName = projectDesc.length > 60 ? projectDesc.substring(0, 57) + '...' : projectDesc;
  document.getElementById('metaProjectName').textContent = projectName;
  document.getElementById('metaIndustry').textContent = industry;
  document.getElementById('metaGoal').textContent = goal;

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  document.getElementById('metaTimestamp').textContent = `${dateStr}, ${timeStr}`;

  // --- Fetch dynamic AI Agent response data from API service ---
  const data = await window.PMOAPIService.getAnalysisResult(industry, goal, projectDesc);

  if (!data) {
    console.error("No analysis data available (API failure and fallback unavailable).");
    return;
  }

  // --- Executive Recommendation ---
  const recBadge = document.getElementById('recBadge');
  const recTitle = document.getElementById('recTitle');
  const recDesc = document.getElementById('recDesc');
  const recConfidence = document.getElementById('recConfidence');
  const recRisk = document.getElementById('recRisk');

  recBadge.textContent = data.exec.badgeIcon + ' ' + data.exec.badgeText;
  recBadge.className = `rec-badge ${data.exec.badgeClass}`;
  recTitle.textContent = data.exec.title;
  recDesc.textContent = data.exec.desc;
  recConfidence.textContent = data.exec.confidence + '%';
  recRisk.textContent = data.exec.riskLevel;
  recRisk.className = `rec-stat-val ${data.exec.riskClass}`;

  // --- Business Analyst Card ---
  document.getElementById('baSummary').textContent = data.ba.summary;
  document.getElementById('baRequirements').innerHTML = listToUl(data.ba.requirements);
  document.getElementById('baNextStep').querySelector('span').textContent = data.ba.nextStep;

  // --- Project Manager Card ---
  document.getElementById('pmTimeline').textContent = data.pm.timeline;
  document.getElementById('pmMilestones').innerHTML = listToUl(data.pm.milestones);
  document.getElementById('pmNextStep').querySelector('span').textContent = data.pm.nextStep;

  // --- Risk Manager Card ---
  document.getElementById('riskTopRisks').innerHTML = listToUl(data.risk.topRisks);
  document.getElementById('riskMitigations').innerHTML = `<p style="margin-bottom:8px"><strong>Severity:</strong> ${data.risk.severity}</p>` + listToUl(data.risk.mitigations);
  document.getElementById('riskNextStep').querySelector('span').textContent = data.risk.nextStep;

  // --- Release Manager Card ---
  document.getElementById('relReadiness').innerHTML = `<span style="font-size:1.6rem; font-weight:800; color:#06b6d4;">${data.release.readinessScore}%</span> <span style="color:#94a3b8; margin-left:8px;">Readiness Score</span>`;
  document.getElementById('relChecklist').innerHTML = `<p style="margin-bottom:8px">${data.release.deployRec}</p>` + listToUl(data.release.checklist);
  document.getElementById('relNextStep').querySelector('span').textContent = data.release.nextStep;

  // --- KPI Insights ---
  animateKPI('kpiTimeline', data.kpis.timeline);
  animateKPI('kpiBudget', data.kpis.budget);
  animateKPI('kpiRisk', data.kpis.risk);
  animateKPI('kpiReq', data.kpis.req);
  animateKPI('kpiRelease', data.kpis.release);

  // --- Why This Recommendation ---
  document.getElementById('whyBA').textContent = data.why.ba;
  document.getElementById('whyPM').textContent = data.why.pm;
  document.getElementById('whyRisk').textContent = data.why.risk;
  document.getElementById('whyRelease').textContent = data.why.release;

  // --- Action Buttons ---
  document.getElementById('btnViewReport').addEventListener('click', () => {
    window.location.href = `report.html?desc=${encodeURIComponent(projectDesc)}&ind=${encodeURIComponent(industry)}&goal=${encodeURIComponent(goal)}`;
  });

  document.getElementById('btnExportReport').addEventListener('click', () => {
    alert('Export functionality coming soon.\n\nReport formats: PDF, Markdown, DOCX');
  });

  // --- Navbar scroll effect ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
});

// --- Helpers ---

function listToUl(items) {
  return '<ul>' + items.map(i => `<li>${i}</li>`).join('') + '</ul>';
}

function animateKPI(prefix, kpiData) {
  const valEl = document.getElementById(prefix + 'Val');
  const statusEl = document.getElementById(prefix + 'Status');
  const barEl = document.getElementById(prefix + 'Bar');

  if (!valEl || !statusEl || !barEl) return;

  valEl.textContent = kpiData.value + '%';
  valEl.style.color = kpiData.color;
  statusEl.textContent = kpiData.status;
  statusEl.className = `kpi-status ${kpiData.statusClass}`;
  barEl.className = `kpi-progress-bar ${kpiData.statusClass}`;

  // Animate bar fill with a slight delay
  setTimeout(() => {
    barEl.style.width = kpiData.value + '%';
    barEl.style.transition = 'width 1s cubic-bezier(0.16, 1, 0.3, 1)';
  }, 300);
}
