export type IdentityType =
  | "API Key"
  | "Service Account"
  | "OAuth Token"
  | "SSH Key"
  | "Cloud Access Key"
  | "Database Credential"
  | "CI/CD Secret"
  | "Machine Certificate";

export type SystemName =
  | "AWS"
  | "Azure"
  | "GitHub Actions"
  | "Jenkins"
  | "PostgreSQL"
  | "Salesforce"
  | "ServiceNow"
  | "Kubernetes"
  | "Internal API";

export type Environment = "Production" | "Staging" | "Development" | "Sandbox";

export type PermissionLevel = "Admin" | "Owner" | "Read/Write" | "Read-Only";

export type RotationStatus = "Rotated Recently" | "Overdue" | "Never Rotated";

export type IdentityStatus = "Active" | "Inactive" | "Suspended" | "Pending Review";

export type RiskSeverity = "Critical" | "High" | "Medium" | "Low";

export interface NonHumanIdentity {
  id: string;
  name: string;
  type: IdentityType;
  owner: string | null;
  system: SystemName;
  environment: Environment;
  lastUsedDate: string; // ISO date
  createdDate: string; // ISO date
  daysSinceRotation: number | null; // null = never rotated
  permissionLevel: PermissionLevel;
  hasExpiration: boolean;
  isShared: boolean;
  hasDocumentation: boolean;
  secretExposed: boolean;
  status: IdentityStatus;
}

export interface RiskFinding {
  factor: string;
  description: string;
  weight: number;
}

export interface RiskAssessment {
  identityId: string;
  score: number; // 0-100
  severity: RiskSeverity;
  findings: RiskFinding[];
  recommendations: string[];
}
