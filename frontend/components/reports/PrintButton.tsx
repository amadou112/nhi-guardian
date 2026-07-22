"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function PrintButton({ label }: { label: string }) {
  return (
    <Button variant="secondary" onClick={() => window.print()} className="text-sm">
      <Printer className="h-4 w-4" /> {label}
    </Button>
  );
}
