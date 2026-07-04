// PMO Copilot AI Collaboration Simulation Logic

document.addEventListener('DOMContentLoaded', () => {
  // --- Parse URL Parameters ---
  const urlParams = new URLSearchParams(window.location.search);
  const projectConcept = urlParams.get('desc') || 'E-Commerce Mobile Application';
  const projectIndustry = urlParams.get('ind') || 'Technology';
  const projectGoal = urlParams.get('goal') || 'Build a New Product';

  // --- Element Selectors ---
  const progressBarFill = document.getElementById('progressBarFill');
  const progressPercent = document.getElementById('progressPercent');
  const activityLogs = document.getElementById('activityLogs');
  const feedActiveAgent = document.getElementById('feedActiveAgent');

  const cards = {
    ba: {
      el: document.getElementById('card-ba'),
      status: document.getElementById('status-ba'),
      badge: document.getElementById('badge-ba')
    },
    pm: {
      el: document.getElementById('card-pm'),
      status: document.getElementById('status-pm'),
      badge: document.getElementById('badge-pm')
    },
    risk: {
      el: document.getElementById('card-risk'),
      status: document.getElementById('status-risk'),
      badge: document.getElementById('badge-risk')
    },
    release: {
      el: document.getElementById('card-release'),
      status: document.getElementById('status-release'),
      badge: document.getElementById('badge-release')
    }
  };

  // --- Logger Utility ---
  function addActivityLog(agentName, message, type = 'normal') {
    if (!activityLogs) return;
    
    const logItem = document.createElement('div');
    logItem.className = `log-line ${type}`;
    
    const now = new Date();
    const timeStr = `[${now.toTimeString().split(' ')[0]}]`;
    
    if (type === 'system') {
      logItem.innerHTML = `<span class="log-time" style="color: #64748b;">${timeStr}</span> <span style="color: #ec4899; font-weight: bold;">[SYS]</span> ${message}`;
    } else {
      logItem.innerHTML = `<span class="log-time" style="color: #64748b;">${timeStr}</span> <span style="color: #8b5cf6; font-weight: bold;">[${agentName}]</span> ${message}`;
    }
    
    activityLogs.appendChild(logItem);
    activityLogs.scrollTop = activityLogs.scrollHeight;
  }

  // --- State Badge Template Helpers ---
  const workingBadge = `<span class="collab-badge badge-working"><span class="collab-spinner"></span>Working</span>`;
  const completeBadge = `<span class="collab-badge badge-complete"><span class="collab-check">✓</span>Complete</span>`;

  // --- State Orchestrator Timeline ---
  const totalDuration = 16000; // 16 seconds total (4s per agent)
  const stepInterval = 100; // update progress every 100ms
  let elapsedTime = 0;
  let progressVal = 0;
  
  // Track state checkpoints
  let activeAgent = 'ba';
  let logsTriggered = {
    ba_start: false,
    ba_mid: false,
    ba_end: false,
    pm_start: false,
    pm_mid: false,
    pm_end: false,
    risk_start: false,
    risk_mid: false,
    risk_end: false,
    release_start: false,
    release_mid: false,
    release_end: false,
    complete: false
  };

  // Initial welcome logs
  addActivityLog('System', `Initializing agent collaboration pipeline for: "${projectConcept.substring(0, 45)}..."`, 'system');
  addActivityLog('System', `Parameters loaded: Industry = ${projectIndustry} | Decision Goal = ${projectGoal}`, 'system');

  const intervalTimer = setInterval(() => {
    elapsedTime += stepInterval;
    progressVal = Math.min((elapsedTime / totalDuration) * 100, 100);
    
    // Update Progress UI
    if (progressBarFill) progressBarFill.style.width = `${progressVal}%`;
    if (progressPercent) progressPercent.style.text = `${Math.floor(progressVal)}%`;
    if (progressPercent) progressPercent.textContent = `${Math.floor(progressVal)}%`;

    // --- State Machine ---
    
    // 1. Business Analyst (0s - 4s)
    if (elapsedTime < 4000) {
      activeAgent = 'ba';
      if (!logsTriggered.ba_start) {
        logsTriggered.ba_start = true;
        feedActiveAgent.textContent = 'Business Analyst';
        
        cards.ba.el.className = 'collab-card state-working';
        cards.ba.badge.innerHTML = workingBadge;
        cards.ba.status.textContent = 'Generating functional requirements...';
        
        addActivityLog('Business Analyst', 'Alex Chen active. Parsing project summary for requirements extraction.', 'normal');
        addActivityLog('Business Analyst', `Target industry context: ${projectIndustry}.`, 'normal');
      }
      
      if (elapsedTime >= 2000 && !logsTriggered.ba_mid) {
        logsTriggered.ba_mid = true;
        cards.ba.status.textContent = 'Compiling requirements.md user stories...';
        addActivityLog('Business Analyst', 'Identified 12 core user stories and acceptance criteria.', 'normal');
      }
    } 
    // 2. Project Manager (4s - 8s)
    else if (elapsedTime >= 4000 && elapsedTime < 8000) {
      activeAgent = 'pm';
      
      // Close BA
      if (!logsTriggered.ba_end) {
        logsTriggered.ba_end = true;
        cards.ba.el.className = 'collab-card state-complete';
        cards.ba.badge.innerHTML = completeBadge;
        cards.ba.status.textContent = 'Requirements compiled.';
        addActivityLog('Business Analyst', 'Requirements specification completed. Handoff to Project Manager.', 'normal');
      }

      // Start PM
      if (!logsTriggered.pm_start) {
        logsTriggered.pm_start = true;
        feedActiveAgent.textContent = 'Project Manager';
        
        cards.pm.el.className = 'collab-card state-working';
        cards.pm.badge.innerHTML = workingBadge;
        cards.pm.status.textContent = 'Mapping milestones & timelines...';
        
        addActivityLog('Project Manager', 'Sarah Mitchell active. Reading requirements.md to compile roadmap.', 'normal');
        addActivityLog('Project Manager', `Orchestrating milestones for goal: ${projectGoal}.`, 'normal');
      }

      if (elapsedTime >= 6000 && !logsTriggered.pm_mid) {
        logsTriggered.pm_mid = true;
        cards.pm.status.textContent = 'Structuring sprints & resource schedules...';
        addActivityLog('Project Manager', 'Created Phase 1 and Phase 2 timeline layout drafts.', 'normal');
      }
    }
    // 3. Risk Manager (8s - 12s)
    else if (elapsedTime >= 8000 && elapsedTime < 12000) {
      activeAgent = 'risk';

      // Close PM
      if (!logsTriggered.pm_end) {
        logsTriggered.pm_end = true;
        cards.pm.el.className = 'collab-card state-complete';
        cards.pm.badge.innerHTML = completeBadge;
        cards.pm.status.textContent = 'Project roadmap mapped.';
        addActivityLog('Project Manager', 'Roadmap documentation successfully structured. Handoff to Risk Manager.', 'normal');
      }

      // Start Risk
      if (!logsTriggered.risk_start) {
        logsTriggered.risk_start = true;
        feedActiveAgent.textContent = 'Risk Manager';
        
        cards.risk.el.className = 'collab-card state-working';
        cards.risk.badge.innerHTML = workingBadge;
        cards.risk.status.textContent = 'Identifying risk vectors...';
        
        addActivityLog('Risk Manager', 'Dr. James Okafor active. Starting safety and compliance audits.', 'normal');
      }

      if (elapsedTime >= 10000 && !logsTriggered.risk_mid) {
        logsTriggered.risk_mid = true;
        cards.risk.status.textContent = 'Generating 5x5 threat matrix...';
        addActivityLog('Risk Manager', 'Mapped 5 critical risk indicators with mitigating contingencies.', 'normal');
      }
    }
    // 4. Release Manager (12s - 16s)
    else if (elapsedTime >= 12000 && elapsedTime < 16000) {
      activeAgent = 'release';

      // Close Risk
      if (!logsTriggered.risk_end) {
        logsTriggered.risk_end = true;
        cards.risk.el.className = 'collab-card state-complete';
        cards.risk.badge.innerHTML = completeBadge;
        cards.risk.status.textContent = 'Risk register compiled.';
        addActivityLog('Risk Manager', 'Threat analysis and registers drafted. Handoff to Release Manager.', 'normal');
      }

      // Start Release
      if (!logsTriggered.release_start) {
        logsTriggered.release_start = true;
        feedActiveAgent.textContent = 'Release Manager';
        
        cards.release.el.className = 'collab-card state-working';
        cards.release.badge.innerHTML = workingBadge;
        cards.release.status.textContent = 'Verifying deployment readiness gates...';
        
        addActivityLog('Release Manager', 'Priya Sharma active. Creating release rollout checklist.', 'normal');
      }

      if (elapsedTime >= 14000 && !logsTriggered.release_mid) {
        logsTriggered.release_mid = true;
        cards.release.status.textContent = 'Structuring CI/CD pipeline guides...';
        addActivityLog('Release Manager', 'Compiled environment rollback checklist and staging gates.', 'normal');
      }
    }
    // 5. Completion State (16s+)
    else if (elapsedTime >= 16000) {
      // Close Release
      if (!logsTriggered.release_end) {
        logsTriggered.release_end = true;
        cards.release.el.className = 'collab-card state-complete';
        cards.release.badge.innerHTML = completeBadge;
        cards.release.status.textContent = 'Readiness gates verified.';
        addActivityLog('Release Manager', 'Release plan generated.', 'normal');
      }

      // Show final system success compilation
      if (!logsTriggered.complete) {
        logsTriggered.complete = true;
        feedActiveAgent.textContent = 'System Success';
        
        addActivityLog('System', 'All agent artifacts compiled successfully [100% Confidence].', 'system');
        addActivityLog('System', 'Orchestration complete. Auto-navigating to Decision Dashboard...', 'system');
        
        // Stop timer
        clearInterval(intervalTimer);

        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.href = `dashboard.html?desc=${encodeURIComponent(projectConcept)}&ind=${encodeURIComponent(projectIndustry)}&goal=${encodeURIComponent(projectGoal)}`;
        }, 2000);
      }
    }
  }, stepInterval);
});
