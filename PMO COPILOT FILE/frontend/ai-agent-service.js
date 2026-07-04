// PMO Copilot AI — AI Agent Shared Service & Structured Placeholders
// This service provides a centralized store for dynamic AI agent responses.
// It checks localStorage for simulated/real AI outputs, fallback to structured placeholders.

(function() {
  const AIAgentService = {
    // Retrieves AI Agent response.
    // If dynamic responses are available in localStorage, it returns them.
    // Otherwise, it returns the structured placeholders populated with industry specific templates.
    getAgentResponse(industry, goal, description) {
      const stored = localStorage.getItem('pmo_copilot_ai_response');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          // Auto update names in case user inputted a new project description/name dynamically
          if (parsed && parsed.projectInfo) {
            parsed.projectInfo.name = description || parsed.projectInfo.name;
            parsed.projectInfo.industry = industry || parsed.projectInfo.industry;
            parsed.projectInfo.goal = goal || parsed.projectInfo.goal;
          }
          return parsed;
        } catch (e) {
          console.error("Error parsing stored PMO Copilot AI responses", e);
        }
      }
      return this.getPlaceholderData(industry, goal, description);
    },

    // Saves the simulated or live AI Agent response to localStorage.
    setAgentResponse(data) {
      localStorage.setItem('pmo_copilot_ai_response', JSON.stringify(data));
    },

    // Clears stored AI responses.
    clearAgentResponse() {
      localStorage.removeItem('pmo_copilot_ai_response');
    },

    // Structured Placeholders for AI Agents (Business Analyst, Project Manager, Risk, Release)
    getPlaceholderData(industry, goal, description) {
      const timestamp = new Date().toISOString();
      
      const profiles = {
        Technology: {
          exec: {
            badgeIcon: '✓',
            badgeText: 'Proceed',
            badgeClass: 'rec-proceed',
            title: 'Strong Feasibility — Recommend Immediate Sprint Planning',
            desc: 'All agents confirm high technical feasibility. The architecture aligns with scalable cloud-native patterns, and the requirements are well-bounded for an MVP delivery within the proposed timeline.',
            summary: 'The project demonstrates strong technical feasibility with well-defined requirements, a realistic delivery timeline, and manageable risk exposure. All four AI agents independently confirm readiness for sprint planning. The architecture aligns with cloud-native best practices, and the team composition supports the proposed velocity. We recommend immediate progression to Sprint 0 for technical foundation setup.',
            confidence: 94,
            riskLevel: 'Low',
            riskClass: 'risk-low'
          },
          ba: {
            summary: 'The project scope is clearly defined with strong alignment between business objectives and technical deliverables. Core workflows map cleanly to a microservices architecture with RESTful API boundaries.',
            context: 'The project scope targets a cloud-native platform addressing a well-understood market need. Core business workflows have been mapped to a microservices architecture with clear API boundaries. The requirements demonstrate strong alignment between business objectives and technical deliverables, with measurable acceptance criteria for each user story.',
            requirements: [
              'User authentication and authorization via OAuth 2.0 with SSO integration for enterprise clients',
              'Real-time data synchronization using WebSocket connections with graceful degradation to polling',
              'Role-based access control (RBAC) supporting Admin, Manager, Analyst, and Viewer roles with granular permissions',
              'API rate limiting with configurable thresholds, monitoring dashboards, and automated alerting',
              'Comprehensive audit logging with immutable storage and GDPR-compliant data retention policies',
              'Multi-tenant architecture with data isolation guarantees and tenant-specific configuration'
            ],
            stakeholder: 'Primary stakeholders (Product Owner, Engineering Lead, Head of Security) are aligned on scope and priority. The steering committee has approved the budget allocation. No conflicting requirements detected between stakeholder groups. Change advisory board is on standby for Sprint 3+ scope adjustments.',
            nextStep: 'Finalize user story acceptance criteria with product owner and schedule Sprint 0 kickoff'
          },
          pm: {
            timeline: '14 weeks (3.5 months) structure across 7 two-week sprints, with an optional 2-week buffer for unforeseen integration complexity.',
            timelineShort: '14 weeks',
            milestones: [
              'Sprint 1–2: Core API scaffold & auth module',
              'Sprint 3–4: Primary feature modules & data layer',
              'Sprint 5: Integration testing & performance tuning',
              'Sprint 6: UAT and stakeholder review',
              'Sprint 7: Production hardening & launch'
            ],
            milestonesDetailed: [
              { phase: 'Sprint 1–2 (Weeks 1–4)', desc: 'Core API scaffold, authentication module, database schema, CI/CD pipeline setup' },
              { phase: 'Sprint 3–4 (Weeks 5–8)', desc: 'Primary feature modules, real-time data layer, RBAC implementation' },
              { phase: 'Sprint 5 (Weeks 9–10)', desc: 'Integration testing, performance benchmarking, third-party API connectivity' },
              { phase: 'Sprint 6 (Weeks 11–12)', desc: 'User acceptance testing, stakeholder review, accessibility audit' },
              { phase: 'Sprint 7 (Weeks 13–14)', desc: 'Production hardening, monitoring setup, staged rollout, launch' }
            ],
            resources: 'The project requires a cross-functional team of 6–8 engineers (2 backend, 2 frontend, 1 DevOps, 1 QA, 1 tech lead) with part-time UX support in Sprints 3–6. No external contractor dependencies. All team members are available for the full project duration with no competing sprint commitments.',
            nextStep: 'Begin sprint planning with engineering leads and finalize team allocation'
          },
          risk: {
            topRisks: [
              'Third-party API dependency — vendor SLA may not cover peak load',
              'Data migration complexity — legacy schema may require transformation layer',
              'Security surface area — public API exposure requires WAF configuration'
            ],
            severity: 'Medium (2 high, 1 moderate on 5×5 matrix)',
            overview: 'Three risks have been identified, all within manageable thresholds. No blocking risks were detected. The overall risk exposure is low, with well-defined mitigation strategies for each identified threat. The risk register will be reviewed bi-weekly during sprint retrospectives.',
            risks: [
              { name: 'Third-party API dependency — vendor SLA may not cover peak load', severity: 'High', likelihood: 'Medium', impact: 'High' },
              { name: 'Data migration complexity — legacy schema transformation layer', severity: 'High', likelihood: 'Low', impact: 'High' },
              { name: 'Security surface area — public API exposure requires WAF', severity: 'Medium', likelihood: 'Medium', impact: 'Medium' }
            ],
            mitigations: [
              'Implement circuit-breaker pattern with configurable timeout and fallback responses for all external API calls',
              'Build schema mapping layer with automated validation tests and rollback capability for the migration pipeline',
              'Deploy WAF rules with OWASP Top 10 coverage and schedule penetration testing in Sprint 5'
            ],
            nextStep: 'Schedule risk review workshop with security architect before Sprint 1 kickoff'
          },
          release: {
            readinessScore: 88,
            summary: 'Infrastructure is largely ready for deployment. CI/CD pipeline supports blue-green deployment with automated rollback. Container orchestration validated. Two checklist items require completion before production release.',
            deployRec: 'Blue-green deployment via containerized CI/CD pipeline. Feature flags are recommended for phased rollout to control blast radius. Initial deployment to 10% of traffic with automated canary analysis before full cutover.',
            checklist: [
              'Container images built, scanned for vulnerabilities, and signed',
              'Staging environment mirrors production configuration (validated)',
              'Rollback runbook documented, tested, and approved by SRE team',
              'Monitoring alerts configured for error-rate, latency, and saturation thresholds',
              'DNS cutover plan reviewed and approved by infrastructure team',
              'Post-deployment verification checklist prepared with smoke test suite'
            ],
            nextStep: 'Validate end-to-end staging deployment pipeline before Sprint 5'
          },
          kpis: {
            timeline: { value: 90, status: 'On Track', statusClass: 'green', color: '#10b981' },
            budget:   { value: 85, status: 'Within Threshold', statusClass: 'green', color: '#10b981' },
            risk:     { value: 28, status: 'Low Risk', statusClass: 'green', color: '#10b981' },
            req:      { value: 95, status: 'High Coverage', statusClass: 'green', color: '#10b981' },
            release:  { value: 88, status: 'Stable', statusClass: 'green', color: '#10b981' }
          },
          why: {
            ba: 'Validated 95% requirements coverage across all core functional areas. User story map is coherent with no orphaned acceptance criteria. Stakeholder sign-off dependencies are minimal.',
            pm: 'Timeline feasibility confirmed via critical-path analysis. No resource contention detected across sprint allocations. Buffer capacity of 1.5 sprints absorbed into the schedule.',
            risk: 'All high-severity risks have pre-approved contingency plans. Residual risk exposure is within organizational tolerance thresholds. No regulatory blockers identified.',
            release: 'CI/CD pipeline compatibility confirmed for target architecture. Container orchestration readiness validated. Rollback procedure tested successfully in dry-run.'
          },
          final: {
            verdict: '✓ Approved to Proceed',
            verdictClass: 'verdict-proceed',
            rationale: 'All four specialized agents independently confirm project readiness. Technical architecture is sound, timeline is achievable with built-in buffer, risk exposure is within organizational tolerance, and deployment infrastructure is ready. The project is approved for immediate sprint planning with no outstanding blockers.',
            ba: { text: 'Approved', cls: 'green' },
            pm: { text: 'Approved', cls: 'green' },
            risk: { text: 'Approved (with monitoring)', cls: 'green' },
            release: { text: 'Approved', cls: 'green' }
          }
        },

        Healthcare: {
          exec: {
            badgeIcon: '⚡',
            badgeText: 'Proceed with Caution',
            badgeClass: 'rec-caution',
            title: 'Feasible with Compliance Requirements — Regulatory Review Needed',
            desc: 'The project is technically feasible but requires additional compliance validation for HIPAA, HL7 FHIR interoperability, and protected health information (PHI) handling before proceeding to full development.',
            summary: 'The project is technically feasible but requires a dedicated compliance sprint (Sprint 0) before full development begins. HIPAA regulatory requirements, HL7 FHIR interoperability standards, and protected health information (PHI) handling protocols must be formally validated. The extended timeline accounts for mandatory compliance certification gates.',
            confidence: 78,
            riskLevel: 'Medium',
            riskClass: 'risk-medium'
          },
          ba: {
            summary: 'Clinical workflow requirements are well-structured. Integration points with existing EHR systems need formal specification. Patient data handling requires privacy-by-design architecture.',
            context: 'The healthcare platform addresses clinical workflow digitization with EHR integration. Patient data handling requires privacy-by-design architecture with consent management. Clinical staff user personas have been mapped, but edge cases around emergency override protocols need additional specification.',
            requirements: [
              'HIPAA-compliant data encryption at rest (AES-256) and in transit (TLS 1.3) for all PHI',
              'HL7 FHIR R4 API integration for EHR interoperability with bi-directional data exchange',
              'Role-based access with clinical-grade audit trails meeting 21 CFR Part 11 requirements',
              'Patient consent management with granular opt-in/opt-out and Right of Access data portability',
              'Multi-factor authentication for clinical staff with emergency break-glass override procedures',
              'Data residency compliance ensuring PHI remains within approved geographic boundaries'
            ],
            stakeholder: 'Clinical stakeholders, compliance officers, and IT security have been consulted. The Chief Medical Information Officer (CMIO) has conditionally approved the project pending HIPAA gap analysis results. Legal counsel review is scheduled for Week 2.',
            nextStep: 'Engage certified HIPAA auditor and schedule compliance gap analysis as Sprint 0'
          },
          pm: {
            timeline: '20 weeks (5 months) — includes compliance certification sprints',
            timelineShort: '20 weeks',
            milestones: [
              'Weeks 1–4: Compliance architecture & HIPAA readiness audit',
              'Weeks 5–10: Core clinical workflow modules',
              'Weeks 11–14: EHR integration and HL7 FHIR testing',
              'Weeks 15–18: Security audit, penetration testing, SOC 2 prep',
              'Weeks 19–20: Clinical UAT and regulatory sign-off'
            ],
            milestonesDetailed: [
              { phase: 'Weeks 1–4', desc: 'Compliance architecture design, HIPAA readiness audit, BAA execution with cloud provider' },
              { phase: 'Weeks 5–10', desc: 'Core clinical workflow modules, patient consent management, data encryption layer' },
              { phase: 'Weeks 11–14', desc: 'EHR integration via HL7 FHIR, bi-directional sync testing, interoperability validation' },
              { phase: 'Weeks 15–18', desc: 'Security audit, penetration testing, SOC 2 Type II preparation, accessibility compliance' },
              { phase: 'Weeks 19–20', desc: 'Clinical UAT with real-world simulation scenarios, regulatory sign-off, controlled go-live' }
            ],
            resources: 'Team of 8–10 including 2 backend engineers with healthcare domain experience, 1 HIPAA compliance specialist, 1 clinical workflow consultant (part-time), 2 frontend developers, 1 DevOps with healthcare hosting experience, 1 QA with regulatory testing background, and 1 project manager.',
            nextStep: 'Initiate compliance sprint with legal, security, and clinical advisory teams'
          },
          risk: {
            topRisks: [
              'HIPAA non-compliance — PHI exposure could result in regulatory penalties',
              'EHR integration delays — vendor API availability not guaranteed',
              'Clinical staff training gaps — low adoption risk post-deployment'
            ],
            severity: 'High (2 critical, 1 high on 5×5 matrix)',
            overview: 'Five risks identified with two rated as critical. The healthcare regulatory environment introduces compliance-driven risks that cannot be eliminated but can be mitigated through proactive audit engagement and process controls. Risk review cadence: weekly during compliance sprints, bi-weekly during development.',
            risks: [
              { name: 'HIPAA non-compliance — PHI exposure could trigger regulatory penalties up to $1.5M per incident', severity: 'Critical', likelihood: 'Low', impact: 'Critical' },
              { name: 'EHR integration delays — vendor API availability and sandbox access not guaranteed', severity: 'High', likelihood: 'Medium', impact: 'High' },
              { name: 'Clinical staff adoption — low training investment may reduce post-deployment utilization', severity: 'Medium', likelihood: 'Medium', impact: 'Medium' },
              { name: 'Data residency violations — multi-cloud deployment could inadvertently route PHI outside approved regions', severity: 'High', likelihood: 'Low', impact: 'High' },
              { name: 'Consent management complexity — granular patient opt-out may impact data completeness for analytics', severity: 'Medium', likelihood: 'Medium', impact: 'Medium' }
            ],
            mitigations: [
              'Engage certified HIPAA auditor before development begins; execute BAA agreements with all cloud service providers',
              'Establish sandbox EHR environment for parallel integration testing; negotiate vendor SLA for API uptime during testing windows',
              'Build comprehensive clinical training program with simulation-based scenarios and in-app guided workflows',
              'Implement geographic routing controls with automated compliance checks on all data egress points',
              'Design consent management with fallback data aggregation to maintain analytics utility while respecting patient choices'
            ],
            nextStep: 'Prioritize HIPAA readiness assessment and vendor BAA execution as immediate Sprint 0 deliverables'
          },
          release: {
            readinessScore: 72,
            summary: 'Release readiness is conditional on compliance certification completion. Infrastructure supports healthcare-grade hosting but requires additional configuration for PHI handling. Two critical pre-launch gates remain: HIPAA audit sign-off and clinical UAT approval.',
            deployRec: 'Phased deployment starting with a sandbox clinical environment for validation. Production release is gated behind HIPAA compliance certification and clinical advisory board approval.',
            checklist: [
              'HIPAA Business Associate Agreements (BAA) executed with cloud provider',
              'PHI encryption verified across all storage and transit layers',
              'Audit trail system validated against 21 CFR Part 11 requirements',
              'Disaster recovery tested with 4-hour RTO and 1-hour RPO targets',
              'Clinical staff onboarding materials and training environment prepared',
              'Incident response playbook for PHI breach notification (72-hour window) documented'
            ],
            nextStep: 'Complete compliance pre-launch checklist before staging deployment'
          },
          kpis: {
            timeline: { value: 75, status: 'At Risk', statusClass: 'yellow', color: '#f59e0b' },
            budget:   { value: 80, status: 'Monitoring', statusClass: 'yellow', color: '#f59e0b' },
            risk:     { value: 55, status: 'Medium Risk', statusClass: 'yellow', color: '#f59e0b' },
            req:      { value: 82, status: 'Good Coverage', statusClass: 'green', color: '#10b981' },
            release:  { value: 72, status: 'Needs Work', statusClass: 'yellow', color: '#f59e0b' }
          },
          why: {
            ba: 'Requirements coverage is strong at 82%, but clinical workflow edge cases (emergency overrides, consent revocation) require additional specification before sprint commitment.',
            pm: 'Timeline includes mandatory compliance sprints that extend delivery by 6 weeks vs. a non-regulated project. Critical path runs through the HIPAA audit gate.',
            risk: 'Two critical risks (HIPAA and EHR integration) require proactive mitigation before development starts. Residual risk remains above standard tolerance without Sprint 0.',
            release: 'Deployment requires compliance certification gate. CI/CD pipeline needs additional controls for PHI data handling in build artifacts.'
          },
          final: {
            verdict: '⚡ Proceed with Caution',
            verdictClass: 'verdict-caution',
            rationale: 'The project is technically sound and clinically relevant, but regulatory compliance requirements mandate a structured Sprint 0 before development begins. Two critical risk items require proactive mitigation. The project is conditionally approved pending HIPAA gap analysis completion and BAA execution.',
            ba: { text: 'Approved', cls: 'green' },
            pm: { text: 'Approved (extended)', cls: 'yellow' },
            risk: { text: 'Conditional', cls: 'yellow' },
            release: { text: 'Conditional', cls: 'yellow' }
          }
        },

        Finance: {
          exec: {
            badgeIcon: '⚡',
            badgeText: 'Proceed with Caution',
            badgeClass: 'rec-caution',
            title: 'Strong Architecture — Pending Security & Audit Validation',
            desc: 'Financial services requirements demand rigorous transaction integrity, encryption standards, and audit compliance. Architecture is sound but requires SOC 2 Type II readiness review.',
            summary: 'The financial platform architecture is well-designed with strong transactional integrity patterns. However, PCI DSS compliance certification and SOC 2 Type II audit preparation are required before production deployment. The ledger system design supports double-entry accounting with real-time reconciliation, but multi-currency edge cases need further specification.',
            confidence: 82,
            riskLevel: 'Medium',
            riskClass: 'risk-medium'
          },
          ba: {
            summary: 'Core transactional workflows are well-defined. Ledger accuracy and double-entry accounting principles are embedded in the data model. Multi-currency support requires additional specification.',
            context: 'Core transactional workflows are well-defined with double-entry accounting principles embedded in the data model. The platform addresses a clear market need for modern financial transaction processing. Multi-currency support with real-time FX rates requires additional specification for edge cases around settlement timing and rate locking.',
            requirements: [
              'End-to-end TLS 1.3 encryption for all financial transactions with certificate pinning',
              'Double-entry ledger system with real-time reconciliation and automated balance verification',
              'PCI DSS Level 1 compliance for payment card data handling with tokenization',
              'Immutable transaction audit logs with cryptographic tamper detection and regulatory retention',
              'Multi-currency support with real-time FX rate integration and configurable rate-lock windows',
              'Anti-money laundering (AML) screening integration with automated suspicious activity reporting'
            ],
            stakeholder: 'Finance leadership, compliance officers, and external auditors are aligned on scope. The CFO has approved budget allocation with a contingency reserve for audit costs. Risk committee review is scheduled quarterly.',
            nextStep: 'Validate ledger schema with finance team and engage external SOC 2 auditor'
          },
          pm: {
            timeline: '18 weeks (4.5 months) — includes audit and compliance sprints',
            timelineShort: '18 weeks',
            milestones: [
              'Weeks 1–3: Security architecture review and threat modelling',
              'Weeks 4–8: Core transaction engine and ledger module',
              'Weeks 9–12: Payment gateway integrations and PCI compliance',
              'Weeks 13–16: SOC 2 audit preparation and penetration testing',
              'Weeks 17–18: Financial reconciliation UAT and go-live'
            ],
            milestonesDetailed: [
              { phase: 'Weeks 1–3', desc: 'Security architecture review, threat modelling, encryption key management setup' },
              { phase: 'Weeks 4–8', desc: 'Core transaction engine, double-entry ledger module, reconciliation system' },
              { phase: 'Weeks 9–12', desc: 'Payment gateway integrations, PCI DSS compliance implementation, tokenization' },
              { phase: 'Weeks 13–16', desc: 'SOC 2 audit preparation, penetration testing, regulatory documentation' },
              { phase: 'Weeks 17–18', desc: 'Financial reconciliation UAT, shadow-testing with production traffic, go-live' }
            ],
            resources: 'Team of 8–10 including 2 backend engineers with fintech experience, 1 security engineer, 1 compliance specialist (PCI QSA preferred), 2 frontend developers, 1 DevOps, 1 QA with financial testing experience, and 1 project manager.',
            nextStep: 'Engage external auditor for SOC 2 readiness assessment and schedule threat modelling workshop'
          },
          risk: {
            topRisks: [
              'Transaction integrity failure — incorrect ledger entries could cause financial loss',
              'PCI DSS non-compliance — card data breach would trigger regulatory action',
              'FX rate API latency — stale exchange rates in high-frequency transactions'
            ],
            severity: 'High (1 critical, 2 high on 5×5 matrix)',
            overview: 'Four risks identified with one rated as critical. Financial transaction integrity is the primary risk vector. The regulatory environment is well-understood but requires formal certification. Mitigation strategies are actionable and have been validated against industry frameworks.',
            risks: [
              { name: 'Transaction integrity failure — incorrect ledger entries could cause financial loss', severity: 'Critical', likelihood: 'Low', impact: 'Critical' },
              { name: 'PCI DSS non-compliance — card data breach would trigger regulatory action and fines', severity: 'High', likelihood: 'Low', impact: 'Critical' },
              { name: 'FX rate API latency — stale exchange rates in high-frequency transactions', severity: 'High', likelihood: 'Medium', impact: 'High' },
              { name: 'Reconciliation drift — async processing may cause temporary balance discrepancies', severity: 'Medium', likelihood: 'Medium', impact: 'Medium' }
            ],
            mitigations: [
              'Implement saga pattern with compensating transactions for automatic rollback of failed operations',
              'Isolate cardholder data in PCI-scoped microservice with tokenization and network segmentation',
              'Cache FX rates with configurable staleness threshold (default 30s) and automatic fallback to secondary provider',
              'Deploy real-time reconciliation monitoring with automated alerts for balance drift exceeding configurable thresholds'
            ],
            nextStep: 'Initiate threat modelling workshop with security team and schedule PCI QSA pre-assessment'
          },
          release: {
            readinessScore: 76,
            summary: 'Deployment infrastructure supports financial-grade hosting requirements. CI/CD pipeline requires additional controls for audit trail integrity in build artifacts. Two compliance gates (PCI DSS, SOC 2) must be cleared before production release.',
            deployRec: 'Canary deployment with financial transaction shadow-testing against production-equivalent data. Production release gated behind SOC 2 audit completion and PCI DSS certification.',
            checklist: [
              'PCI DSS self-assessment questionnaire completed and validated by QSA',
              'Transaction reconciliation tests passing at 99.99% accuracy threshold',
              'Encryption key management procedures documented and access-controlled',
              'Incident response playbook for financial data breaches reviewed by legal',
              'Regulatory notification procedures for PCI and financial regulators established',
              'Shadow-testing with production-equivalent transaction volumes completed'
            ],
            nextStep: 'Complete PCI DSS pre-assessment and validate shadow-testing infrastructure'
          },
          kpis: {
            timeline: { value: 80, status: 'Manageable', statusClass: 'green', color: '#10b981' },
            budget:   { value: 78, status: 'Monitoring', statusClass: 'yellow', color: '#f59e0b' },
            risk:     { value: 48, status: 'Medium Risk', statusClass: 'yellow', color: '#f59e0b' },
            req:      { value: 88, status: 'Strong', statusClass: 'green', color: '#10b981' },
            release:  { value: 76, status: 'Needs Review', statusClass: 'yellow', color: '#f59e0b' }
          },
          why: {
            ba: 'Requirements are 88% complete with strong coverage of core transaction flows. Multi-currency edge cases require additional acceptance criteria before sprint commitment.',
            pm: 'Timeline is achievable but has limited buffer due to mandatory compliance gates. External audit scheduling is on the critical path.',
            risk: 'Financial transaction integrity is the primary risk vector. Saga pattern implementation mitigates this effectively, but requires dedicated sprint allocation.',
            release: 'Deployment requires SOC 2 audit gate and PCI DSS validation. Shadow-testing period recommended before full traffic cutover.'
          },
          final: {
            verdict: '⚡ Conditional Approval',
            verdictClass: 'verdict-caution',
            rationale: 'The project architecture is sound and the team composition supports delivery. However, financial regulatory requirements mandate compliance certification before production deployment. The project is conditionally approved with Sprint 0 allocated to threat modelling and PCI DSS pre-assessment.',
            ba: { text: 'Approved', cls: 'green' },
            pm: { text: 'Approved', cls: 'green' },
            risk: { text: 'Conditional', cls: 'yellow' },
            release: { text: 'Conditional', cls: 'yellow' }
          }
        }
      };

      // Fallback for other/unspecified industries
      const fallback = {
        exec: {
          badgeIcon: '✓',
          badgeText: 'Proceed',
          badgeClass: 'rec-proceed',
          title: 'Project Analysis Complete — Ready for Planning',
          desc: `The ${industry} project has been analyzed across all agent domains. Requirements are well-structured, timeline is achievable, and risks are within acceptable thresholds for a ${goal.toLowerCase()} initiative.`,
          summary: `The ${industry} project has been analyzed across all agent domains. Requirements are well-structured, timeline is achievable, and risks are within acceptable thresholds for a ${goal.toLowerCase()} initiative. All agents confirm readiness for planning phase initiation.`,
          confidence: 87,
          riskLevel: 'Low',
          riskClass: 'risk-low'
        },
        ba: {
          summary: `The ${industry} project scope has been validated against standard delivery frameworks. Core functional areas are well-defined with clear boundaries and stakeholder alignment.`,
          context: `The ${industry} project scope has been validated against standard delivery frameworks. Core functional areas are well-defined with clear boundaries and stakeholder alignment. The requirements capture both functional and non-functional aspects of the deliverable.`,
          requirements: [
            'Secure user authentication and authorization framework with role-based access',
            'Data integrity and validation across all input channels with automated quality checks',
            'Comprehensive reporting and analytics dashboards with real-time data refresh',
            'Integration with existing organizational systems via standard APIs',
            'Compliance with relevant industry regulations and data protection requirements',
            'Scalable architecture supporting projected growth over the next 24 months'
          ],
          stakeholder: 'Key stakeholders are aligned on project scope and timeline. Governance structure is established with clear escalation paths. No conflicting priorities detected.',
          nextStep: 'Conduct stakeholder review of requirements document and sign off on Sprint 1 scope'
        },
        pm: {
          timeline: '16 weeks (4 months) — 8 two-week sprints',
          timelineShort: '16 weeks',
          milestones: [
            'Sprint 1-2: Foundation architecture and core modules',
            'Sprint 3-4: Primary feature development',
            'Sprint 5-6: Integration, testing, and optimization',
            'Sprint 7: User acceptance testing',
            'Sprint 8: Production deployment and launch'
          ],
          milestonesDetailed: [
            { phase: 'Sprints 1–2 (Weeks 1–4)', desc: 'Foundation architecture, core module setup, development environment configuration' },
            { phase: 'Sprints 3–4 (Weeks 5–8)', desc: 'Primary feature development, data layer implementation, initial integrations' },
            { phase: 'Sprints 5–6 (Weeks 9–12)', desc: 'Integration testing, performance optimization, third-party connectivity' },
            { phase: 'Sprint 7 (Weeks 13–14)', desc: 'User acceptance testing, stakeholder review, documentation' },
            { phase: 'Sprint 8 (Weeks 15–16)', desc: 'Production deployment, monitoring setup, launch support' }
          ],
          resources: 'Standard cross-functional team of 5–7 members with domain expertise. No external dependencies or competing resource commitments identified.',
          nextStep: 'Kickoff sprint planning with project stakeholders and confirm team allocation'
        },
        risk: {
          topRisks: [
            'Scope creep — undefined requirements could expand delivery timeline',
            'Resource availability — key personnel may have competing priorities',
            'Integration complexity — third-party system compatibility not guaranteed'
          ],
          severity: 'Moderate (1 high, 2 moderate on 5×5 matrix)',
          overview: 'Three moderate risks identified, all within standard tolerance thresholds. No blocking risks detected. Risk review cadence recommended at bi-weekly intervals during sprint retrospectives.',
          risks: [
            { name: 'Scope creep — undefined requirements could expand delivery timeline', severity: 'High', likelihood: 'Medium', impact: 'High' },
            { name: 'Resource availability — key personnel may have competing priorities', severity: 'Medium', likelihood: 'Medium', impact: 'Medium' },
            { name: 'Integration complexity — third-party system compatibility not guaranteed', severity: 'Medium', likelihood: 'Low', impact: 'Medium' }
          ],
          mitigations: [
            'Implement strict change control process with impact assessment and steering committee approval',
            'Secure dedicated team allocation with management sign-off and backup personnel identified',
            'Build integration prototype early (Sprint 2) to validate compatibility and identify gaps'
          ],
          nextStep: 'Establish risk review cadence with project sponsors and schedule first review'
        },
        release: {
          readinessScore: 84,
          summary: 'Standard deployment infrastructure supports the proposed architecture. CI/CD pipeline is compatible. No infrastructure gaps identified.',
          deployRec: 'Standard phased deployment with staging validation. Feature flags recommended for controlled rollout. Automated canary analysis before full traffic cutover.',
          checklist: [
            'Build artifacts versioned, tested, and stored in artifact registry',
            'Staging environment validated against production configuration',
            'Rollback procedures documented, tested, and approved',
            'Monitoring and alerting configured for key operational metrics',
            'Post-deployment verification checklist prepared with smoke test suite',
            'Team on-call rotation established for launch support period'
          ],
          nextStep: 'Validate deployment pipeline in staging environment before Sprint 7'
        },
        kpis: {
          timeline: { value: 85, status: 'On Track', statusClass: 'green', color: '#10b981' },
          budget:   { value: 82, status: 'Healthy', statusClass: 'green', color: '#10b981' },
          risk:     { value: 35, status: 'Low Risk', statusClass: 'green', color: '#10b981' },
          req:      { value: 90, status: 'Strong', statusClass: 'green', color: '#10b981' },
          release:  { value: 84, status: 'Stable', statusClass: 'green', color: '#10b981' }
        },
        why: {
          ba: `Requirements validation confirmed strong coverage for the ${industry} domain. All core functional areas mapped to deliverable modules with clear acceptance criteria.`,
          pm: 'Timeline analysis confirmed feasibility with standard sprint cadence. No critical-path conflicts detected and buffer capacity is adequate.',
          risk: 'Risk assessment identified manageable threats with actionable mitigations. No blocking risks detected at the current project phase.',
          release: 'Deployment readiness checks passed for the target environment. Standard CI/CD pipeline is compatible with the proposed architecture.'
        },
        final: {
          verdict: '✓ Approved to Proceed',
          verdictClass: 'verdict-proceed',
          rationale: `All agents confirm readiness for the ${industry} project. Requirements are complete, timeline is achievable, risks are manageable, and deployment infrastructure is ready. The project is approved for sprint planning.`,
          ba: { text: 'Approved', cls: 'green' },
          pm: { text: 'Approved', cls: 'green' },
          risk: { text: 'Approved', cls: 'green' },
          release: { text: 'Approved', cls: 'green' }
        }
      };

      const selectedProfile = profiles[industry] || fallback;

      // Construct a unified structured response object matching our schema
      return {
        projectInfo: {
          name: description,
          industry: industry,
          goal: goal,
          timestamp: timestamp
        },
        exec: selectedProfile.exec,
        ba: selectedProfile.ba,
        pm: selectedProfile.pm,
        risk: selectedProfile.risk,
        release: selectedProfile.release,
        kpis: selectedProfile.kpis,
        why: selectedProfile.why,
        final: selectedProfile.final
      };
    }
  };

  // Expose to window scope
  window.AIAgentService = AIAgentService;
})();
