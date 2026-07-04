# PMO Copilot AI — Business Analyst Agent
# Analyzes project requirements, stakeholder alignment, and business context.
# Powered by Google ADK (Mock Integration)

from typing import Any, Dict
from app.adk import Agent


class BusinessAnalystAgent(Agent):
    """
    Business Analyst Agent using ADK.
    Evaluates project scope, identifies core requirements, assesses
    stakeholder alignment, and recommends next steps.
    """

    def __init__(self):
        super().__init__(
            name="Business Analyst Agent",
            role="Alex Chen — Senior Business Analyst",
            instructions=(
                "You are a Senior Business Analyst. Analyze the project summary, "
                "industry, and decision goal. Extract core requirements, evaluate "
                "stakeholder alignment, and provide a context summary. Output your "
                "analysis strictly matching the BAResponse JSON schema."
            ),
            # In a real ADK, we would pass the Pydantic model: response_schema=BAResponse
        )

    async def _mock_llm_response(self, industry: str) -> Dict[str, Any]:
        """Simulates the ADK returning the structured JSON for the BA section."""
        profiles = {
            "Technology": {
                "summary": "The project scope is clearly defined with strong alignment between business objectives and technical deliverables. Core workflows map cleanly to a microservices architecture with RESTful API boundaries.",
                "context": "The project scope targets a cloud-native platform addressing a well-understood market need. Core business workflows have been mapped to a microservices architecture with clear API boundaries. The requirements demonstrate strong alignment between business objectives and technical deliverables, with measurable acceptance criteria for each user story.",
                "requirements": [
                    "User authentication and authorization via OAuth 2.0 with SSO integration for enterprise clients",
                    "Real-time data synchronization using WebSocket connections with graceful degradation to polling",
                    "Role-based access control (RBAC) supporting Admin, Manager, Analyst, and Viewer roles with granular permissions",
                    "API rate limiting with configurable thresholds, monitoring dashboards, and automated alerting",
                    "Comprehensive audit logging with immutable storage and GDPR-compliant data retention policies",
                    "Multi-tenant architecture with data isolation guarantees and tenant-specific configuration",
                ],
                "stakeholder": "Primary stakeholders (Product Owner, Engineering Lead, Head of Security) are aligned on scope and priority. The steering committee has approved the budget allocation. No conflicting requirements detected between stakeholder groups.",
                "nextStep": "Finalize user story acceptance criteria with product owner and schedule Sprint 0 kickoff",
            },
            "Healthcare": {
                "summary": "Clinical workflow requirements are well-structured. Integration points with existing EHR systems need formal specification. Patient data handling requires privacy-by-design architecture.",
                "context": "The healthcare platform addresses clinical workflow digitization with EHR integration. Patient data handling requires privacy-by-design architecture with consent management. Clinical staff user personas have been mapped, but edge cases around emergency override protocols need additional specification.",
                "requirements": [
                    "HIPAA-compliant data encryption at rest (AES-256) and in transit (TLS 1.3) for all PHI",
                    "HL7 FHIR R4 API integration for EHR interoperability with bi-directional data exchange",
                    "Role-based access with clinical-grade audit trails meeting 21 CFR Part 11 requirements",
                    "Patient consent management with granular opt-in/opt-out and Right of Access data portability",
                    "Multi-factor authentication for clinical staff with emergency break-glass override procedures",
                    "Data residency compliance ensuring PHI remains within approved geographic boundaries",
                ],
                "stakeholder": "Clinical stakeholders, compliance officers, and IT security have been consulted. The CMIO has conditionally approved the project pending HIPAA gap analysis results.",
                "nextStep": "Engage certified HIPAA auditor and schedule compliance gap analysis as Sprint 0",
            },
            "Finance": {
                "summary": "Core transactional workflows are well-defined. Ledger accuracy and double-entry accounting principles are embedded in the data model. Multi-currency support requires additional specification.",
                "context": "Core transactional workflows are well-defined with double-entry accounting principles embedded in the data model. The platform addresses a clear market need for modern financial transaction processing. Multi-currency support with real-time FX rates requires additional specification.",
                "requirements": [
                    "End-to-end TLS 1.3 encryption for all financial transactions with certificate pinning",
                    "Double-entry ledger system with real-time reconciliation and automated balance verification",
                    "PCI DSS Level 1 compliance for payment card data handling with tokenization",
                    "Immutable transaction audit logs with cryptographic tamper detection and regulatory retention",
                    "Multi-currency support with real-time FX rate integration and configurable rate-lock windows",
                    "Anti-money laundering (AML) screening integration with automated suspicious activity reporting",
                ],
                "stakeholder": "Finance leadership, compliance officers, and external auditors are aligned on scope. The CFO has approved budget allocation with a contingency reserve for audit costs.",
                "nextStep": "Validate ledger schema with finance team and engage external SOC 2 auditor",
            },
        }

        fallback = {
            "summary": f"The {industry} project scope has been validated against standard delivery frameworks. Core functional areas are well-defined with clear boundaries and stakeholder alignment.",
            "context": f"The {industry} project scope has been validated against standard delivery frameworks. Core functional areas are well-defined with clear boundaries and stakeholder alignment. The requirements capture both functional and non-functional aspects of the deliverable.",
            "requirements": [
                "Secure user authentication and authorization framework with role-based access",
                "Data integrity and validation across all input channels with automated quality checks",
                "Comprehensive reporting and analytics dashboards with real-time data refresh",
                "Integration with existing organizational systems via standard APIs",
                "Compliance with relevant industry regulations and data protection requirements",
                "Scalable architecture supporting projected growth over the next 24 months",
            ],
            "stakeholder": "Key stakeholders are aligned on project scope and timeline. Governance structure is established with clear escalation paths.",
            "nextStep": "Conduct stakeholder review of requirements document and sign off on Sprint 1 scope",
        }

        # Return structured in the "ba" key namespace required by the orchestrator
        return {"ba": profiles.get(industry, fallback)}
