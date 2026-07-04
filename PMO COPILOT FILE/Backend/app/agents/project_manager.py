# PMO Copilot AI — Project Manager Agent
# Generates project roadmap, timeline, milestones, and resource plans.
# Powered by Google ADK (Mock Integration)

from typing import Any, Dict
from app.adk import Agent


class ProjectManagerAgent(Agent):
    """
    Project Manager Agent using ADK.
    Produces sprint timelines, milestone breakdowns, resource estimates,
    and delivery recommendations.
    """

    def __init__(self):
        super().__init__(
            name="Project Manager Agent",
            role="Sarah Park — PMO Director",
            instructions=(
                "You are a PMO Director. Analyze the project details. "
                "Construct a timeline, define clear milestones, evaluate resource "
                "requirements, and provide the next steps. Output strictly matching "
                "the PMResponse JSON schema."
            )
        )

    async def _mock_llm_response(self, industry: str) -> Dict[str, Any]:
        """Simulates the ADK returning structured JSON for the PM section."""
        profiles = {
            "Technology": {
                "timeline": "14 weeks (3.5 months) structure across 7 two-week sprints, with an optional 2-week buffer for unforeseen integration complexity.",
                "timelineShort": "14 weeks",
                "milestones": [
                    "Sprint 1–2: Core API scaffold & auth module",
                    "Sprint 3–4: Primary feature modules & data layer",
                    "Sprint 5: Integration testing & performance tuning",
                    "Sprint 6: UAT and stakeholder review",
                    "Sprint 7: Production hardening & launch",
                ],
                "milestonesDetailed": [
                    {"phase": "Sprint 1–2 (Weeks 1–4)", "desc": "Core API scaffold, authentication module, database schema, CI/CD pipeline setup"},
                    {"phase": "Sprint 3–4 (Weeks 5–8)", "desc": "Primary feature modules, real-time data layer, RBAC implementation"},
                    {"phase": "Sprint 5 (Weeks 9–10)", "desc": "Integration testing, performance benchmarking, third-party API connectivity"},
                    {"phase": "Sprint 6 (Weeks 11–12)", "desc": "User acceptance testing, stakeholder review, accessibility audit"},
                    {"phase": "Sprint 7 (Weeks 13–14)", "desc": "Production hardening, monitoring setup, staged rollout, launch"},
                ],
                "resources": "The project requires a cross-functional team of 6–8 engineers (2 backend, 2 frontend, 1 DevOps, 1 QA, 1 tech lead) with part-time UX support in Sprints 3–6. No external contractor dependencies.",
                "nextStep": "Begin sprint planning with engineering leads and finalize team allocation",
            },
            "Healthcare": {
                "timeline": "20 weeks (5 months) structured across a compliance sprint plus 9 two-week development sprints, with regulatory review gates between phases.",
                "timelineShort": "20 weeks",
                "milestones": [
                    "Sprint 0: HIPAA gap analysis & compliance framework",
                    "Sprint 1–2: Core clinical data model & API layer",
                    "Sprint 3–4: EHR integration & HL7 FHIR endpoints",
                    "Sprint 5–6: PHI handling, consent management, audit system",
                    "Sprint 7: Security hardening & penetration testing",
                    "Sprint 8: Clinical UAT with healthcare staff",
                    "Sprint 9: Staged rollout with compliance certification",
                ],
                "milestonesDetailed": [
                    {"phase": "Sprint 0 (Weeks 1–2)", "desc": "HIPAA gap analysis, compliance framework setup, privacy impact assessment"},
                    {"phase": "Sprint 1–2 (Weeks 3–6)", "desc": "Core clinical data model, authentication, database with PHI encryption"},
                    {"phase": "Sprint 3–4 (Weeks 7–10)", "desc": "EHR integration via HL7 FHIR R4, bi-directional data exchange"},
                    {"phase": "Sprint 5–6 (Weeks 11–14)", "desc": "PHI handling workflows, consent management, audit trail system"},
                    {"phase": "Sprint 7 (Weeks 15–16)", "desc": "Security hardening, penetration testing, vulnerability remediation"},
                    {"phase": "Sprint 8 (Weeks 17–18)", "desc": "Clinical user acceptance testing with healthcare staff"},
                    {"phase": "Sprint 9 (Weeks 19–20)", "desc": "Staged rollout, compliance certification, post-launch monitoring"},
                ],
                "resources": "Team of 8–10: 2 backend, 2 frontend, 1 DevOps, 1 QA, 1 tech lead, 1 compliance specialist, 1 clinical advisor. HIPAA auditor on retainer.",
                "nextStep": "Engage HIPAA compliance specialist and schedule gap analysis for Sprint 0",
            },
            "Finance": {
                "timeline": "18 weeks (4.5 months) across 9 two-week sprints with a dedicated compliance gate in Sprint 7.",
                "timelineShort": "18 weeks",
                "milestones": [
                    "Sprint 1–2: Core ledger engine & transaction processing",
                    "Sprint 3–4: Payment integration & multi-currency support",
                    "Sprint 5–6: Compliance modules & reporting engine",
                    "Sprint 7: PCI DSS audit & security certification",
                    "Sprint 8: UAT with finance operations team",
                    "Sprint 9: Staged production deployment with transaction monitoring",
                ],
                "milestonesDetailed": [
                    {"phase": "Sprint 1–2 (Weeks 1–4)", "desc": "Core ledger engine, double-entry transaction processing, database schema"},
                    {"phase": "Sprint 3–4 (Weeks 5–8)", "desc": "Payment gateway integration, multi-currency support, FX rate feeds"},
                    {"phase": "Sprint 5–6 (Weeks 9–12)", "desc": "Compliance modules, AML screening, regulatory reporting engine"},
                    {"phase": "Sprint 7 (Weeks 13–14)", "desc": "PCI DSS Level 1 audit, security certification, penetration testing"},
                    {"phase": "Sprint 8 (Weeks 15–16)", "desc": "User acceptance testing with finance operations team"},
                    {"phase": "Sprint 9 (Weeks 17–18)", "desc": "Staged production deployment, transaction monitoring, post-launch support"},
                ],
                "resources": "Team of 7–9: 2 backend, 2 frontend, 1 DevOps, 1 QA, 1 tech lead, 1 financial compliance analyst. SOC 2 auditor scheduled for Sprint 7.",
                "nextStep": "Finalize ledger schema review and schedule Sprint 1 planning with engineering leads",
            },
        }

        fallback = {
            "timeline": f"16 weeks (4 months) across 8 two-week sprints with built-in buffer for the {industry} domain requirements.",
            "timelineShort": "16 weeks",
            "milestones": [
                "Sprint 1–2: Foundation architecture & core modules",
                "Sprint 3–4: Primary feature development & integrations",
                "Sprint 5–6: Testing, compliance, and quality assurance",
                "Sprint 7: Stakeholder UAT and review",
                "Sprint 8: Production deployment & launch",
            ],
            "milestonesDetailed": [
                {"phase": "Sprint 1–2 (Weeks 1–4)", "desc": "Foundation architecture, core modules, database setup, CI/CD pipeline"},
                {"phase": "Sprint 3–4 (Weeks 5–8)", "desc": "Primary feature modules, external integrations, data layer"},
                {"phase": "Sprint 5–6 (Weeks 9–12)", "desc": "Testing, compliance review, quality assurance, performance tuning"},
                {"phase": "Sprint 7 (Weeks 13–14)", "desc": "Stakeholder user acceptance testing and review"},
                {"phase": "Sprint 8 (Weeks 15–16)", "desc": "Production deployment, monitoring setup, staged rollout, launch"},
            ],
            "resources": f"Cross-functional team of 6–8 members appropriate for {industry} domain requirements.",
            "nextStep": "Schedule Sprint 1 planning session with project stakeholders",
        }

        return {"pm": profiles.get(industry, fallback)}
