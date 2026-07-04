from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import analyze, identities, report, risks
from app.services.ai_service import AI_MODE

app = FastAPI(
    title="NHI Guardian API",
    description="Non-Human Identity Security Platform — identity inventory, risk scoring, AI analysis, and executive reporting.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(identities.router)
app.include_router(risks.router)
app.include_router(analyze.router)
app.include_router(report.router)


@app.get("/")
def root():
    return {
        "service": "NHI Guardian API",
        "status": "ok",
        "ai_mode": AI_MODE,
        "endpoints": [
            "GET /identities",
            "GET /identities/{id}",
            "GET /risks",
            "POST /analyze",
            "POST /report",
        ],
    }
