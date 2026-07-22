import { notFound } from "next/navigation";
import { identities } from "@/data/identities";
import { assessIdentity } from "@/lib/riskEngine";
import { IdentityDetailView } from "@/components/identities/IdentityDetailView";

export function generateStaticParams() {
  return identities.map((identity) => ({ id: identity.id }));
}

export default async function IdentityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const identity = identities.find((i) => i.id === id);

  if (!identity) {
    notFound();
  }

  const assessment = assessIdentity(identity);

  return <IdentityDetailView identity={identity} assessment={assessment} />;
}
