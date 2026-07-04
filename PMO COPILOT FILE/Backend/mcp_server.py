# PMO Copilot AI — MCP Server for Report Export
# This is a standalone Model Context Protocol server exposing the `export_report` tool.

import os
import json
from datetime import datetime
from mcp.server.fastmcp import FastMCP

# Initialize the FastMCP server
mcp = FastMCP("PMOCopilotExportServer")

EXPORT_DIR = os.path.join(os.path.dirname(__file__), "exports")
os.makedirs(EXPORT_DIR, exist_ok=True)

@mcp.tool()
def export_report(report_data_json: str) -> str:
    """
    Securely generates and saves a Markdown report from the project data.
    
    Args:
        report_data_json: A JSON string containing the full AnalysisResponse data.
        
    Returns:
        A string indicating the success and the absolute path to the saved file.
    """
    try:
        data = json.loads(report_data_json)
        
        project_info = data.get("projectInfo", {})
        project_name = project_info.get("name", "Unknown_Project").replace(" ", "_")
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{project_name}_Report_{timestamp}.md"
        filepath = os.path.join(EXPORT_DIR, filename)
        
        # Build the Markdown content
        md_lines = []
        md_lines.append(f"# PMO Copilot AI: Full Analysis Report")
        md_lines.append(f"**Project:** {project_info.get('name', 'N/A')}")
        md_lines.append(f"**Industry:** {project_info.get('industry', 'N/A')}")
        md_lines.append(f"**Decision Goal:** {project_info.get('goal', 'N/A')}")
        md_lines.append(f"**Date:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        md_lines.append("\n---\n")
        
        # 1. Executive Summary
        exec_data = data.get("exec", {})
        md_lines.append("## 1. Executive Summary")
        md_lines.append(f"**Verdict:** {exec_data.get('title', 'N/A')}")
        md_lines.append(f"{exec_data.get('summary', 'N/A')}")
        md_lines.append(f"- **Confidence Score:** {exec_data.get('confidence', 'N/A')}%")
        md_lines.append(f"- **Overall Risk Level:** {exec_data.get('riskLevel', 'N/A')}")
        md_lines.append("\n---\n")
        
        # 2. Business Analyst
        ba = data.get("ba", {})
        md_lines.append("## 2. Business Requirements")
        md_lines.append(f"**Summary:** {ba.get('summary', 'N/A')}")
        md_lines.append("\n**Core Requirements:**")
        for req in ba.get("requirements", []):
            md_lines.append(f"- {req}")
        md_lines.append(f"\n**Stakeholder Alignment:** {ba.get('stakeholder', 'N/A')}")
        md_lines.append("\n---\n")
        
        # 3. Project Manager
        pm = data.get("pm", {})
        md_lines.append("## 3. Project Roadmap")
        md_lines.append(f"**Estimated Timeline:** {pm.get('timeline', 'N/A')}")
        md_lines.append("\n**Key Milestones:**")
        for milestone in pm.get("milestonesDetailed", []):
            phase = milestone.get("phase", "")
            desc = milestone.get("desc", "")
            md_lines.append(f"- **{phase}**: {desc}")
        md_lines.append(f"\n**Resource Plan:** {pm.get('resources', 'N/A')}")
        md_lines.append("\n---\n")
        
        # 4. Risk Manager
        risk = data.get("risk", {})
        md_lines.append("## 4. Risk Assessment")
        md_lines.append(f"**Overview:** {risk.get('overview', 'N/A')}")
        md_lines.append("\n**Top Risks:**")
        for r in risk.get("risks", []):
            r_name = r.get('name', '')
            r_sev = r.get('severity', '')
            md_lines.append(f"- [{r_sev}] {r_name}")
        md_lines.append("\n**Mitigation Strategies:**")
        for mit in risk.get("mitigations", []):
            md_lines.append(f"- {mit}")
        md_lines.append("\n---\n")
        
        # 5. Release Manager
        rel = data.get("release", {})
        md_lines.append("## 5. Release Readiness")
        md_lines.append(f"**Readiness Score:** {rel.get('readinessScore', 'N/A')}/100")
        md_lines.append(f"**Deployment Recommendation:** {rel.get('deployRec', 'N/A')}")
        md_lines.append("\n**Launch Checklist:**")
        for item in rel.get("checklist", []):
            md_lines.append(f"- [ ] {item}")
        md_lines.append("\n---\n")
        
        # 6. Final Recommendation
        final = data.get("final", {})
        md_lines.append("## 6. Final Recommendation")
        md_lines.append(f"### {final.get('verdict', 'N/A')}")
        md_lines.append(f"{final.get('rationale', 'N/A')}")
        
        # Save to file
        with open(filepath, "w", encoding="utf-8") as f:
            f.write("\n".join(md_lines))
            
        return f"Successfully exported report to {filepath}"
    
    except Exception as e:
        return f"Error exporting report: {str(e)}"


if __name__ == "__main__":
    # Run the MCP server using standard input/output
    mcp.run()
