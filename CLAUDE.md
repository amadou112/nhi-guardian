# CLAUDE.md

## Project Name

NHI Guardian — Non-Human Identity Security Platform

## Mission

Build a professional cybersecurity portfolio application that helps organizations detect, monitor, and reduce risk from Non-Human Identities such as API keys, service accounts, OAuth tokens, secrets, CI/CD credentials, cloud access keys, and machine identities.

This project should look like a real enterprise security product that a recruiter, cybersecurity manager, or AI Program Management hiring team can understand quickly.

## Product Goal

NHI Guardian will provide a dashboard that allows users to:

1. Upload or scan identity/security data
2. Detect risky non-human identities
3. Classify risk severity
4. Recommend remediation actions
5. Generate executive security reports
6. Track identity lifecycle status
7. Demonstrate AI-assisted cybersecurity analysis

## Target Users

* Cybersecurity teams
* IAM teams
* Cloud security teams
* DevSecOps teams
* Program Managers overseeing security programs
* Executives needing security risk summaries

## Tech Stack

Use the following preferred stack:

### Frontend

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui if useful

### Backend

* FastAPI
* Python

### Database

* PostgreSQL

### AI / Intelligence Layer

* OpenAI API or local mock AI mode
* LangChain or simple custom AI service
* Risk scoring logic

### Future Enhancements

* Docker
* AWS deployment
* GitHub Actions
* Vector database for security document RAG

## Core Features

### 1. Dashboard

Create a modern cybersecurity dashboard showing:

* Total Non-Human Identities
* Critical risks
* Expired credentials
* Overprivileged accounts
* Secrets without rotation
* Orphaned identities
* Cloud/service account exposure

### 2. Identity Inventory

Create a table for Non-Human Identities with fields:

* Identity name
* Type
* Owner
* System
* Environment
* Last used date
* Created date
* Permission level
* Rotation status
* Risk score
* Status

Identity types should include:

* API Key
* Service Account
* OAuth Token
* SSH Key
* Cloud Access Key
* Database Credential
* CI/CD Secret
* Machine Certificate

### 3. Risk Scoring Engine

Create a rule-based risk scoring engine.

Risk factors:

* Not rotated in more than 90 days
* No owner assigned
* High privilege
* Last used more than 180 days ago
* Production access
* Secret exposed
* No expiration date
* Shared account
* Missing documentation

Severity levels:

* Critical
* High
* Medium
* Low

### 4. AI Security Analyst

Add an AI assistant that can explain:

* Why an identity is risky
* What remediation is recommended
* What the executive summary should say
* What the security team should prioritize

Example user questions:

* "Which identities are highest risk?"
* "Explain why this service account is critical."
* "Generate a remediation plan."
* "Write an executive risk summary."
* "What should we fix first?"

### 5. Remediation Recommendations

Each risky identity should have recommended actions such as:

* Rotate credential
* Assign owner
* Reduce permissions
* Disable unused identity
* Add expiration date
* Move secret to vault
* Review production access
* Document business purpose

### 6. Executive Report Generator

Generate a professional report with:

* Risk summary
* Key metrics
* Top 5 critical findings
* Remediation roadmap
* Business impact
* Recommended next actions

### 7. Sample Data

Create realistic demo data for at least 25 non-human identities across:

* AWS
* Azure
* GitHub Actions
* Jenkins
* PostgreSQL
* Salesforce
* ServiceNow
* Kubernetes
* Internal APIs

## Design Direction

The UI should look modern, clean, and enterprise-ready.

Preferred style:

* Dark cybersecurity theme
* Blue, cyan, slate, and white accents
* Security dashboard feel
* Cards, tables, badges, and charts
* Professional enough for GitHub and LinkedIn portfolio

Avoid a basic student-project look.

## Development Approach

Build step by step.

### Phase 1 — Frontend MVP

Create the Next.js frontend with:

* Landing page
* Dashboard
* Identity inventory table
* Risk cards
* Sample data
* Clean styling

### Phase 2 — Backend API

Create FastAPI backend with endpoints:

* GET /identities
* GET /identities/{id}
* GET /risks
* POST /analyze
* POST /report

### Phase 3 — Risk Engine

Implement rule-based risk scoring logic.

### Phase 4 — AI Assistant

Add AI analysis and explanation capability.

### Phase 5 — Reports

Generate executive report summaries.

### Phase 6 — Polish

Add README, screenshots, architecture diagram, deployment instructions, and recruiter-friendly explanation.

## Folder Structure

Use this structure:

nhi-guardian/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── data/
│   └── styles/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── services/
│   │   └── main.py
│   └── requirements.txt
│
├── documents/
├── screenshots/
├── README.md
├── CLAUDE.md
└── docker-compose.yml

## Coding Rules

When generating code:

1. Keep code clean and beginner-friendly.
2. Explain where each file goes.
3. Do not assume files already exist.
4. Provide complete file contents when asked.
5. Avoid overly complex architecture in the beginning.
6. Make the app run locally first.
7. Use sample data before database integration.
8. Make the UI impressive early.
9. Prioritize portfolio quality.
10. Always include clear next steps.

## First Task for Claude

Start by building the frontend MVP.

Create a Next.js app for NHI Guardian with:

* A professional cybersecurity dashboard
* A hero section
* KPI cards
* Risk overview
* Non-human identity inventory table
* Sample identity data
* Dark blue/cyan enterprise styling
* Recruiter-friendly visual quality

The app should run locally with:

npm run dev

Use mock data first. Do not connect to the backend yet.

## Business Explanation

This project demonstrates:

* AI Program Management thinking
* Cybersecurity awareness
* IAM and identity lifecycle understanding
* Risk management
* Executive reporting
* AI-assisted analysis
* Full-stack product development
* Enterprise platform design

The final product should help position the builder for:

* AI Technical Program Manager
* Cybersecurity Program Manager
* IAM Program Manager
* AI Product Manager
* Cloud Security TPM
* Enterprise AI Consultant

## README Positioning

Describe this project as:

"NHI Guardian is an AI-powered Non-Human Identity Security Platform that helps security and IAM teams identify risky service accounts, API keys, tokens, secrets, and machine credentials. It provides identity inventory, risk scoring, remediation guidance, and executive reporting."

## Important

Build this project like a serious enterprise security platform, not a toy app.
Focus on clarity, clean design, practical security use cases, and recruiter impact.
