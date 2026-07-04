from fastapi import APIRouter

from app.models.identity import RiskAssessment
from app.services.risk_engine import assess_all
from app.services.sample_data import get_sample_identities

router = APIRouter(prefix="/risks", tags=["risks"])


@router.get("", response_model=list[RiskAssessment])
def list_risks():
    return assess_all(get_sample_identities())
