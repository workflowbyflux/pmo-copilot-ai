## 📖 Overview
![Google AI Agents Hackathon](https://img.shields.io/badge/Google-AI%20Agents%20Hackathon-4285F4?style=for-the-badge&logo=google)

![Agents for Business](https://img.shields.io/badge/Track-Agents%20for%20Business-34A853?style=for-the-badge)

![Frontend](https://img.shields.io/badge/Frontend-Vercel-000000?style=for-the-badge&logo=vercel)

![Backend](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)

![AI](https://img.shields.io/badge/AI-Google%20Gemini-FF9800?style=for-the-badge)

PMO Copilot AI is a multi-agent AI platform designed to help Project Managers, PMO teams, and business leaders make faster, smarter, and more informed project decisions. Rather than relying on a single AI assistant, the platform simulates the expertise of four key Project Management Office (PMO) roles—Project Manager, Business Analyst, Risk Manager, and Release Manager—to deliver comprehensive project intelligence.

Users simply provide the project industry, goal, and details. The platform then orchestrates four specialized AI agents to independently evaluate the project before synthesizing their insights into an executive-ready report containing strategic recommendations, business analysis, risk assessments, and release readiness insights.

The frontend is publicly deployed on **Vercel**, allowing anyone to explore the user interface, while the backend source code and setup instructions are available in this repository.  

# 🌐 Live Demo

### 🚀 Frontend Application

🔗 https://pmo-copilot-ai.vercel.app/

> The frontend is publicly deployed on Vercel for demonstration purposes.

### 💻 Source Code

GitHub Repository:

https://github.com/workflowbyflux/pmo-copilot-ai

# 🛠 Technology Stack

| Layer | Technology |
|---------|------------|
| Frontend | HTML, CSS, JavaScript |
| Backend | FastAPI (Python) |
| AI Model | Google Gemini |
| AI Architecture | Multi-Agent AI |
| Deployment | Vercel (Frontend)
|Deploymenr | supabase (backend)
| Version Control | GitHub |

# 🚀 Installation

## Clone the Repository

```bash
git clone https://github.com/workflowbyflux/pmo-copilot-ai.git

cd pmo-copilot-ai
```

---

## Frontend

The frontend is already deployed and can be accessed here:

https://pmo-copilot-ai.vercel.app/

To run locally:

```bash
cd Frontend

python -m http.server 3000
```

Open:

```
http://localhost:3000
```

---

## Backend

```bash
cd Backend

python -m venv .venv

# Windows
.venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend:

```
http://localhost:8000
```

# 🎥 Demo Video

A walkthrough of PMO Copilot AI demonstrating the multi-agent workflow is available here:

**YouTube:** *(https://youtu.be/pw8lruoIoHw.)*

## 🛣️ Roadmap

- [x] Multi-Agent Architecture
- [x] Project Analysis
- [x] Risk Assessment
- [x] Business Analysis
- [x] Executive Reports
- [ ] Jira Integration
- [ ] Microsoft Project Integration
- [ ] PDF Export
- [ ] Portfolio Dashboard
- [ ] Predictive Analytics


## ⚠️ Disclaimer

This project was developed as part of the Google AI Agents Hackathon for educational and demonstration purposes.


## 🙏 Acknowledgements

Special thanks to:

- Google AI
- Google Gemini
- Google AI Agents Hackathon
- Open-source community
