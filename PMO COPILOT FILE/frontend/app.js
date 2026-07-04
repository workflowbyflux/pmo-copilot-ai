// PMO Copilot AI Landing Page JS Interactions

document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Hamburger Menu ---
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // --- Sticky Header Scroll Effect ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- Demo Modal Dialog ---
  const btnWatchDemo = document.getElementById('btnWatchDemo');
  const videoModal = document.getElementById('videoModal');
  const modalClose = document.getElementById('modalClose');
  const modalBackdrop = videoModal ? videoModal.querySelector('.modal-backdrop') : null;

  function openModal() {
    if (videoModal) {
      videoModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // prevent scroll
    }
  }

  function closeModal() {
    if (videoModal) {
      videoModal.classList.remove('active');
      document.body.style.overflow = ''; // restore scroll
    }
  }

  if (btnWatchDemo) btnWatchDemo.addEventListener('click', openModal);
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  // Esc key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
      closeModal();
    }
  });

  // --- Interactive Agent Collaboration Animation ---
  const agents = {
    ba: document.getElementById('agent-ba'),
    pm: document.getElementById('agent-pm'),
    risk: document.getElementById('agent-risk'),
    release: document.getElementById('agent-release'),
    compiler: document.getElementById('agent-compiler')
  };

  const reportNode = document.getElementById('reportNode');
  const terminalLogs = document.getElementById('terminalLogs');

  // Pulse dots (circles in index.html)
  const pulses = {
    'ba-pm': document.getElementById('pulse-ba-pm'),
    'pm-risk': document.getElementById('pulse-pm-risk'),
    'risk-release': document.getElementById('pulse-risk-release'),
    'release-compiler': document.getElementById('pulse-release-compiler')
  };

  // Custom pulse from compiler to center report
  let pulseCompilerReport = null;

  // Connection center points
  let coords = {};

  // Setup connection paths
  function drawConnections() {
    const container = document.querySelector('.workspace-body');
    if (!container) return;
    const containerRect = container.getBoundingClientRect();

    const getCenter = (el) => {
      if (!el) return { x: 0, y: 0 };
      const r = el.getBoundingClientRect();
      return {
        x: r.left - containerRect.left + r.width / 2,
        y: r.top - containerRect.top + r.height / 2
      };
    };

    coords = {
      ba: getCenter(agents.ba),
      pm: getCenter(agents.pm),
      risk: getCenter(agents.risk),
      release: getCenter(agents.release),
      compiler: getCenter(agents.compiler),
      report: getCenter(reportNode)
    };

    // Update SVG path coordinates
    setPath('path-ba-pm', coords.ba, coords.pm);
    setPath('path-pm-risk', coords.pm, coords.risk);
    setPath('path-risk-release', coords.risk, coords.release);
    setPath('path-release-compiler', coords.release, coords.compiler);

    // Dynamic line for compiler -> report
    let pathCompRep = document.getElementById('path-compiler-report');
    if (!pathCompRep) {
      const svg = document.getElementById('connectionsSvg');
      pathCompRep = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      pathCompRep.setAttribute('id', 'path-compiler-report');
      pathCompRep.setAttribute('class', 'connection-line');
      svg.insertBefore(pathCompRep, svg.firstChild);
    }
    setPath('path-compiler-report', coords.compiler, coords.report);

    // Create compiler -> report pulse dot
    if (!pulseCompilerReport) {
      const svg = document.getElementById('connectionsSvg');
      pulseCompilerReport = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      pulseCompilerReport.setAttribute('id', 'pulse-compiler-report');
      pulseCompilerReport.setAttribute('class', 'pulse-dot');
      pulseCompilerReport.setAttribute('r', '4');
      pulseCompilerReport.setAttribute('fill', '#ec4899');
      svg.appendChild(pulseCompilerReport);
    }

    // Positions for pulse dots
    hidePulses();
  }

  function setPath(id, p1, p2) {
    const el = document.getElementById(id);
    if (el) {
      el.setAttribute('d', `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`);
    }
  }

  function hidePulses() {
    Object.values(pulses).forEach(p => {
      if (p) {
        p.classList.remove('animating');
        p.setAttribute('cx', '-10');
        p.setAttribute('cy', '-10');
      }
    });
    if (pulseCompilerReport) {
      pulseCompilerReport.classList.remove('animating');
      pulseCompilerReport.setAttribute('cx', '-10');
      pulseCompilerReport.setAttribute('cy', '-10');
    }
  }

  // Draw initially and on resize
  window.addEventListener('resize', drawConnections);
  // Run drawConnections once UI lays out
  setTimeout(drawConnections, 300);

  // Terminal logging utility
  function addLog(text, type = 'normal') {
    if (!terminalLogs) return;
    const line = document.createElement('div');
    line.className = `log-line ${type}`;
    
    // Add timestamp or system prefix
    const now = new Date();
    const timeStr = `[${now.toTimeString().split(' ')[0]}]`;
    
    if (type === 'system') {
      line.innerHTML = `&gt; ${text}`;
    } else {
      line.innerHTML = `<span class="log-time">${timeStr}</span> ${text}`;
    }
    
    terminalLogs.appendChild(line);
    
    // Keep last 6 logs and scroll to bottom
    while (terminalLogs.children.length > 7) {
      terminalLogs.removeChild(terminalLogs.firstChild);
    }
    terminalLogs.scrollTop = terminalLogs.scrollHeight;
  }

  // Animation States
  let state = 0;
  let animTimer = null;
  let customProjectDesc = "";

  const script = [
    {
      // BA Action
      node: 'ba',
      log: 'Alex Chen (BA): Extracting requirements & user stories...',
      duration: 2500,
      onStart: () => {
        if (customProjectDesc) {
          const industrySelect = document.getElementById('projectIndustry');
          const goalSelect = document.getElementById('decisionGoal');
          const ind = industrySelect ? industrySelect.value : 'General';
          const goal = goalSelect ? goalSelect.value : 'Advice';
          addLog(`BA [${ind} | ${goal}]: Parsing: "${customProjectDesc.substring(0, 30)}..."`, 'active');
        }
      }
    },
    {
      // BA -> PM Transfer
      pulse: 'ba-pm',
      duration: 800,
      startPoint: 'ba',
      endPoint: 'pm'
    },
    {
      // PM Action
      node: 'pm',
      log: 'Sarah Mitchell (PM): Drafting milestones, deliverables, & roadmap...',
      duration: 2500
    },
    {
      // PM -> Risk Transfer
      pulse: 'pm-risk',
      duration: 800,
      startPoint: 'pm',
      endPoint: 'risk'
    },
    {
      // Risk Action
      node: 'risk',
      log: 'Dr. James Okafor (Risk): Building 5x5 matrix & mitigations...',
      duration: 2500
    },
    {
      // Risk -> Release Transfer
      pulse: 'risk-release',
      duration: 800,
      startPoint: 'risk',
      endPoint: 'release'
    },
    {
      // Release Action
      node: 'release',
      log: 'Priya Sharma (Release): Preparing deployment gates & rollout list...',
      duration: 2500
    },
    {
      // Release -> Compiler Transfer
      pulse: 'release-compiler',
      duration: 800,
      startPoint: 'release',
      endPoint: 'compiler'
    },
    {
      // Compiler Action
      node: 'compiler',
      log: 'Synthesis Engine: Compiling final executive summary...',
      duration: 2500
    },
    {
      // Compiler -> Report Transfer
      pulse: 'compiler-report',
      duration: 800,
      startPoint: 'compiler',
      endPoint: 'report'
    },
    {
      // Synthesis Glow Complete
      complete: true,
      log: 'SYSTEM: full_report.md compiled successfully! Saved to directory.',
      duration: 4000
    }
  ];

  function clearActiveNodes() {
    Object.values(agents).forEach(node => {
      if (node) node.classList.remove('active');
    });
    if (reportNode) reportNode.classList.remove('completed');
  }

  function animatePulse(pulseId, startPt, endPt, duration, callback) {
    const pulseEl = pulseId === 'compiler-report' ? pulseCompilerReport : pulses[pulseId];
    if (!pulseEl) {
      callback();
      return;
    }

    const start = coords[startPt];
    const end = coords[endPt];
    if (!start || !end) {
      callback();
      return;
    }

    pulseEl.classList.add('animating');
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Interpolate coordinates
      const currentX = start.x + (end.x - start.x) * progress;
      const currentY = start.y + (end.y - start.y) * progress;
      
      pulseEl.setAttribute('cx', currentX);
      pulseEl.setAttribute('cy', currentY);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        pulseEl.classList.remove('animating');
        callback();
      }
    }
    requestAnimationFrame(step);
  }

  function runPipeline() {
    clearActiveNodes();
    hidePulses();
    
    const stepConfig = script[state];

    // Node processing state
    if (stepConfig.node) {
      const activeNode = agents[stepConfig.node];
      if (activeNode) activeNode.classList.add('active');
      
      addLog(stepConfig.log, 'active');
      if (stepConfig.onStart) stepConfig.onStart();

      animTimer = setTimeout(() => {
        state = (state + 1) % script.length;
        runPipeline();
      }, stepConfig.duration);
    } 
    // Pulse animation state
    else if (stepConfig.pulse) {
      // Light up connection line
      const lineId = stepConfig.pulse === 'compiler-report' ? 'path-compiler-report' : `path-${stepConfig.pulse}`;
      const lineEl = document.getElementById(lineId);
      if (lineEl) lineEl.classList.add('active');

      animatePulse(stepConfig.pulse, stepConfig.startPoint, stepConfig.endPoint, stepConfig.duration, () => {
        if (lineEl) lineEl.classList.remove('active');
        state = (state + 1) % script.length;
        runPipeline();
      });
    } 
    // Complete compile state
    else if (stepConfig.complete) {
      if (reportNode) reportNode.classList.add('completed');
      addLog(stepConfig.log, 'success');
      
      // Flash all nodes green-ish
      Object.values(agents).forEach(n => {
        if (n) {
          n.style.filter = 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.4))';
        }
      });

      animTimer = setTimeout(() => {
        // Reset node filters
        Object.values(agents).forEach(n => {
          if (n) n.style.filter = '';
        });
        
        // Reset pipeline
        state = 0;
        customProjectDesc = ""; // Reset custom descriptions
        runPipeline();
      }, stepConfig.duration);
    }
  }

  // Start the visualizer
  runPipeline();

  // --- Step Indicator Tracking ---
  // Highlight how-it-works steps synchronously with agent pipeline stages
  function updateHowItWorksSteps() {
    const stepItems = document.querySelectorAll('.step-item');
    const progressLine = document.getElementById('stepsProgress');
    
    // Map state to a 4-step pipeline:
    // Step 1: Describe (State 0-1)
    // Step 2: Collaborate (State 2-8)
    // Step 3: Review (State 9)
    // Step 4: Export (State 10)
    let currentStep = 1;
    if (state >= 2 && state <= 8) {
      currentStep = 2;
    } else if (state === 9) {
      currentStep = 3;
    } else if (state === 10) {
      currentStep = 4;
    }

    stepItems.forEach((item, index) => {
      if (index + 1 === currentStep) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    if (progressLine) {
      const progressPercentages = [0, 33, 66, 100];
      progressLine.style.width = `${progressPercentages[currentStep - 1]}%`;
    }
  }

  // Update steps alignment every 500ms
  setInterval(updateHowItWorksSteps, 500);

  // --- Analysis Form Submission ---
  const analysisForm = document.getElementById('analysisForm');
  const projectDescription = document.getElementById('projectDescription');

  if (analysisForm) {
    analysisForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const descVal = projectDescription.value.trim();
      if (!descVal) {
        alert("Please enter a project description to initialize the AI agents.");
        return;
      }

      const industrySelect = document.getElementById('projectIndustry');
      const goalSelect = document.getElementById('decisionGoal');
      const industryVal = industrySelect ? industrySelect.value : 'Technology';
      const goalVal = goalSelect ? goalSelect.value : 'Build a New Product';

      // Build target navigation URL
      const targetUrl = `collaboration.html?desc=${encodeURIComponent(descVal)}&ind=${encodeURIComponent(industryVal)}&goal=${encodeURIComponent(goalVal)}`;

      // Briefly animate submission button before navigating
      const submitBtn = analysisForm.querySelector('button[type="submit"]');
      const origText = submitBtn.querySelector('.btn-text').textContent;
      
      submitBtn.querySelector('.btn-text').textContent = "Initializing Agents...";
      submitBtn.style.pointerEvents = 'none';
      submitBtn.style.opacity = '0.8';

      setTimeout(() => {
        window.location.href = targetUrl;
      }, 800);
    });
  }
});
