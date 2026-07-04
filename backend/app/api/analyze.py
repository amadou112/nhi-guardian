from fastapi import APIRouter

from app.models.identity import AnalyzeRequest, AnalyzeResponse
from app.services.ai_service import ask_ai_analyst
from app.services.sample_data import get_sample_identities

router = APIRouter(prefix="/analyze", tags=["ai"])


@router.post("", response_model=AnalyzeResponse)
def analyze(request: AnalyzeRequest):
    answer = ask_ai_analyst(request.question, get_sample_identities())
    return AnalyzeResponse(answer=answer)
