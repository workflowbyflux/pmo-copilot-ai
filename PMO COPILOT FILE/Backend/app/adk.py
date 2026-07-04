# PMO Copilot AI — Mock Google ADK Abstraction
# Simulates the Google Agent Development Kit for local development.

from typing import Any, Dict
import asyncio
import json

class Agent:
    """
    Mock ADK Agent.
    In a real implementation, this would connect to Google's LLM services
    and utilize a specific model, system instructions, and tools.
    """

    def __init__(self, name: str, role: str, instructions: str, response_schema: Any = None):
        self.name = name
        self.role = role
        self.instructions = instructions
        self.response_schema = response_schema

    async def invoke(self, inputs: Dict[str, Any]) -> Dict[str, Any]:
        """
        Simulates an LLM invocation.
        In a real application, this sends the inputs to the LLM and returns the structured output.
        For this mock, we will route to our hardcoded profiles based on the 'industry' input.
        """
        industry = inputs.get("industry", "Unknown")
        return await self._mock_llm_response(industry)

    async def _mock_llm_response(self, industry: str) -> Dict[str, Any]:
        """Override this method in the specialized agents to return the mock data."""
        return {}


class Orchestrator:
    """
    Mock ADK Orchestrator Agent.
    Coordinates multiple specialized agents, passing context between them
    and combining their outputs into a final structured response.
    """

    def __init__(self, name: str, agents: list[Agent]):
        self.name = name
        self.agents = agents

    async def run(self, inputs: Dict[str, Any]) -> Dict[str, Any]:
        """
        Executes all registered agents, typically concurrently, and combines results.
        """
        tasks = []
        for agent in self.agents:
            tasks.append(agent.invoke(inputs))
        
        results = await asyncio.gather(*tasks)
        
        # Combine outputs into a single dictionary
        combined = {}
        for result in results:
            combined.update(result)
            
        return combined
