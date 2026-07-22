import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";

export default function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="texture-grid-ambient flex-1 min-w-0 flex flex-col pb-16 md:pb-0">{children}</div>
      <MobileNav />
    </div>
  );
}
