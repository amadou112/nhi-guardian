import { Badge, BadgeTone } from "@/components/ui/Badge";
import { IdentityStatus, RotationStatus } from "@/lib/types";

const statusTone: Record<IdentityStatus, BadgeTone> = {
  Active: "low",
  Inactive: "ink",
  Suspended: "critical",
  "Pending Review": "high",
};

export function StatusBadge({ status }: { status: IdentityStatus }) {
  return <Badge tone={statusTone[status]}>{status}</Badge>;
}

const rotationTone: Record<RotationStatus, BadgeTone> = {
  "Rotated Recently": "low",
  Overdue: "high",
  "Never Rotated": "critical",
};

export function RotationBadge({ status }: { status: RotationStatus }) {
  return <Badge tone={rotationTone[status]}>{status}</Badge>;
}
