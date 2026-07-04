# NHI Guardian — Powered by Sidibe Enterprises

**Live demo:** [frontend-sandy-nine-57.vercel.app](https://frontend-sandy-nine-57.vercel.app) · **Source:** [github.com/amadou112/nhi-guardian](https://github.com/amadou112/nhi-guardian)

> NHI Guardian is an AI-powered Non-Human Identity Security Platform, powered by Sidibe Enterprises, that helps security and IAM teams identify risky service accounts, API keys, tokens, secrets, and machine credentials. It provides identity inventory, risk scoring, remediation guidance, and executive reporting.

Non-human identities — API keys, service accounts, OAuth tokens, SSH keys, CI/CD secrets, and machine certificates — now outnumber human identities in most enterprises, and they rarely get the same governance. NHI Guardian is a portfolio-grade demonstration of how a security or IAM program would inventory, score, and remediate that risk end to end.

## What it does

- **Identity Inventory** — a single table of every non-human identity across AWS, Azure, GitHub Actions, Jenkins, PostgreSQL, Salesforce, ServiceNow, Kubernetes, and internal APIs, with owner, environment, permission level, and rotation status.
- **Rule-Based Risk Scoring Engine** — every identity is scored 0–100 against 9 real-world risk factors (rotation overdue, no owner, high privilege, stale usage, production access, exposed secrets, no expiration, shared accounts, missing documentation) and mapped to Critical / High / Medium / Low severity.
- **AI Security Analyst** — a chat interface that answers questions like "Which identities are highest risk?", "Explain why this service account is critical," or "Generate a remediation plan," backed by the same risk engine (local mock mode by default; swappable for a live LLM).
- **Remediation Recommendations** — every risky identity ships with concrete next steps: rotate, assign an owner, reduce permissions, disable, add an expiration, vault the secret, review production access, or document its purpose.
- **Executive Report Generator** — a board-ready report with a risk summary, key metrics, top 5 critical findings, a phased remediation roadmap, and business impact.
- **Phishing & Malware Scanner** — a standalone tool (`/tools/phishing-scanner`) that checks a pasted link, email, or message against rule-based threat indicators (lookalike/punycode domains, IP-based links, URL shorteners, urgency language, credential requests, dangerous attachment types) and explains exactly what it found.
- **ATS Resume Checker** — a standalone tool (`/tools/resume-checker`) that scores a pasted resume against ATS-readiness rules (contact info, section headers, length, bullet density, action verbs, quantified achievements, target-keyword coverage) with concrete recommendations.

## Design system

The UI commits to a single dark theme — a security operations console is conventionally dark for 24/7 monitoring legibility, so this is a deliberate choice, not a missing light mode.

- **Color** — a violet-biased neutral scale (`ink`), an electric indigo brand/interactive accent (`accent`) drawn from the hero shield artwork, a magenta glow used only for decorative atmosphere, and a standard critical/high/medium/low severity palette kept intentionally separate from the brand accent so risk state is never ambiguous with "this is clickable."
- **Typography** — IBM Plex Sans for display headings, Public Sans for body copy, and IBM Plex Mono (with tabular figures) for scores, IDs, and dates — a pairing chosen for the systems/identity subject matter rather than a default safe face.
- **Texture** — a hairline circuit-grid pattern and fine film grain, both barely-there, to avoid a flat gradient-on-black look.
- **Motion** — scroll-triggered reveals, animated KPI counters, a floating hero shield, and an interactive 3D globe ([cobe](https://github.com/shuding/cobe)) marking the cloud/CI regions NHI Guardian monitors — all wrapped to respect `prefers-reduced-motion`.
- **Imagery** — original photography/illustration assets live in `frontend/public/` and are placed contextually: the hero shield on the landing page, a datacenter banner on the dashboard, and topic-specific illustrations on the phishing and resume tool pages.

## Why this project exists

This project demonstrates the intersection of cybersecurity domain knowledge and AI-assisted product thinking:

- IAM and non-human identity lifecycle management
- Practical, explainable risk scoring (not a black box)
- AI-assisted security analysis and executive communication
- Full-stack product delivery (Next.js + FastAPI) with a clean, enterprise-ready UI

It's built to be legible to a cybersecurity hiring manager, an IAM/cloud security team, or an AI Program Management interviewer in a five-minute walkthrough — positioning for roles such as AI Technical Program Manager, Cybersecurity Program Manager, IAM Program Manager, AI Product Manager, or Cloud Security TPM.

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | Next.js (App Router), TypeScript, Tailwind CSS, Recharts, Framer Motion, cobe, lucide-react |
| Backend | FastAPI, Python, Pydantic |
| Database (future) | PostgreSQL |
| AI layer | Local rule-based mock analyst by default; swappable for OpenAI / LangChain |
| Deployment (future) | Docker, AWS, GitHub Actions |

## Project structure

```
nhi-guardian/
├── frontend/               # Next.js app (dashboard, inventory, AI chat, reports, tools)
│   ├── app/                # Routes: landing page + (dashboard) route group + tools/
│   ├── components/         # UI primitives, layout, dashboard, identities, ai, motion, landing
│   ├── lib/                # types, risk/phishing/resume engines, AI service, report generator
│   ├── data/                # 30 sample non-human identities (mock data)
│   └── public/              # brand assets, textures, photography/illustration
│
├── backend/                # FastAPI app
│   ├── app/
│   │   ├── api/            # identities, risks, analyze, report routers
│   │   ├── models/         # Pydantic models (mirrors frontend/lib/types.ts)
│   │   ├── services/       # risk engine, AI service, report service, sample data
│   │   └── main.py
│   └── requirements.txt
│
├── documents/               # supporting docs (architecture notes, write-ups)
├── screenshots/              # product screenshots for this README
├── docker-compose.yml
└── README.md
```

## Running it locally

The frontend runs fully on mock data and does not require the backend to be running.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Backend (optional — API layer for Phase 2+)

```bash
cd backend
python -m venv venv
source venv/Scripts/activate   # Windows Git Bash; use venv\Scripts\activate.bat on cmd
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Open [http://localhost:8000/docs](http://localhost:8000/docs) for interactive API docs.

Endpoints:

| Method | Path | Description |
|---|---|---|
| GET | `/identities` | List all non-human identities |
| GET | `/identities/{id}` | Get a single identity |
| GET | `/risks` | Risk assessment for every identity |
| POST | `/analyze` | Ask the AI Security Analyst a question (`{"question": "..."}`) |
| POST | `/report` | Generate the executive report |

### With Docker

```bash
docker compose up --build
```

This brings up the frontend (`:3000`), backend (`:8000`), and a PostgreSQL instance (`:5432`) provisioned for future persistence work.

## How the risk score works

Each identity starts at 0 and accumulates points for every risk factor it triggers, capped at 100:

| Factor | Weight |
|---|---|
| Secret exposed | 25 |
| Rotation overdue (>90 days or never rotated) | 20 |
| Stale / orphaned usage (>180 days) | 20 |
| No owner assigned | 15 |
| High privilege (Admin/Owner) | 15 |
| Production access | 10 |
| No expiration date | 10 |
| Shared account | 10 |
| Missing documentation | 5 |

Score bands: **Critical** ≥ 70, **High** ≥ 45, **Medium** ≥ 20, **Low** < 20.

## AI Security Analyst

The AI assistant runs in local rule-based "mock AI" mode out of the box — no API key required. It answers the same categories of question a live LLM integration would: highest risk identities, explaining a specific identity's score, remediation plans, executive summaries, and prioritization. Setting an `OPENAI_API_KEY` environment variable on the backend is the hook point for swapping in a live model without changing the frontend contract.

## Roadmap

- [x] Phase 1 — Frontend MVP (landing page, dashboard, inventory, mock data)
- [x] Phase 2 — Backend API (FastAPI endpoints)
- [x] Phase 3 — Rule-based risk scoring engine
- [x] Phase 4 — AI Security Analyst (local mock mode)
- [x] Phase 5 — Executive report generator
- [ ] Phase 6 — Polish: connect frontend to live backend, PostgreSQL persistence, live LLM integration, screenshots, deployment to AWS/Vercel, CI via GitHub Actions

## Next steps for extending this project

1. Wire the frontend to the FastAPI backend (replace `data/identities.ts` with a fetch layer).
2. Add a PostgreSQL-backed repository behind the same service interfaces.
3. Swap the mock AI service for a real OpenAI/LangChain-backed `/analyze` implementation.
4. Add authentication and role-based access (security team vs. executive view).
5. Add screenshots to `/screenshots` and an architecture diagram to `/documents`.
6. Deploy frontend to Vercel and backend to AWS (ECS/Fargate or App Runner), wired via GitHub Actions.
