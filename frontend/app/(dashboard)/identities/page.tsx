import { Topbar } from "@/components/layout/Topbar";
import { Card } from "@/components/ui/Card";
import { IdentityInventoryClient } from "@/components/identities/IdentityInventoryClient";
import { identities } from "@/data/identities";

export default function IdentitiesPage() {
  return (
    <>
      <Topbar
        title="Identity Inventory"
        subtitle={`${identities.length} non-human identities across 9 connected systems`}
      />
      <main className="flex-1 p-6">
        <Card className="overflow-hidden p-0">
          <IdentityInventoryClient identities={identities} />
        </Card>
      </main>
    </>
  );
}
