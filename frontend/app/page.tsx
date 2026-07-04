import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  KeyRound,
  Bot,
  FileText,
  Radar,
  GitBranch,
  Fish,
  FileSearch,
  ShieldCheck,
} from "lucide-react";
import { identities } from "@/data/identities";
import { assessAll } from "@/lib/riskEngine";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { FloatingArt } from "@/components/landing/FloatingArt";
import { CoverageGlobe } from "@/components/landing/CoverageGlobe";

export default function Home() {
  const assessments = assessAll(identities);
  const critical = assessments.filter((a) => a.severity === "Critical").length;
  const high = assessments.filter((a) => a.severity === "High").length;
  const noOwner = identities.filter((i) => !i.owner).length;
  const avgScore = Math.round(
    assessments.reduce((sum, a) => sum + a.score, 0) / assessments.length
  );

  return (
    <div className="texture-grid flex-1">
      {/* Nav */}
      <header className="relative z-10 border-b border-ink-900">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <Image src="/brand/logo-mark.svg" alt="NHI Guardian" width={30} height={30} />
            <div className="leading-tight">
              <p className="font-display text-sm font-semibold tracking-tight text-ink-50">
                NHI Guardian
              </p>
              <p className="text-[10px] uppercase tracking-wider text-gold-500">
                Powered by Sidibe Enterprises
              </p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-ink-400 md:flex">
            <Link href="/dashboard" className="hover:text-ink-100 transition-colors">
              Dashboard
            </Link>
            <Link href="/tools/phishing-scanner" className="hover:text-ink-100 transition-colors">
              Phishing Scanner
            </Link>
            <Link href="/tools/resume-checker" className="hover:text-ink-100 transition-colors">
              ATS Resume Checker
            </Link>
          </nav>
          <Link href="/dashboard">
            <Button variant="secondary" className="text-sm">
              Launch Dashboard <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 pt-16 pb-20 md:grid-cols-2 md:items-center md:pt-24">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-800/50 bg-accent-500/10 px-4 py-1.5 text-xs font-medium text-accent-300">
            <Radar className="h-3.5 w-3.5" />
            AI-Powered Non-Human Identity Security
          </div>
          <h1 className="font-display mt-6 text-4xl font-semibold tracking-tight text-ink-50 sm:text-5xl">
            Find the credentials attackers{" "}
            <span className="bg-gradient-to-r from-accent-400 to-glow-500 bg-clip-text text-transparent">
              already found.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-ink-400 sm:text-lg">
            NHI Guardian, powered by Sidibe Enterprises, is an AI-powered Non-Human Identity
            Security Platform that helps security and IAM teams identify risky service accounts,
            API keys, tokens, secrets, and machine credentials — with risk scoring, remediation
            guidance, and executive reporting built in.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/dashboard">
              <Button className="px-6 py-2.5 text-sm">
                View Live Dashboard <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/ai-assistant">
              <Button variant="secondary" className="px-6 py-2.5 text-sm">
                <Bot className="h-4 w-4" /> Ask the AI Analyst
              </Button>
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-8 font-mono font-tabular">
            {[
              { label: "Identities Monitored", value: identities.length },
              { label: "Critical Findings", value: critical },
              { label: "Avg. Risk Score", value: avgScore },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-semibold text-ink-50">
                  <Counter value={stat.value} />
                </p>
                <p className="mt-0.5 max-w-[9rem] font-sans text-[11px] leading-tight text-ink-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative">
          <div className="pointer-events-none absolute inset-0 scale-125 bg-[radial-gradient(circle_at_50%_40%,rgba(91,110,245,0.25),transparent_60%)]" />
          <FloatingArt className="relative mx-auto w-full max-w-md">
            <Image
              src="/neon-shield-hero.png"
              alt="A glowing 3D shield representing NHI Guardian's identity protection"
              width={900}
              height={900}
              priority
              className="w-full drop-shadow-[0_20px_60px_rgba(91,110,245,0.35)]"
            />
            <Card className="shadow-panel-hover absolute -bottom-4 left-2 flex items-center gap-3 px-4 py-3 sm:left-8">
              <div className="rounded-lg border border-critical-500/30 bg-critical-950 p-2 text-critical-400">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <p className="font-mono text-lg font-semibold leading-none text-ink-50 font-tabular">
                  <Counter value={critical} /> / {identities.length}
                </p>
                <p className="mt-1 text-[11px] text-ink-500">identities need attention now</p>
              </div>
            </Card>
          </FloatingArt>
        </Reveal>
      </section>

      {/* Capabilities */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <Reveal>
          <h2 className="font-display text-center text-2xl font-semibold text-ink-100 sm:text-3xl">
            One platform for the full non-human identity lifecycle
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-ink-500">
            Purpose-built for security, IAM, cloud, and DevSecOps teams managing sprawling machine
            identities across cloud, CI/CD, and SaaS.
          </p>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-5 lg:grid-cols-3">
          <RevealItem className="lg:col-span-2">
            <Card className="group relative flex h-full min-h-[220px] flex-col justify-end overflow-hidden p-6">
              <Image
                src="/security-api-overlay.jpg"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover opacity-30 transition-opacity duration-300 group-hover:opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent" />
              <div className="relative">
                <div className="mb-3 inline-flex rounded-lg border border-accent-800/40 bg-accent-500/10 p-2.5 text-accent-400">
                  <KeyRound className="h-5 w-5" />
                </div>
                <h3 className="font-display font-medium text-ink-100">Identity Inventory</h3>
                <p className="mt-1.5 max-w-md text-sm text-ink-400">
                  A single source of truth for every API key, service account, OAuth token, SSH
                  key, and machine certificate across your estate.
                </p>
              </div>
            </Card>
          </RevealItem>

          <RevealItem>
            <Card className="h-full p-6 transition-all duration-200 hover:-translate-y-1 hover:border-ink-600">
              <div className="mb-3 inline-flex rounded-lg border border-accent-800/40 bg-accent-500/10 p-2.5 text-accent-400">
                <Radar className="h-5 w-5" />
              </div>
              <h3 className="font-display font-medium text-ink-100">Rule-Based Risk Scoring</h3>
              <p className="mt-1.5 text-sm text-ink-500">
                Every identity is scored against 9 real-world risk factors — rotation, ownership,
                privilege, exposure, and more.
              </p>
            </Card>
          </RevealItem>

          <RevealItem>
            <Card className="h-full p-6 transition-all duration-200 hover:-translate-y-1 hover:border-ink-600">
              <div className="mb-3 inline-flex rounded-lg border border-accent-800/40 bg-accent-500/10 p-2.5 text-accent-400">
                <Bot className="h-5 w-5" />
              </div>
              <h3 className="font-display font-medium text-ink-100">AI Security Analyst</h3>
              <p className="mt-1.5 text-sm text-ink-500">
                Ask natural-language questions and get instant explanations, prioritization, and
                remediation plans.
              </p>
            </Card>
          </RevealItem>

          <RevealItem>
            <Card className="h-full p-6 transition-all duration-200 hover:-translate-y-1 hover:border-ink-600">
              <div className="mb-3 inline-flex rounded-lg border border-accent-800/40 bg-accent-500/10 p-2.5 text-accent-400">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="font-display font-medium text-ink-100">Executive Reporting</h3>
              <p className="mt-1.5 text-sm text-ink-500">
                Generate board-ready risk summaries with key metrics, top findings, and a
                remediation roadmap in one click.
              </p>
            </Card>
          </RevealItem>

          <RevealItem>
            <Card className="h-full p-6 transition-all duration-200 hover:-translate-y-1 hover:border-ink-600">
              <div className="mb-3 inline-flex rounded-lg border border-accent-800/40 bg-accent-500/10 p-2.5 text-accent-400">
                <GitBranch className="h-5 w-5" />
              </div>
              <h3 className="font-display font-medium text-ink-100">Remediation Guidance</h3>
              <p className="mt-1.5 text-sm text-ink-500">
                Every risky identity ships with concrete next steps — rotate, re-scope, vault,
                document, or disable.
              </p>
            </Card>
          </RevealItem>

          <RevealItem className="lg:col-span-2">
            <Card className="grid h-full grid-cols-1 items-center gap-4 p-6 sm:grid-cols-[1fr_240px]">
              <div>
                <div className="mb-3 inline-flex rounded-lg border border-accent-800/40 bg-accent-500/10 p-2.5 text-accent-400">
                  <GitBranch className="h-5 w-5" />
                </div>
                <h3 className="font-display font-medium text-ink-100">
                  Multi-Cloud & CI/CD Coverage
                </h3>
                <p className="mt-1.5 max-w-sm text-sm text-ink-500">
                  AWS, Azure, GitHub Actions, Jenkins, Kubernetes, Salesforce, ServiceNow,
                  PostgreSQL, and internal APIs — monitored from one console.
                </p>
              </div>
              <CoverageGlobe />
            </Card>
          </RevealItem>
        </RevealGroup>
      </section>

      {/* Security Tools teaser */}
      <section className="relative z-10 border-y border-ink-900 bg-ink-950/50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-gold-500">
              Beyond identity governance
            </p>
            <h2 className="font-display mt-2 text-center text-2xl font-semibold text-ink-100 sm:text-3xl">
              Free security tools from Sidibe Enterprises
            </h2>
          </Reveal>
          <RevealGroup className="mt-10 grid gap-5 md:grid-cols-2">
            <RevealItem>
              <Link href="/tools/phishing-scanner">
                <Card className="group h-full p-6 transition-all duration-200 hover:-translate-y-1 hover:border-critical-500/40">
                  <div className="mb-3 inline-flex rounded-lg border border-critical-500/30 bg-critical-950 p-2.5 text-critical-400">
                    <Fish className="h-5 w-5" />
                  </div>
                  <h3 className="font-display flex items-center gap-2 font-medium text-ink-100">
                    Phishing & Malware Scanner
                    <ArrowRight className="h-4 w-4 -translate-x-1 text-ink-600 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                  </h3>
                  <p className="mt-1.5 text-sm text-ink-500">
                    Paste a suspicious link, email, or message and get an instant rule-based
                    threat assessment with the indicators that triggered it.
                  </p>
                </Card>
              </Link>
            </RevealItem>
            <RevealItem>
              <Link href="/tools/resume-checker">
                <Card className="group h-full p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent-600/50">
                  <div className="mb-3 inline-flex rounded-lg border border-accent-800/40 bg-accent-500/10 p-2.5 text-accent-400">
                    <FileSearch className="h-5 w-5" />
                  </div>
                  <h3 className="font-display flex items-center gap-2 font-medium text-ink-100">
                    ATS Resume Checker
                    <ArrowRight className="h-4 w-4 -translate-x-1 text-ink-600 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                  </h3>
                  <p className="mt-1.5 text-sm text-ink-500">
                    Paste your resume and get an ATS-readiness score with formatting, keyword, and
                    content recommendations.
                  </p>
                </Card>
              </Link>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold text-ink-100">
            See your non-human identity risk in under a minute.
          </h2>
          <p className="mt-2 text-sm text-ink-500">
            Explore the live dashboard, populated with realistic sample data — no setup required.
          </p>
          <div className="mt-6">
            <Link href="/dashboard">
              <Button className="px-6 py-2.5 text-sm">
                Launch Dashboard <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Reveal>
      </section>

      <footer className="relative z-10 border-t border-ink-900 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 text-center">
          <div className="flex items-center gap-2 opacity-70 grayscale">
            <Image
              src="/lock-badge.png"
              alt=""
              width={22}
              height={22}
              className="hue-rotate-[150deg] saturate-150"
            />
            <Image
              src="/cyber-security-badge.png"
              alt=""
              width={22}
              height={13}
              className="hue-rotate-[150deg] saturate-150"
            />
          </div>
          <p className="text-xs text-ink-600">
            NHI Guardian — Powered by Sidibe Enterprises. A portfolio project demonstrating
            AI-assisted cybersecurity program management.
          </p>
        </div>
      </footer>
    </div>
  );
}
