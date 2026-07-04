// PMO Copilot AI — Full Report Dynamic Content
// Reads structured AI agent response payload dynamically from shared AIAgentService.

document.addEventListener('DOMContentLoaded', async () => {
  // --- Parse URL Parameters ---
  const params = new URLSearchParams(window.location.search);
  const projectDesc = params.get('desc') || 'AI-Powered Customer Support Platform';
  const industry = params.get('ind') || 'Technology';
  const goal = params.get('goal') || 'Build a New Product';

  // --- Title Block ---
  const projectName = projectDesc.length > 80 ? projectDesc.substring(0, 77) + '...' : projectDesc;
  document.getElementById('reportTitle').textContent = projectName;
  document.getElementById('reportIndustry').textContent = industry;
  document.getElementById('reportGoal').textContent = goal;

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  document.getElementById('reportDate').textContent = `${dateStr} at ${timeStr}`;
  document.getElementById('reportFooterTimestamp').textContent = `Generated on ${dateStr} at ${timeStr} UTC`;

  const dashboardUrl = `dashboard.html?desc=${encodeURIComponent(projectDesc)}&ind=${encodeURIComponent(industry)}&goal=${encodeURIComponent(goal)}`;

  // --- Back to Dashboard links ---
  const backBtn = document.getElementById('btnBackDashboard');
  if (backBtn) backBtn.href = dashboardUrl;
  
  const bottomBackBtn = document.getElementById('btnBottomBackDashboard');
  if (bottomBackBtn) bottomBackBtn.href = dashboardUrl;

  // --- Export placeholder ---

  
  const exportBtn = document.getElementById('btnExportReport');
  if (exportBtn) exportBtn.addEventListener('click', handleExport);
  
  const bottomExportBtn = document.getElementById('btnBottomExportReport');
  if (bottomExportBtn) bottomExportBtn.addEventListener('click', handleExport);

  // --- Collapsible Cards Interactivity ---
  const headers = document.querySelectorAll('.report-section-header');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const section = header.closest('.report-section');
      section.classList.toggle('collapsed');
    });
  });

  // --- Fetch dynamic AI Agent response data from API service ---
  const data = await window.PMOAPIService.getAnalysisResult(industry, goal, projectDesc);
  
  if (!data) {
    console.error("No analysis data available (API failure and fallback unavailable).");
    return;
  }
  
  populateReport(data);
  
  // Store data globally for export
  window.currentReportData = data;
  
  // --- Sticky bar scroll effect ---
  const bar = document.getElementById('reportActionBar');
  window.addEventListener('scroll', () => {
    bar.classList.toggle('scrolled', window.scrollY > 80);
  });

  // --- Animate readiness ring ---
  setTimeout(() => {
    const arc = document.getElementById('readinessArc');
    const circumference = 326.73;
    const offset = circumference - (circumference * data.release.readinessScore / 100);
    arc.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
    arc.style.strokeDashoffset = offset;
  }, 400);

  // --- Section entrance animation ---
  const sections = document.querySelectorAll('.report-section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  sections.forEach(s => observer.observe(s));
});

