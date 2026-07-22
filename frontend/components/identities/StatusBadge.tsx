"use client";

import { Badge, BadgeTone } from "@/components/ui/Badge";
import { IdentityStatus, RotationStatus } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const statusTone: Record<IdentityStatus, BadgeTone> = {
  Active: "low",
  Inactive: "ink",
  Suspended: "critical",
  "Pending Review": "high",
};

export function StatusBadge({ status }: { status: IdentityStatus }) {
  const { dict } = useLanguage();
  return <Badge tone={statusTone[status]}>{dict.status[status]}</Badge>;
}

const rotationTone: Record<RotationStatus, BadgeTone> = {
  "Rotated Recently": "low",
  Overdue: "high",
  "Never Rotated": "critical",
};

export function RotationBadge({ status }: { status: RotationStatus }) {
  const { dict } = useLanguage();
  return <Badge tone={rotationTone[status]}>{dict.rotation[status]}</Badge>;
}
