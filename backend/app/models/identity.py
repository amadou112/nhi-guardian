"""Pydantic models for Non-Human Identities and risk assessments.

Mirrors frontend/lib/types.ts so both layers agree on shape.
"""

from enum import Enum
from typing import List, Optional

from pydantic import BaseModel


class IdentityType(str, Enum):
    API_KEY = "API Key"
    SERVICE_ACCOUNT = "Service Account"
    OAUTH_TOKEN = "OAuth Token"
    SSH_KEY = "SSH Key"
    CLOUD_ACCESS_KEY = "Cloud Access Key"
    DATABASE_CREDENTIAL = "Database Credential"
    CICD_SECRET = "CI/CD Secret"
    MACHINE_CERTIFICATE = "Machine Certificate"


class SystemName(str, Enum):
    AWS = "AWS"
    AZURE = "Azure"
    GITHUB_ACTIONS = "GitHub Actions"
    JENKINS = "Jenkins"
    POSTGRESQL = "PostgreSQL"
    SALESFORCE = "Salesforce"
    SERVICENOW = "ServiceNow"
    KUBERNETES = "Kubernetes"
    INTERNAL_API = "Internal API"


class Environment(str, Enum):
    PRODUCTION = "Production"
    STAGING = "Staging"
    DEVELOPMENT = "Development"
    SANDBOX = "Sandbox"


class PermissionLevel(str, Enum):
    ADMIN = "Admin"
    OWNER = "Owner"
    READ_WRITE = "Read/Write"
    READ_ONLY = "Read-Only"


class RotationStatus(str, Enum):
    ROTATED_RECENTLY = "Rotated Recently"
    OVERDUE = "Overdue"
    NEVER_ROTATED = "Never Rotated"


class IdentityStatus(str, Enum):
    ACTIVE = "Active"
    INACTIVE = "Inactive"
    SUSPENDED = "Suspended"
    PENDING_REVIEW = "Pending Review"


class RiskSeverity(str, Enum):
    CRITICAL = "Critical"
    HIGH = "High"
    MEDIUM = "Medium"
    LOW = "Low"


class NonHumanIdentity(BaseModel):
    id: str
    name: str
    type: IdentityType
    owner: Optional[str] = None
    system: SystemName
    environment: Environment
    last_used_date: str
    created_date: str
    days_since_rotation: Optional[int] = None
    permission_level: PermissionLevel
    has_expiration: bool
    is_shared: bool
    has_documentation: bool
    secret_exposed: bool
    status: IdentityStatus


class RiskFinding(BaseModel):
    factor: str
    description: str
    weight: int


class RiskAssessment(BaseModel):
    identity_id: str
    score: int
    severity: RiskSeverity
    findings: List[RiskFinding]
    recommendations: List[str]


class AnalyzeRequest(BaseModel):
    question: str


class AnalyzeResponse(BaseModel):
    answer: str
