# PMO Copilot AI — Risk Management Agent
# Identifies, assesses, and provides mitigation strategies for project risks.
# Powered by Google ADK (Mock Integration)

from typing import Any, Dict
from app.adk import Agent


class RiskManagerAgent(Agent):
    """
    Risk Manager Agent using ADK.
    Evaluates project risks across technical, operational, and compliance
    dimensions. Produces a risk register with severity ratings.
    """

    def __init__(self):
        super().__init__(
            name="Risk Management Agent",
            role="Marcus Rivera — Risk & Compliance Lead",
            instructions=(
                "You are a Risk & Compliance Lead. Analyze the project details. "
                "Identify top risks, determine overall severity, construct a risk "
                "register, propose mitigation strategies, and define next steps. "
                "Output strictly matching the RiskResponse JSON schema."
            )
        )

    async def _mock_llm_response(self, industry: str) -> Dict[str, Any]:
        """Simulates the ADK returning structured JSON for the Risk section."""
        profiles = {
            "Technology": {
                "topRisks": [
                    "Third-party API dependency — vendor SLA may not cover peak load",
                    "Data migration complexity — legacy schema may require transformation layer",
                    "Security surface area — public API exposure requires WAF configuration",
                ],
                "severity": "Medium (2 high, 1 moderate on 5×5 matrix)",
                "overview": "Three risks have been identified, all within manageable thresholds. No blocking risks were detected. The overall risk exposure is low, with well-defined mitigation strategies for each identified threat. The risk register will be reviewed bi-weekly during sprint retrospectives.",
                "risks": [
                    {"name": "Third-party API dependency — vendor SLA may not cover peak load", "severity": "High", "likelihood": "Medium", "impact": "High"},
                    {"name": "Data migration complexity — legacy schema transformation layer", "severity": "High", "likelihood": "Low", "impact": "High"},
                    {"name": "Security surface area — public API exposure requires WAF", "severity": "Medium", "likelihood": "Medium", "impact": "Medium"},
                ],
                "mitigations": [
                    "Implement circuit-breaker pattern with configurable timeout and fallback responses for all external API calls",
                    "Build schema mapping layer with automated validation tests and rollback capability for the migration pipeline",
                    "Deploy WAF rules with OWASP Top 10 coverage and schedule penetration testing in Sprint 5",
                ],
                "nextStep": "Schedule risk review workshop with security architect before Sprint 1 kickoff",
            },
            "Healthcare": {
                "topRisks": [
                    "HIPAA compliance gap — PHI handling procedures require formal certification",
                    "EHR integration complexity — HL7 FHIR version compatibility across vendors",
                    "Clinical workflow disruption — staff resistance to digitized processes",
                    "Data breach liability — healthcare data commands premium on black market",
                ],
                "severity": "High (3 high, 1 critical on 5×5 matrix)",
                "overview": "Four risks identified with elevated severity due to regulatory and patient safety implications. HIPAA compliance is the highest priority risk requiring Sprint 0 remediation. No project can proceed to production without formal compliance certification.",
                "risks": [
                    {"name": "HIPAA compliance gap — PHI handling requires formal certification", "severity": "Critical", "likelihood": "High", "impact": "Critical"},
                    {"name": "EHR integration complexity — HL7 FHIR version compatibility", "severity": "High", "likelihood": "Medium", "impact": "High"},
                    {"name": "Clinical workflow disruption — staff adoption resistance", "severity": "High", "likelihood": "Medium", "impact": "High"},
                    {"name": "Data breach liability — healthcare data breach penalties", "severity": "High", "likelihood": "Low", "impact": "Critical"},
                ],
                "mitigations": [
                    "Engage certified HIPAA auditor for Sprint 0 gap analysis with formal remediation plan",
                    "Implement FHIR version negotiation layer with fallback to HL7 v2 for legacy EHR systems",
                    "Develop clinical champion program with early adopters for workflow validation and training",
                    "Deploy defense-in-depth strategy with encryption, access controls, and anomaly detection for PHI",
                ],
                "nextStep": "Initiate HIPAA gap analysis and schedule compliance risk review with legal counsel",
            },
            "Finance": {
                "topRisks": [
                    "PCI DSS compliance — payment data handling requires Level 1 certification",
                    "Ledger accuracy — double-entry reconciliation edge cases in multi-currency transactions",
                    "Regulatory reporting — financial reporting deadlines are non-negotiable",
                    "Fraud detection — transaction monitoring latency could expose vulnerabilities",
                ],
                "severity": "High (2 critical, 2 high on 5×5 matrix)",
                "overview": "Four risks identified with elevated severity due to financial regulatory requirements. PCI DSS compliance and ledger accuracy are the highest priority risks. Regulatory reporting deadlines are non-negotiable and must be built into the sprint schedule.",
                "risks": [
                    {"name": "PCI DSS compliance — Level 1 certification required", "severity": "Critical", "likelihood": "Medium", "impact": "Critical"},
                    {"name": "Ledger accuracy — multi-currency reconciliation edge cases", "severity": "Critical", "likelihood": "Medium", "impact": "Critical"},
                    {"name": "Regulatory reporting — non-negotiable filing deadlines", "severity": "High", "likelihood": "Low", "impact": "High"},
                    {"name": "Fraud detection — transaction monitoring latency", "severity": "High", "likelihood": "Medium", "impact": "High"},
                ],
                "mitigations": [
                    "Engage QSA (Qualified Security Assessor) for PCI DSS readiness assessment in Sprint 1",
                    "Implement comprehensive reconciliation test suite with edge-case coverage for currency conversion",
                    "Build automated regulatory report generation with configurable filing calendar and alerts",
                    "Deploy real-time transaction monitoring with ML-based anomaly detection and configurable alert thresholds",
                ],
                "nextStep": "Schedule PCI DSS readiness assessment and ledger schema review with finance compliance team",
            },
        }

        fallback = {
            "topRisks": [
                f"Domain-specific compliance requirements for {industry} may introduce delays",
                "Integration complexity with existing organizational systems",
                "Resource availability and team ramp-up time for specialized domain knowledge",
            ],
            "severity": "Medium (1 high, 2 moderate on 5×5 matrix)",
            "overview": f"Three risks identified for the {industry} project, all within manageable thresholds. Standard mitigation strategies apply with domain-specific adjustments recommended.",
            "risks": [
                {"name": f"{industry} compliance requirements may introduce delays", "severity": "High", "likelihood": "Medium", "impact": "High"},
                {"name": "Integration complexity with existing systems", "severity": "Medium", "likelihood": "Medium", "impact": "Medium"},
                {"name": "Resource availability for specialized domain knowledge", "severity": "Medium", "likelihood": "Low", "impact": "Medium"},
            ],
            "mitigations": [
                f"Conduct {industry}-specific compliance review in Sprint 0 with domain experts",
                "Build integration abstraction layer with automated connectivity tests for existing systems",
                "Identify and onboard domain specialists early; establish knowledge transfer protocols",
            ],
            "nextStep": f"Schedule {industry} domain risk assessment workshop with relevant stakeholders",
        }

        return {"risk": profiles.get(industry, fallback)}
