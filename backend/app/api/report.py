from fastapi import APIRouter

from app.services.report_service import generate_executive_report
from app.services.sample_data import get_sample_identities

router = APIRouter(prefix="/report", tags=["reports"])


@router.post("")
def create_report():
    return generate_executive_report(get_sample_identities())
