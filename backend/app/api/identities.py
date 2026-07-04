from fastapi import APIRouter, HTTPException

from app.models.identity import NonHumanIdentity
from app.services.sample_data import get_sample_identities

router = APIRouter(prefix="/identities", tags=["identities"])


@router.get("", response_model=list[NonHumanIdentity])
def list_identities():
    return get_sample_identities()


@router.get("/{identity_id}", response_model=NonHumanIdentity)
def get_identity(identity_id: str):
    for identity in get_sample_identities():
        if identity.id == identity_id:
            return identity
    raise HTTPException(status_code=404, detail=f"Identity '{identity_id}' not found")
