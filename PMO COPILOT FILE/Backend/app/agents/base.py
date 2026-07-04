# PMO Copilot AI — Base Agent Interface
# Defines the contract that all specialized agents must implement.
# When Google ADK is integrated, each agent subclass will wrap an ADK agent.

from abc import ABC, abstractmethod
from typing import Any


class BaseAgent(ABC):
    """Abstract base class for all PMO Copilot AI agents.

    Each agent receives project context and returns its domain-specific
    analysis as a dictionary. The orchestration service collects all
    agent outputs and assembles the final AnalysisResponse.

    Future Integration:
        When connecting to Google's Agent Development Kit (ADK), subclasses
        will initialize an ADK agent in __init__ and delegate the analyze()
        call to the ADK runtime.
    """

    def __init__(self, name: str, role: str):
        self.name = name
        self.role = role

    @abstractmethod
    async def analyze(
        self,
        project_summary: str,
        industry: str,
        decision_goal: str,
    ) -> dict[str, Any]:
        """Run the agent's analysis and return structured output.

        Args:
            project_summary: Description of the project.
            industry: Industry vertical (e.g. Technology, Healthcare).
            decision_goal: What the user wants to achieve.

        Returns:
            A dict matching the agent's section of the AnalysisResponse schema.
        """
        ...
