"use client";

import { Topbar } from "@/components/layout/Topbar";
import { Card } from "@/components/ui/Card";
import { IdentityInventoryClient } from "@/components/identities/IdentityInventoryClient";
import { identities } from "@/data/identities";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function IdentitiesPage() {
  const { dict } = useLanguage();
  return (
    <>
      <Topbar title={dict.identities.title} subtitle={dict.identities.subtitle(identities.length)} />
      <main className="flex-1 p-6">
        <Card className="overflow-hidden p-0">
          <IdentityInventoryClient identities={identities} />
        </Card>
      </main>
    </>
  );
}
