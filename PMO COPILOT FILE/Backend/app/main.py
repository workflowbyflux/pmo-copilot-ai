# PMO Copilot AI — Main Backend Application
# FastAPI entry point for the backend service.

from fastapi import FastAPI, Depends, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import json
import asyncio
import os
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

from app.models import AnalysisRequest, AnalysisResponse
from app.services.analysis import AnalysisOrchestrator

app = FastAPI(
    title="PMO Copilot AI Backend",
    description="Backend API for the PMO Copilot AI system, preparing for Google ADK integration.",
    version="1.0.0",
)

# Enable CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check():
    """Health check endpoint to verify backend is running."""
    return {"status": "healthy", "service": "pmo-copilot-api"}


@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_project_post(request: AnalysisRequest):
    """
    Main endpoint for analyzing a project (POST).
    Receives project details and returns comprehensive AI agent analysis.
    """
    orchestrator = AnalysisOrchestrator()
    return await orchestrator.analyze_project(request)


@app.get("/api/analysis", response_model=AnalysisResponse)
async def analyze_project_get(
    ind: str = Query(..., description="Industry"),
    goal: str = Query(..., description="Decision Goal"),
    desc: str = Query(..., description="Project Description (Summary)"),
):
    """
    Fallback GET endpoint to match the existing frontend contract.
    The frontend currently sends a GET request to /api/analysis.
    """
    request = AnalysisRequest(
        project_summary=desc,
        industry=ind,
        decision_goal=goal,
    )
    orchestrator = AnalysisOrchestrator()
    return await orchestrator.analyze_project(request)

@app.post("/export")
async def export_report_endpoint(request: AnalysisResponse):
    """
    Acts as an MCP Client to invoke the export_report tool on the MCP Server.
    """
    # Determine the path to the Python executable in the virtual environment
    venv_python = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".venv", "Scripts", "python.exe"))
    server_params = StdioServerParameters(
        command=venv_python,
        args=["mcp_server.py"],
        env=None
    )

    try:
        async with stdio_client(server_params) as (read, write):
            async with ClientSession(read, write) as session:
                await session.initialize()
                
                # Call the export_report tool on the MCP server
                result = await session.call_tool(
                    "export_report",
                    arguments={"report_data_json": request.model_dump_json()}
                )
                
                if result.is_error:
                    raise HTTPException(status_code=500, detail="MCP Tool Error")
                    
                return {"message": "Export successful", "details": result.content[0].text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to connect to MCP server: {str(e)}")

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
