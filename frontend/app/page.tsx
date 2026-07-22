"use client";

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
import { DuotoneImage } from "@/components/ui/DuotoneImage";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { FloatingArt } from "@/components/landing/FloatingArt";
import { Spin } from "@/components/motion/Spin";
import { CoverageGlobe } from "@/components/landing/CoverageGlobe";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageToggle } from "@/components/layout/LanguageToggle";

export default function Home() {
  const { dict } = useLanguage();
  const assessments = assessAll(identities);
  const critical = assessments.filter((a) => a.severity === "Critical").length;
  const avgScore = Math.round(
    assessments.reduce((sum, a) => sum + a.score, 0) / assessments.length
  );

  return (
    <div className="texture-grid flex-1">
      {/* Nav */}
      <header className="relative z-10 border-b border-ink-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 sm:py-5">
          <div className="flex items-center gap-3 sm:gap-4">
            <Image
              src="/brand/logo-mark.svg"
              alt="NHI Guardian"
              width={90}
              height={90}
              className="h-[30px] w-[30px] xl:h-[90px] xl:w-[90px]"
            />
            <div className="leading-tight">
              <p className="font-display text-sm font-semibold tracking-tight text-ink-50 xl:text-4xl">
                NHI Guardian
              </p>
              <p className="text-[10px] uppercase tracking-wider text-gold-500 xl:text-sm">
                {dict.nav.poweredBy}
              </p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-ink-400 md:flex">
            <Link href="/dashboard" className="hover:text-ink-100 transition-colors">
              {dict.nav.dashboard}
            </Link>
            <Link href="/threat-map" className="hover:text-ink-100 transition-colors">
              {dict.nav.threatMap}
            </Link>
            <Link href="/tools" className="hover:text-ink-100 transition-colors">
              {dict.nav.toolsHub}
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageToggle />
            <Link href="/dashboard">
              <Button variant="secondary" className="text-sm">
                {dict.nav.launchDashboard} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 pt-16 pb-20 md:grid-cols-2 md:items-center md:pt-24">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-800/50 bg-accent-500/10 px-4 py-1.5 text-xs font-medium text-accent-ink">
            <Radar className="h-3.5 w-3.5" />
            {dict.landing.eyebrow}
          </div>
          <h1 className="font-display mt-6 text-4xl font-semibold tracking-tight text-ink-50 sm:text-5xl">
            {dict.landing.headline1}
            <span className="bg-gradient-to-r from-accent-400 to-glow-500 bg-clip-text text-transparent">
              {dict.landing.headline2}
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-ink-400 sm:text-lg">{dict.landing.subcopy}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/dashboard">
              <Button className="px-6 py-2.5 text-sm">
                {dict.landing.viewLiveDashboard} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/ai-assistant">
              <Button variant="secondary" className="px-6 py-2.5 text-sm">
                <Bot className="h-4 w-4" /> {dict.nav.askAiAnalyst}
              </Button>
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-8 font-mono font-tabular">
            {[
              { key: "identities", label: dict.landing.statIdentities, value: identities.length },
              { key: "critical", label: dict.landing.statCritical, value: critical },
              { key: "avgScore", label: dict.landing.statAvgScore, value: avgScore },
            ].map((stat) => (
              <div key={stat.key}>
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
            <Spin duration={18}>
              <Image
                src="/neon-shield-hero.webp"
                alt="A glowing 3D shield representing NHI Guardian's identity protection"
                width={900}
                height={900}
                priority
                className="w-full drop-shadow-[0_20px_60px_rgba(91,110,245,0.35)] [mask-image:radial-gradient(circle_at_center,black_58%,transparent_88%)] [-webkit-mask-image:radial-gradient(circle_at_center,black_58%,transparent_88%)]"
              />
            </Spin>
            <Card className="shadow-panel-hover absolute -bottom-4 left-2 flex items-center gap-3 px-4 py-3 sm:left-8">
              <div className="rounded-lg border border-critical-500/30 bg-critical-950 p-2 text-critical-400">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <p className="font-mono text-lg font-semibold leading-none text-ink-50 font-tabular">
                  <Counter value={critical} /> / {identities.length}
                </p>
                <p className="mt-1 text-[11px] text-ink-500">{dict.landing.heroAttention}</p>
              </div>
            </Card>
          </FloatingArt>
        </Reveal>
      </section>

      {/* Capabilities */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <h2 className="font-display text-center text-2xl font-semibold text-ink-100 sm:text-3xl">
            {dict.landing.capabilitiesTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-ink-500">
            {dict.landing.capabilitiesSubtitle}
          </p>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-5 lg:grid-cols-3">
          <RevealItem className="lg:col-span-2">
            <Card className="group relative flex h-full min-h-[220px] flex-col justify-end overflow-hidden p-6">
              <DuotoneImage
                src="/security-api-overlay.webp"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 800px"
                className="absolute inset-0"
                imgClassName="object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                intensity="medium"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08070c] via-[#08070c]/75 to-transparent" />
              <div className="relative">
                <div className="mb-3 inline-flex rounded-lg border border-accent-800/40 bg-accent-500/10 p-2.5 text-accent-400">
                  <KeyRound className="h-5 w-5" />
                </div>
                <h3 className="font-display font-medium text-white">
                  {dict.landing.featureInventory.title}
                </h3>
                <p className="mt-1.5 max-w-md text-sm text-slate-300">
                  {dict.landing.featureInventory.desc}
                </p>
              </div>
            </Card>
          </RevealItem>

          <RevealItem>
            <Card className="h-full p-6 transition-all duration-200 hover:-translate-y-1 hover:border-ink-600">
              <div className="mb-3 inline-flex rounded-lg border border-accent-800/40 bg-accent-500/10 p-2.5 text-accent-400">
                <Radar className="h-5 w-5" />
              </div>
              <h3 className="font-display font-medium text-ink-100">
                {dict.landing.featureScoring.title}
              </h3>
              <p className="mt-1.5 text-sm text-ink-500">{dict.landing.featureScoring.desc}</p>
            </Card>
          </RevealItem>

          <RevealItem>
            <Card className="h-full p-6 transition-all duration-200 hover:-translate-y-1 hover:border-ink-600">
              <div className="mb-3 inline-flex rounded-lg border border-accent-800/40 bg-accent-500/10 p-2.5 text-accent-400">
                <Bot className="h-5 w-5" />
              </div>
              <h3 className="font-display font-medium text-ink-100">
                {dict.landing.featureAnalyst.title}
              </h3>
              <p className="mt-1.5 text-sm text-ink-500">{dict.landing.featureAnalyst.desc}</p>
            </Card>
          </RevealItem>

          <RevealItem>
            <Card className="h-full p-6 transition-all duration-200 hover:-translate-y-1 hover:border-ink-600">
              <div className="mb-3 inline-flex rounded-lg border border-accent-800/40 bg-accent-500/10 p-2.5 text-accent-400">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="font-display font-medium text-ink-100">
                {dict.landing.featureReporting.title}
              </h3>
              <p className="mt-1.5 text-sm text-ink-500">{dict.landing.featureReporting.desc}</p>
            </Card>
          </RevealItem>

          <RevealItem>
            <Card className="h-full p-6 transition-all duration-200 hover:-translate-y-1 hover:border-ink-600">
              <div className="mb-3 inline-flex rounded-lg border border-accent-800/40 bg-accent-500/10 p-2.5 text-accent-400">
                <GitBranch className="h-5 w-5" />
              </div>
              <h3 className="font-display font-medium text-ink-100">
                {dict.landing.featureRemediation.title}
              </h3>
              <p className="mt-1.5 text-sm text-ink-500">{dict.landing.featureRemediation.desc}</p>
            </Card>
          </RevealItem>

          <RevealItem className="lg:col-span-2">
            <Card className="grid h-full grid-cols-1 items-center gap-4 p-6 sm:grid-cols-[1fr_240px]">
              <div>
                <div className="mb-3 inline-flex rounded-lg border border-accent-800/40 bg-accent-500/10 p-2.5 text-accent-400">
                  <GitBranch className="h-5 w-5" />
                </div>
                <h3 className="font-display font-medium text-ink-100">
                  {dict.landing.featureMultiCloud.title}
                </h3>
                <p className="mt-1.5 max-w-sm text-sm text-ink-500">
                  {dict.landing.featureMultiCloud.desc}
                </p>
              </div>
              <CoverageGlobe />
            </Card>
          </RevealItem>
        </RevealGroup>
      </section>

      {/* Security Tools teaser */}
      <section className="relative z-10 border-y border-ink-900 bg-ink-950/50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-gold-500">
              {dict.landing.toolsEyebrow}
            </p>
            <h2 className="font-display mt-2 text-center text-2xl font-semibold text-ink-100 sm:text-3xl">
              {dict.landing.toolsTitle}
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
                    {dict.landing.phishingCard.title}
                    <ArrowRight className="h-4 w-4 -translate-x-1 text-ink-600 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                  </h3>
                  <p className="mt-1.5 text-sm text-ink-500">{dict.landing.phishingCard.desc}</p>
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
                    {dict.landing.resumeCard.title}
                    <ArrowRight className="h-4 w-4 -translate-x-1 text-ink-600 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                  </h3>
                  <p className="mt-1.5 text-sm text-ink-500">{dict.landing.resumeCard.desc}</p>
                </Card>
              </Link>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 py-16 text-center">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold text-ink-100">{dict.landing.ctaTitle}</h2>
          <p className="mt-2 text-sm text-ink-500">{dict.landing.ctaSubtitle}</p>
          <div className="mt-6">
            <Link href="/dashboard">
              <Button className="px-6 py-2.5 text-sm">
                {dict.nav.launchDashboard} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Reveal>
      </section>

      <footer className="relative z-10 border-t border-ink-900 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 text-center">
          <div className="flex items-center gap-2 opacity-70 grayscale">
            <Image
              src="/lock-badge.webp"
              alt=""
              width={22}
              height={22}
              className="hue-rotate-[150deg] saturate-150"
            />
            <Image
              src="/cyber-security-badge.webp"
              alt=""
              width={22}
              height={13}
              className="hue-rotate-[150deg] saturate-150"
            />
          </div>
          <p className="text-xs text-ink-600">{dict.landing.footer}</p>
        </div>
      </footer>
    </div>
  );
}