// --- Populate all report sections ---
function populateReport(data) {
  // Executive Summary
  const badge = document.getElementById('execRecBadge');
  badge.textContent = data.exec.badgeIcon + ' ' + data.exec.badgeText;
  badge.className = `exec-summary-rec-badge ${data.exec.badgeClass}`;
  document.getElementById('execSummaryText').textContent = data.exec.summary;
  document.getElementById('execConfidence').textContent = data.exec.confidence + '%';
  document.getElementById('execConfidence').style.color = data.exec.confidence >= 85 ? '#10b981' : '#f59e0b';
  document.getElementById('execRiskLevel').textContent = data.exec.riskLevel;
  document.getElementById('execRiskLevel').style.color = data.exec.riskLevel === 'Low' ? '#10b981' : data.exec.riskLevel === 'Medium' ? '#f59e0b' : '#ef4444';
  document.getElementById('execTimeline').textContent = data.pm.timelineShort;
  document.getElementById('execReadiness').textContent = data.release.readinessScore + '%';
  document.getElementById('execReadiness').style.color = data.release.readinessScore >= 80 ? '#10b981' : '#f59e0b';

  // Business Requirements
  document.getElementById('bizContext').textContent = data.ba.context;
  document.getElementById('bizRequirements').innerHTML = buildNumberedList(data.ba.requirements);
  document.getElementById('bizStakeholder').textContent = data.ba.stakeholder;
  document.getElementById('bizNextStep').querySelector('span').textContent = 'Next Step: ' + data.ba.nextStep;

  // Project Roadmap
  document.getElementById('roadmapTimeline').textContent = data.pm.timeline;
  document.getElementById('roadmapMilestones').innerHTML = buildMilestoneTimeline(data.pm.milestonesDetailed);
  document.getElementById('roadmapResources').textContent = data.pm.resources;
  document.getElementById('roadmapNextStep').querySelector('span').textContent = 'Next Step: ' + data.pm.nextStep;

  // Risk Assessment
  document.getElementById('riskOverview').textContent = data.risk.overview;
  document.getElementById('riskTable').innerHTML = buildRiskTable(data.risk.risks);
  document.getElementById('riskMitigations').innerHTML = buildNumberedList(data.risk.mitigations);
  document.getElementById('riskNextStep').querySelector('span').textContent = 'Action Required: ' + data.risk.nextStep;

  // Release Readiness
  document.getElementById('readinessValue').textContent = data.release.readinessScore + '%';
  document.getElementById('readinessSummary').textContent = data.release.summary;
  document.getElementById('releaseDeployment').textContent = data.release.deployRec;
  document.getElementById('releaseChecklist').innerHTML = buildChecklist(data.release.checklist);
  document.getElementById('releaseNextStep').querySelector('span').textContent = 'Next Step: ' + data.release.nextStep;

  // Final Recommendation
  document.getElementById('finalVerdict').textContent = data.final.verdict;
  document.getElementById('finalVerdict').className = `final-rec-verdict ${data.final.verdictClass}`;
  document.getElementById('finalRationale').textContent = data.final.rationale;

  const agentStatuses = [
    { id: 'finalBA', status: data.final.ba },
    { id: 'finalPM', status: data.final.pm },
    { id: 'finalRisk', status: data.final.risk },
    { id: 'finalRelease', status: data.final.release },
  ];
  agentStatuses.forEach(({ id, status }) => {
    const el = document.getElementById(id);
    el.textContent = status.text;
    el.className = `final-agent-status ${status.cls}`;
  });
}

// --- HTML builders ---

function buildNumberedList(items) {
  return '<ol class="report-ordered-list">' + items.map(i => `<li>${i}</li>`).join('') + '</ol>';
}

function buildMilestoneTimeline(milestones) {
  return '<div class="milestone-timeline">' +
    milestones.map((m, i) => `
      <div class="milestone-item">
        <div class="milestone-marker">${i + 1}</div>
        <div class="milestone-content">
          <div class="milestone-phase">${m.phase}</div>
          <div class="milestone-desc">${m.desc}</div>
        </div>
      </div>
    `).join('') +
    '</div>';
}

function buildRiskTable(risks) {
  return `
    <table class="report-table">
      <thead>
        <tr><th>Risk</th><th>Severity</th><th>Likelihood</th><th>Impact</th></tr>
      </thead>
      <tbody>
        ${risks.map(r => `
          <tr>
            <td>${r.name}</td>
            <td><span class="severity-badge severity-${r.severity.toLowerCase()}">${r.severity}</span></td>
            <td>${r.likelihood}</td>
            <td>${r.impact}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>`;
}

function buildChecklist(items) {
  return '<div class="report-checklist">' +
    items.map(i => `
      <div class="checklist-item">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span>${i}</span>
      </div>
    `).join('') +
    '</div>';
}

// Export Report functionality via MCP backend
document.addEventListener('DOMContentLoaded', () => {
  const exportBtn1 = document.getElementById('btnExportReport');
  const exportBtn2 = document.getElementById('btnExportReportBottom');
  
  async function handleExport(e) {
    e.preventDefault();
    const btn = e.currentTarget;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="spinner"></span> Exporting...';
    btn.disabled = true;

    try {
      const baseUrl = (window.PMO_CONFIG && window.PMO_CONFIG.BACKEND_BASE_URL) || 'http://localhost:8000';
      
      // We pass the current data held in memory to the MCP export endpoint
      const response = await fetch(`${baseUrl}/export`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(window.currentReportData)
        });
      
      if (!response.ok) {
        throw new Error('Export failed');
      }
      
      const result = await response.json();
      alert(`Success! ${result.details}`);
    } catch (err) {
      console.error(err);
      alert('Failed to export report via MCP server.');
    } finally {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  }

  if (exportBtn1) exportBtn1.addEventListener('click', handleExport);
  if (exportBtn2) exportBtn2.addEventListener('click', handleExport);
});
