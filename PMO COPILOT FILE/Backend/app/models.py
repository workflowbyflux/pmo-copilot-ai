# PMO Copilot AI — Pydantic Models for Request/Response Schemas

from pydantic import BaseModel, Field
from typing import Optional


# --- Request Models ---

class AnalysisRequest(BaseModel):
    """Request body for the /analyze POST endpoint."""
    project_summary: str = Field(
        ...,
        description="A description of the project to analyze.",
        min_length=1,
        examples=["AI-Powered Customer Support Platform"]
    )
    industry: str = Field(
        ...,
        description="The industry vertical for the project.",
        examples=["Technology"]
    )
    decision_goal: str = Field(
        ...,
        description="The decision goal for the analysis.",
        examples=["Build a New Product"]
    )


# --- Nested Response Models ---

class ExecResponse(BaseModel):
    badgeIcon: str
    badgeText: str
    badgeClass: str
    title: str
    desc: str
    summary: str
    confidence: int
    riskLevel: str
    riskClass: str


class BAResponse(BaseModel):
    summary: str
    context: str
    requirements: list[str]
    stakeholder: str
    nextStep: str


class MilestoneDetail(BaseModel):
    phase: str
    desc: str


class PMResponse(BaseModel):
    timeline: str
    timelineShort: str
    milestones: list[str]
    milestonesDetailed: list[MilestoneDetail]
    resources: str
    nextStep: str


class RiskItem(BaseModel):
    name: str
    severity: str
    likelihood: str
    impact: str


class RiskResponse(BaseModel):
    topRisks: list[str]
    severity: str
    overview: str
    risks: list[RiskItem]
    mitigations: list[str]
    nextStep: str


class ReleaseResponse(BaseModel):
    readinessScore: int
    summary: str
    deployRec: str
    checklist: list[str]
    nextStep: str


class KPIItem(BaseModel):
    value: int
    status: str
    statusClass: str
    color: str


class KPIsResponse(BaseModel):
    timeline: KPIItem
    budget: KPIItem
    risk: KPIItem
    req: KPIItem
    release: KPIItem


class WhyResponse(BaseModel):
    ba: str
    pm: str
    risk: str
    release: str


class AgentVote(BaseModel):
    text: str
    cls: str


class FinalResponse(BaseModel):
    verdict: str
    verdictClass: str
    rationale: str
    ba: AgentVote
    pm: AgentVote
    risk: AgentVote
    release: AgentVote


class ProjectInfo(BaseModel):
    name: str
    industry: str
    goal: str
    timestamp: str


# --- Top-Level Response Model ---

class AnalysisResponse(BaseModel):
    """Complete analysis response matching the frontend data contract."""
    projectInfo: ProjectInfo
    exec: ExecResponse
    ba: BAResponse
    pm: PMResponse
    risk: RiskResponse
    release: ReleaseResponse
    kpis: KPIsResponse
    why: WhyResponse
    final: FinalResponse
