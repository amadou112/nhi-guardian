// Static UI copy in English and French. Dynamically generated content
// (AI analyst answers, risk finding text, phishing indicators, resume
// findings, executive report prose) is produced by the rule engines in
// lib/ and is not translated here — see README for the rationale.

export type Lang = "en" | "fr";

export type ToolKey =
  | "phishing"
  | "resume"
  | "cspm"
  | "iam"
  | "vam"
  | "sast"
  | "dlp"
  | "container"
  | "threatIntel"
  | "siem"
  | "edr"
  | "xdr"
  | "ndr"
  | "pentest"
  | "dfir"
  | "sase"
  | "encryption"
  | "cryptoTool";

export const TOOL_KEYS: ToolKey[] = [
  "phishing",
  "resume",
  "cspm",
  "iam",
  "vam",
  "sast",
  "dlp",
  "container",
  "threatIntel",
  "cryptoTool",
  "siem",
  "edr",
  "xdr",
  "ndr",
  "pentest",
  "dfir",
  "sase",
  "encryption",
];

export interface CapabilityToolCopy {
  title: string;
  subtitle: string;
  description: string;
  capabilities: string[];
  kpis: { label: string; value: string }[];
  tableTitle: string;
  tableCols: string[];
  tableRows: { cells: string[]; tone: "critical" | "high" | "medium" | "low" | "accent" | "ink" }[];
  tieIn: string;
}

export interface Dictionary {
  nav: {
    securityProgram: string;
    securityTools: string;
    toolsHub: string;
    dashboard: string;
    identities: string;
    aiAnalyst: string;
    reports: string;
    playbook: string;
    threatMap: string;
    backToOverview: string;
    launchDashboard: string;
    askAiAnalyst: string;
    poweredBy: string;
    toolLabels: Record<ToolKey, string>;
    short: {
      dashboard: string;
      identities: string;
      aiAnalyst: string;
      reports: string;
      playbook: string;
      threatMap: string;
      tools: string;
    };
  };
  landing: {
    eyebrow: string;
    headline1: string;
    headline2: string;
    subcopy: string;
    viewLiveDashboard: string;
    statIdentities: string;
    statCritical: string;
    statAvgScore: string;
    heroAttention: string;
    capabilitiesTitle: string;
    capabilitiesSubtitle: string;
    featureInventory: { title: string; desc: string };
    featureScoring: { title: string; desc: string };
    featureAnalyst: { title: string; desc: string };
    featureReporting: { title: string; desc: string };
    featureRemediation: { title: string; desc: string };
    featureMultiCloud: { title: string; desc: string };
    toolsEyebrow: string;
    toolsTitle: string;
    phishingCard: { title: string; desc: string };
    resumeCard: { title: string; desc: string };
    ctaTitle: string;
    ctaSubtitle: string;
    footer: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    banner: (total: number) => string;
    kpiTotal: string;
    kpiCritical: string;
    kpiNoExpiration: string;
    kpiOverprivileged: string;
    kpiNoRotation: string;
    kpiOrphaned: string;
    kpiCloudExposure: string;
    kpiHealthy: string;
    riskDistribution: string;
    identitiesBySystem: string;
    highestRisk: string;
    viewFullInventory: string;
  };
  identities: {
    title: string;
    subtitle: (total: number) => string;
    searchPlaceholder: string;
    allSeverities: string;
    allTypes: string;
    showing: (shown: number, total: number) => string;
    colIdentity: string;
    colSystem: string;
    colEnvironment: string;
    colOwner: string;
    colLastUsed: string;
    colPermission: string;
    colRotation: string;
    colRisk: string;
    colStatus: string;
    unassigned: string;
    noMatches: string;
    clearFilters: string;
  };
  identityDetail: {
    backToInventory: string;
    riskScore: string;
    identityDetails: string;
    riskFindings: (n: number) => string;
    recommendedRemediation: string;
    noRiskFactors: string;
    noRemediationNeeded: string;
    metaOwner: string;
    metaSystem: string;
    metaEnvironment: string;
    metaPermission: string;
    metaCreated: string;
    metaLastUsed: string;
    metaHasExpiration: string;
    metaShared: string;
    metaDocumented: string;
    metaSecretExposed: string;
    yes: string;
    no: string;
  };
  aiAssistant: {
    title: string;
    subtitle: string;
    intro: string;
    suggested: string[];
    placeholder: string;
    analyzing: string;
  };
  reports: {
    title: string;
    subtitle: string;
    generated: string;
    heading: string;
    exportPrint: string;
    riskSummary: string;
    keyMetrics: string;
    top5: string;
    remediationRoadmap: string;
    businessImpact: string;
    nextActions: string;
  };
  phishing: {
    title: string;
    subtitle: string;
    heroTitle: string;
    heroDesc: string;
    placeholder: string;
    tryExample: string;
    scanButton: string;
    verdict: string;
    indicatorsFound: (n: number) => string;
    recommendedActions: string;
    noIndicators: string;
    whatChecks: string;
    checks: string[];
    verdictLabels: Record<"Malicious" | "Suspicious" | "Safe", string>;
  };
  resume: {
    title: string;
    subtitle: string;
    heroTitle: string;
    heroDesc: string;
    resumeTextLabel: string;
    resumeTextPlaceholder: string;
    keywordsLabel: string;
    keywordsPlaceholder: string;
    checkButton: string;
    atsScore: string;
    words: string;
    bulletPoints: string;
    keywordsMatched: string;
    findings: (n: number) => string;
    noFindings: string;
    recommendations: string;
    bandLabels: Record<"Excellent" | "Good" | "Needs Work" | "Poor", string>;
  };
  playbook: {
    title: string;
    subtitle: string;
    heroEyebrow: string;
    heroTitle: string;
    heroDesc: string;
    statDuration: string;
    statDurationValue: string;
    statPhases: string;
    statPhasesValue: string;
    statRiskReduction: string;
    statRiskReductionValue: string;
    statSystems: string;
    statSystemsValue: string;
    timelineTitle: string;
    timelineSubtitle: string;
    goalLabel: string;
    activitiesLabel: string;
    deliverablesLabel: string;
    metricLabel: string;
    yourProgress: string;
    resetProgress: string;
    stepsComplete: (done: number, total: number) => string;
    expandPhase: string;
    collapsePhase: string;
    jumpToPhase: string;
    phases: {
      key: string;
      number: string;
      timeframe: string;
      title: string;
      goal: string;
      activities: string[];
      deliverables: string[];
      metric: string;
    }[];
    raciTitle: string;
    raciSubtitle: string;
    raciColRole: string;
    raciColResponsibility: string;
    raciRoles: { role: string; responsibility: string }[];
    ctaTitle: string;
    ctaDesc: string;
    ctaDashboard: string;
    ctaReports: string;
  };
  threatMap: {
    title: string;
    subtitle: string;
    heroDesc: string;
    liveLabel: string;
    kpiAttacksToday: string;
    kpiActiveRegions: string;
    kpiBlockedRate: string;
    kpiTopIdentityType: string;
    liveFeedTitle: string;
    colTime: string;
    colSource: string;
    colTarget: string;
    colAttackType: string;
    colIdentityType: string;
    colSeverity: string;
    colStatus: string;
    statusLabels: Record<"Blocked" | "Mitigated" | "Investigating", string>;
    mapLegendSource: string;
    mapLegendTarget: string;
    simulatedNote: string;
  };
  tools: {
    hub: {
      title: string;
      subtitle: string;
      interactiveLabel: string;
      capabilityLabel: string;
      tryItBadge: string;
      overviewBadge: string;
      cards: Record<ToolKey, { title: string; description: string }>;
    };
    common: {
      tryExample: string;
      scanButton: string;
      analyzeButton: string;
      lookupButton: string;
      score: string;
      verdict: string;
      findingsFound: (n: number) => string;
      recommendedActions: string;
      noFindings: string;
      capabilitiesLabel: string;
      dashboardLabel: string;
      tieInLabel: string;
      mockLabel: string;
    };
    cspm: {
      title: string;
      subtitle: string;
      heroDesc: string;
      placeholder: string;
      examples: string[];
      verdictLabels: Record<"Critical" | "Warning" | "Compliant", string>;
    };
    iam: {
      title: string;
      subtitle: string;
      heroDesc: string;
      placeholder: string;
      examples: string[];
      verdictLabels: Record<"High Risk" | "Needs Review" | "Least Privilege", string>;
    };
    vam: {
      title: string;
      subtitle: string;
      heroDesc: string;
      placeholder: string;
      examples: string[];
      scannedLabel: (n: number) => string;
      matchesFound: (n: number) => string;
      noMatches: string;
      colComponent: string;
      colVersion: string;
      colCve: string;
      colSeverity: string;
    };
    sast: {
      title: string;
      subtitle: string;
      heroDesc: string;
      placeholder: string;
      examples: string[];
      verdictLabels: Record<"Critical" | "Needs Attention" | "Clean", string>;
      lineLabel: (n: number) => string;
    };
    dlp: {
      title: string;
      subtitle: string;
      heroDesc: string;
      placeholder: string;
      examples: string[];
      categoriesFound: (n: number) => string;
      noMatches: string;
      colCategory: string;
      colCount: string;
      colSample: string;
      falsePositiveNote: string;
    };
    container: {
      title: string;
      subtitle: string;
      heroDesc: string;
      placeholder: string;
      examples: string[];
      verdictLabels: Record<"Critical" | "Needs Hardening" | "Hardened", string>;
    };
    threatIntel: {
      title: string;
      subtitle: string;
      heroDesc: string;
      placeholder: string;
      examples: string[];
      verdictLabels: Record<"Malicious" | "Suspicious" | "Clean" | "Unrecognized", string>;
      typeLabel: string;
      confidenceLabel: string;
      tagsLabel: string;
      simulatedNote: string;
    };
    cryptoTool: {
      title: string;
      subtitle: string;
      heroDesc: string;
      encryptTab: string;
      decryptTab: string;
      passphraseLabel: string;
      passphrasePlaceholder: string;
      inputLabelEncrypt: string;
      inputPlaceholderEncrypt: string;
      inputLabelDecrypt: string;
      inputPlaceholderDecrypt: string;
      encryptButton: string;
      decryptButton: string;
      outputLabel: string;
      copyButton: string;
      copiedLabel: string;
      errorDecrypt: string;
      errorPassphrase: string;
      disclaimer: string;
      algorithmNote: string;
    };
    siem: CapabilityToolCopy;
    edr: CapabilityToolCopy;
    xdr: CapabilityToolCopy;
    ndr: CapabilityToolCopy;
    pentest: CapabilityToolCopy;
    dfir: CapabilityToolCopy;
    sase: CapabilityToolCopy;
    encryption: CapabilityToolCopy;
  };
  severity: Record<"Critical" | "High" | "Medium" | "Low", string>;
  status: Record<"Active" | "Inactive" | "Suspended" | "Pending Review", string>;
  rotation: Record<"Rotated Recently" | "Overdue" | "Never Rotated", string>;
  common: {
    searchIdentities: string;
    notifications: string;
    signedInAs: string;
    systemOperational: string;
  };
}

const en: Dictionary = {
  nav: {
    securityProgram: "Security Program",
    securityTools: "Security Tools",
    toolsHub: "All Security Tools",
    dashboard: "Dashboard",
    identities: "Identity Inventory",
    aiAnalyst: "AI Security Analyst",
    reports: "Executive Reports",
    playbook: "Implementation Playbook",
    threatMap: "Global Attack Map",
    backToOverview: "Back to overview",
    launchDashboard: "Launch Dashboard",
    askAiAnalyst: "Ask the AI Analyst",
    poweredBy: "Powered by Sidibe Enterprises",
    toolLabels: {
      phishing: "Phishing & Malware Scanner",
      resume: "ATS Resume Checker",
      cspm: "Cloud Security Posture Management",
      iam: "IAM & Zero-Trust Policy Analyzer",
      vam: "Vulnerability Assessment & Management",
      sast: "Web App Security Testing (SAST)",
      dlp: "Data Loss Prevention Scanner",
      container: "Container & Kubernetes Security",
      threatIntel: "Threat Intelligence Lookup",
      cryptoTool: "Data Encryption Tool",
      siem: "Security Information & Event Management",
      edr: "Endpoint Detection & Response",
      xdr: "Extended Detection & Response",
      ndr: "Network Detection & Response",
      pentest: "Penetration Testing Frameworks",
      dfir: "Digital Forensics & Incident Response",
      sase: "SASE & Security Service Edge",
      encryption: "Encryption & Key Management",
    },
    short: {
      dashboard: "Home",
      identities: "Identities",
      aiAnalyst: "AI",
      reports: "Reports",
      playbook: "Playbook",
      threatMap: "Map",
      tools: "Tools",
    },
  },
  landing: {
    eyebrow: "AI-Powered Non-Human Identity Security",
    headline1: "Find the credentials attackers ",
    headline2: "already found.",
    subcopy:
      "NHI Guardian, powered by Sidibe Enterprises, is an AI-powered Non-Human Identity Security Platform that helps security and IAM teams identify risky service accounts, API keys, tokens, secrets, and machine credentials — with risk scoring, remediation guidance, and executive reporting built in.",
    viewLiveDashboard: "View Live Dashboard",
    statIdentities: "Identities Monitored",
    statCritical: "Critical Findings",
    statAvgScore: "Avg. Risk Score",
    heroAttention: "identities need attention now",
    capabilitiesTitle: "One platform for the full non-human identity lifecycle",
    capabilitiesSubtitle:
      "Purpose-built for security, IAM, cloud, and DevSecOps teams managing sprawling machine identities across cloud, CI/CD, and SaaS.",
    featureInventory: {
      title: "Identity Inventory",
      desc: "A single source of truth for every API key, service account, OAuth token, SSH key, and machine certificate across your estate.",
    },
    featureScoring: {
      title: "Rule-Based Risk Scoring",
      desc: "Every identity is scored against 9 real-world risk factors — rotation, ownership, privilege, exposure, and more.",
    },
    featureAnalyst: {
      title: "AI Security Analyst",
      desc: "Ask natural-language questions and get instant explanations, prioritization, and remediation plans.",
    },
    featureReporting: {
      title: "Executive Reporting",
      desc: "Generate board-ready risk summaries with key metrics, top findings, and a remediation roadmap in one click.",
    },
    featureRemediation: {
      title: "Remediation Guidance",
      desc: "Every risky identity ships with concrete next steps — rotate, re-scope, vault, document, or disable.",
    },
    featureMultiCloud: {
      title: "Multi-Cloud & CI/CD Coverage",
      desc: "AWS, Azure, GitHub Actions, Jenkins, Kubernetes, Salesforce, ServiceNow, PostgreSQL, and internal APIs — monitored from one console.",
    },
    toolsEyebrow: "Beyond identity governance",
    toolsTitle: "Free security tools from Sidibe Enterprises",
    phishingCard: {
      title: "Phishing & Malware Scanner",
      desc: "Paste a suspicious link, email, or message and get an instant rule-based threat assessment with the indicators that triggered it.",
    },
    resumeCard: {
      title: "ATS Resume Checker",
      desc: "Paste your resume and get an ATS-readiness score with formatting, keyword, and content recommendations.",
    },
    ctaTitle: "See your non-human identity risk in under a minute.",
    ctaSubtitle: "Explore the live dashboard, populated with realistic sample data — no setup required.",
    footer:
      "NHI Guardian — Powered by Sidibe Enterprises. A portfolio project demonstrating AI-assisted cybersecurity program management.",
  },
  dashboard: {
    title: "Security Dashboard",
    subtitle: "Live risk posture across all connected non-human identities",
    banner: (total) =>
      `Monitoring ${total} non-human identities across 9 connected systems, from cloud access keys to CI/CD secrets.`,
    kpiTotal: "Total Identities",
    kpiCritical: "Critical Risks",
    kpiNoExpiration: "No Expiration Set",
    kpiOverprivileged: "Overprivileged",
    kpiNoRotation: "Secrets Without Rotation",
    kpiOrphaned: "Orphaned Identities",
    kpiCloudExposure: "Cloud/Service Exposure",
    kpiHealthy: "Healthy (Low Risk)",
    riskDistribution: "Risk Distribution",
    identitiesBySystem: "Identities by Connected System",
    highestRisk: "Highest-Risk Identities",
    viewFullInventory: "View full inventory",
  },
  identities: {
    title: "Identity Inventory",
    subtitle: (total) => `${total} non-human identities across 9 connected systems`,
    searchPlaceholder: "Search by identity name or owner…",
    allSeverities: "All Severities",
    allTypes: "All Types",
    showing: (shown, total) => `Showing ${shown} of ${total} identities`,
    colIdentity: "Identity",
    colSystem: "System",
    colEnvironment: "Environment",
    colOwner: "Owner",
    colLastUsed: "Last Used",
    colPermission: "Permission",
    colRotation: "Rotation",
    colRisk: "Risk",
    colStatus: "Status",
    unassigned: "Unassigned",
    noMatches: "No identities match the current filters.",
    clearFilters: "Clear all filters",
  },
  identityDetail: {
    backToInventory: "Back to inventory",
    riskScore: "Risk Score",
    identityDetails: "Identity Details",
    riskFindings: (n) => `Risk Findings (${n})`,
    recommendedRemediation: "Recommended Remediation",
    noRiskFactors: "No risk factors detected.",
    noRemediationNeeded: "No remediation required — this identity follows best practices.",
    metaOwner: "Owner",
    metaSystem: "System",
    metaEnvironment: "Environment",
    metaPermission: "Permission Level",
    metaCreated: "Created",
    metaLastUsed: "Last Used",
    metaHasExpiration: "Has Expiration",
    metaShared: "Shared Account",
    metaDocumented: "Documented",
    metaSecretExposed: "Secret Exposed",
    yes: "Yes",
    no: "No",
  },
  aiAssistant: {
    title: "AI Security Analyst",
    subtitle: "Local mock AI mode — swap in the OpenAI-backed /analyze endpoint for live inference",
    intro:
      "Hi, I'm the NHI Guardian AI Security Analyst (running in local mock mode). Ask me about your highest-risk identities, request an executive summary, or ask for a remediation plan.",
    suggested: [
      "Which identities are highest risk?",
      "Explain why aws-root-automation-key is critical.",
      "Generate a remediation plan.",
      "Write an executive risk summary.",
      "What should we fix first?",
      "Which identities are stale or orphaned?",
    ],
    placeholder: "Ask the AI Security Analyst about your non-human identities…",
    analyzing: "Analyzing identity inventory…",
  },
  reports: {
    title: "Executive Reports",
    subtitle: "Board-ready risk summary, generated on demand",
    generated: "Generated",
    heading: "Non-Human Identity Risk — Executive Summary",
    exportPrint: "Export / Print Report",
    riskSummary: "Risk Summary",
    keyMetrics: "Key Metrics",
    top5: "Top 5 Critical Findings",
    remediationRoadmap: "Remediation Roadmap",
    businessImpact: "Business Impact",
    nextActions: "Recommended Next Actions",
  },
  phishing: {
    title: "Phishing & Malware Scanner",
    subtitle: "Rule-based threat indicator analysis — paste a link, email, or message",
    heroTitle: "Check a suspicious link or message before you click",
    heroDesc:
      "Paste the full text of a suspicious email, text message, or a link below. The scanner checks it against known phishing and malware indicators — lookalike domains, IP-based links, urgency language, credential requests, and dangerous attachment types — and explains exactly what it found.",
    placeholder: "Paste a URL, email body, or text message here…",
    tryExample: "Try example",
    scanButton: "Scan for Threats",
    verdict: "Verdict",
    indicatorsFound: (n) => `Indicators Found (${n})`,
    recommendedActions: "Recommended Actions",
    noIndicators: "No known threat indicators detected.",
    whatChecks: "What this scanner checks",
    checks: [
      "Raw IP addresses and punycode/homograph domains",
      "URL shorteners and suspicious top-level domains",
      "Brand impersonation in lookalike domains",
      "Urgency language and pressure tactics",
      "Requests for passwords, codes, or financial details",
      "Dangerous executable attachment types",
    ],
    verdictLabels: { Malicious: "Malicious", Suspicious: "Suspicious", Safe: "Safe" },
  },
  resume: {
    title: "ATS Resume Checker",
    subtitle: "Rule-based ATS readiness scoring — paste your resume text below",
    heroTitle: "Is your resume built to survive an ATS?",
    heroDesc:
      "Most large employers filter resumes through an Applicant Tracking System before a human ever sees them. Paste your resume text below — optionally with keywords from a target job posting — and get a scored breakdown of formatting, content, and keyword coverage.",
    resumeTextLabel: "Resume text",
    resumeTextPlaceholder: "Paste your full resume text here…",
    keywordsLabel: "Target job keywords (optional, comma-separated)",
    keywordsPlaceholder: "e.g. Python, stakeholder management, AWS, roadmap",
    checkButton: "Check ATS Readiness",
    atsScore: "ATS Score",
    words: "words",
    bulletPoints: "bullet points",
    keywordsMatched: "target keywords matched",
    findings: (n) => `Findings (${n})`,
    noFindings: "No formatting or content issues detected.",
    recommendations: "Recommendations",
    bandLabels: { Excellent: "Excellent", Good: "Good", "Needs Work": "Needs Work", Poor: "Poor" },
  },
  playbook: {
    title: "Implementation Playbook",
    subtitle: "How a non-human identity security program actually gets built, from charter to steady-state governance",
    heroEyebrow: "Program & Project Management",
    heroTitle: "Rolling out NHI Guardian in a real organization",
    heroDesc:
      "Standing up a non-human identity program is a change management effort as much as a technical one — it touches security, cloud platform, DevSecOps, and every engineering team that creates a service account or API key. This playbook lays out a realistic, phased program for taking an organization from \"we don't know what we don't know\" to a governed, continuously monitored NHI estate, using this platform as the operating system for that program.",
    statDuration: "Typical Duration",
    statDurationValue: "6–9 months",
    statPhases: "Program Phases",
    statPhasesValue: "7",
    statRiskReduction: "Critical Risk Reduction Target",
    statRiskReductionValue: "80%+ in 60 days",
    statSystems: "Systems Typically in Scope",
    statSystemsValue: "9+",
    timelineTitle: "Program Timeline",
    timelineSubtitle:
      "Phases overlap deliberately — remediation starts as soon as the first risk scores land, it doesn't wait for a full inventory. Click a phase to open it, or check off activities as your own program completes them.",
    goalLabel: "Goal",
    activitiesLabel: "Key Activities",
    deliverablesLabel: "Deliverables",
    metricLabel: "Success Metric",
    yourProgress: "Your Progress",
    resetProgress: "Reset progress",
    stepsComplete: (done, total) => `${done}/${total} steps complete`,
    expandPhase: "Expand phase",
    collapsePhase: "Collapse phase",
    jumpToPhase: "Jump to",
    phases: [
      {
        key: "charter",
        number: "Phase 0",
        timeframe: "Weeks 1–3",
        title: "Discovery & Business Case",
        goal: "Secure executive sponsorship and scope the program before touching a single credential.",
        activities: [
          "Survey the estate at a high level: cloud accounts, CI/CD systems, SaaS admin panels in use",
          "Estimate exposure (rough count of API keys, service accounts, and tokens already in circulation)",
          "Build the business case: breach cost avoidance, audit findings, SOC 2 / ISO 27001 drivers",
          "Identify the executive sponsor (typically the CISO) and core stakeholders across IAM, cloud platform, DevSecOps, and engineering leadership",
        ],
        deliverables: ["Program charter", "Business case memo", "Stakeholder RACI", "Budget and resourcing ask"],
        metric: "Charter signed and program funded",
      },
      {
        key: "inventory",
        number: "Phase 1",
        timeframe: "Weeks 4–8",
        title: "Discovery & Inventory",
        goal: "Build one accurate, continuously updated inventory of every non-human identity across the estate.",
        activities: [
          "Connect discovery across AWS, Azure, GitHub Actions, Jenkins, Kubernetes, Salesforce, ServiceNow, PostgreSQL, and internal APIs",
          "Normalize identity metadata: owner, system, environment, permission level, rotation history",
          "Deduplicate and reconcile identities that show up in more than one system",
          "Stand up the identity inventory as the program's single source of truth",
        ],
        deliverables: ["Complete identity inventory", "Data quality baseline (% with a known owner, % documented)"],
        metric: "95%+ of known systems connected and reconciled against the CMDB",
      },
      {
        key: "risk-assessment",
        number: "Phase 2",
        timeframe: "Weeks 6–10",
        title: "Risk Assessment & Prioritization",
        goal: "Score every identity so remediation effort goes to the highest-risk exposures first, not the loudest team.",
        activities: [
          "Apply the rule-based risk scoring engine across rotation, ownership, privilege, exposure, production access, and documentation",
          "Validate the scoring model with security and IAM stakeholders; tune weights where the business context demands it",
          "Segment findings into Critical, High, Medium, and Low",
          "Brief executives on the top risks using the executive report",
        ],
        deliverables: ["Risk-scored inventory", "Prioritized remediation backlog", "Executive risk summary"],
        metric: "100% of identities scored; top 20 critical findings identified and assigned",
      },
      {
        key: "remediation",
        number: "Phase 3",
        timeframe: "Weeks 8–16",
        title: "Remediation & Quick Wins",
        goal: "Eliminate the highest-risk exposures fast — nothing builds program credibility like visible early wins.",
        activities: [
          "Rotate or revoke every identity with an exposed secret under a 48-hour SLA",
          "Assign accountable owners to unowned identities",
          "Migrate long-lived shared secrets into a managed vault",
          "Disable orphaned or stale identities unused for more than 180 days",
          "Track remediation velocity as a visible, weekly program metric",
        ],
        deliverables: ["Remediation runbook", "Vault migration for top offenders", "Refreshed inventory"],
        metric: "Critical findings reduced by 80%+ within 60 days",
      },
      {
        key: "policy",
        number: "Phase 4",
        timeframe: "Weeks 12–20",
        title: "Policy & Guardrails",
        goal: "Stop the bleeding — make it harder to create a risky identity than a compliant one.",
        activities: [
          "Publish an NHI security policy: rotation cadence, ownership requirement, expiration requirement, least-privilege standard",
          "Ratify the policy through the security governance or risk committee",
          "Define an exception process for legacy systems that can't yet comply",
          "Train engineering teams on the new requirements",
        ],
        deliverables: ["Ratified NHI policy", "Exception log", "Engineering training materials"],
        metric: "Policy published and acknowledged by every engineering team",
      },
      {
        key: "automation",
        number: "Phase 5",
        timeframe: "Weeks 16–24",
        title: "Automation & Guardrail Enforcement",
        goal: "Make policy compliance automatic, not a manual review step someone has to remember.",
        activities: [
          "Add CI/CD pipeline checks that block merges introducing unowned or non-expiring credentials",
          "Wire alerting for any new identity created without an owner or expiration",
          "Integrate remediation tasks with ticketing (ServiceNow / Jira)",
          "Automate quarterly access recertification campaigns",
        ],
        deliverables: ["Policy-as-code CI/CD checks", "Alerting rules", "Ticketing integration"],
        metric: "90%+ of new identities created compliant with policy at creation time",
      },
      {
        key: "governance",
        number: "Phase 6",
        timeframe: "Ongoing, from Month 6+",
        title: "Governance & Continuous Monitoring",
        goal: "Sustain the program as a standing operational capability, not a project that quietly ends.",
        activities: [
          "Stand up quarterly non-human identity access reviews",
          "Report NHI risk posture to the risk committee alongside other security KPIs",
          "Continuously onboard new systems as the cloud and SaaS footprint grows",
          "Re-baseline the risk scoring model annually against real incidents",
        ],
        deliverables: ["Quarterly review cadence", "Standing dashboard", "Updated governance charter"],
        metric: "Critical-risk identities held at 5% or below, quarter over quarter",
      },
    ],
    raciTitle: "Who Owns What",
    raciSubtitle: "A program this cross-functional fails without clear ownership from day one.",
    raciColRole: "Role",
    raciColResponsibility: "Responsibility",
    raciRoles: [
      { role: "Executive Sponsor (CISO)", responsibility: "Owns the business case, unblocks funding, reports program risk to the board" },
      { role: "Program Manager", responsibility: "Owns the timeline, cross-team coordination, and status reporting across all phases" },
      { role: "IAM / Security Engineering", responsibility: "Owns the risk scoring model, policy authoring, and vault architecture" },
      { role: "Cloud / Platform Engineering", responsibility: "Owns discovery integrations and CI/CD guardrail implementation" },
      { role: "DevSecOps", responsibility: "Owns pipeline checks, alerting, and ticketing integration" },
      { role: "Application & Engineering Teams", responsibility: "Own remediation of identities in their systems and compliance with policy" },
      { role: "Risk & Compliance", responsibility: "Owns audit alignment (SOC 2, ISO 27001) and the quarterly governance review" },
    ],
    ctaTitle: "See the platform behind the program",
    ctaDesc: "Every phase of this playbook maps to a real capability in NHI Guardian — the inventory, the risk engine, and the executive report are not mockups.",
    ctaDashboard: "View Live Dashboard",
    ctaReports: "See an Executive Report",
  },
  threatMap: {
    title: "Global Attack Map",
    subtitle: "Live simulated view of attacks targeting non-human identities worldwide",
    heroDesc:
      "A real-time view of how non-human identities — API keys, service accounts, OAuth tokens, CI/CD secrets — are targeted across the globe. Every event below is simulated for demonstration; it is not connected to a live threat feed, the same way the Threat Intelligence Lookup tool discloses its local mock mode.",
    liveLabel: "Live",
    kpiAttacksToday: "Attacks Detected (24h)",
    kpiActiveRegions: "Active Threat Regions",
    kpiBlockedRate: "Blocked / Mitigated Rate",
    kpiTopIdentityType: "Most Targeted Identity Type",
    liveFeedTitle: "Live Attack Feed",
    colTime: "Time",
    colSource: "Source",
    colTarget: "Target",
    colAttackType: "Attack Type",
    colIdentityType: "Identity Type",
    colSeverity: "Severity",
    colStatus: "Status",
    statusLabels: { Blocked: "Blocked", Mitigated: "Mitigated", Investigating: "Investigating" },
    mapLegendSource: "Attack origin",
    mapLegendTarget: "Monitored region",
    simulatedNote:
      "Simulated data for demonstration purposes only — not connected to a live threat feed. Attack origins, targets, and timing are randomly generated on each visit.",
  },
  tools: {
    hub: {
      title: "Security Tools",
      subtitle: "Interactive analyzers and platform capabilities across the modern security stack",
      interactiveLabel: "Interactive Analyzers",
      capabilityLabel: "Platform Capabilities",
      tryItBadge: "Try it",
      overviewBadge: "Overview",
      cards: {
        phishing: { title: "Phishing & Malware Scanner", description: "Paste a suspicious link, email, or message and get an instant rule-based threat assessment." },
        resume: { title: "ATS Resume Checker", description: "Paste your resume and get an ATS-readiness score with formatting and keyword recommendations." },
        cspm: { title: "Cloud Security Posture Management", description: "Paste a cloud resource config and get flagged for public access, missing encryption, and open ingress." },
        iam: { title: "IAM & Zero-Trust Policy Analyzer", description: "Paste an IAM policy and get flagged for wildcard permissions and privilege-escalation paths." },
        vam: { title: "Vulnerability Assessment & Management", description: "Paste a dependency list and get matched against known, publicly disclosed CVEs." },
        sast: { title: "Web App Security Testing (SAST)", description: "Paste a code snippet and get flagged for hardcoded secrets, injection risks, and weak crypto." },
        dlp: { title: "Data Loss Prevention Scanner", description: "Paste text or document content and get flagged for exposed PII, keys, and credentials." },
        container: { title: "Container & Kubernetes Security", description: "Paste a Dockerfile or K8s manifest and get flagged for common hardening gaps." },
        threatIntel: { title: "Threat Intelligence Lookup", description: "Paste an IP, domain, URL, or file hash for simulated reputation enrichment." },
        cryptoTool: { title: "Data Encryption Tool", description: "Encrypt or decrypt text entirely in your browser with a passphrase — nothing is ever sent to a server." },
        siem: { title: "Security Information & Event Management", description: "How centralized log correlation and alerting fits into an identity-first security program." },
        edr: { title: "Endpoint Detection & Response", description: "How endpoint telemetry and containment actions complement identity governance." },
        xdr: { title: "Extended Detection & Response", description: "How correlating identity, endpoint, and network signals shortens investigation time." },
        ndr: { title: "Network Detection & Response", description: "How network traffic analysis surfaces anomalies identity signals alone would miss." },
        pentest: { title: "Penetration Testing Frameworks", description: "How offensive testing validates the exposures this platform flags defensively." },
        dfir: { title: "Digital Forensics & Incident Response", description: "How a structured IR lifecycle turns a critical finding into a resolved incident." },
        sase: { title: "SASE & Security Service Edge", description: "How converged network and security edge services enforce Zero Trust at scale." },
        encryption: { title: "Encryption & Key Management", description: "How key lifecycle governance extends the same rotation discipline to cryptographic material." },
      },
    },
    common: {
      tryExample: "Try example",
      scanButton: "Scan",
      analyzeButton: "Analyze",
      lookupButton: "Look Up",
      score: "Score",
      verdict: "Verdict",
      findingsFound: (n) => `Findings (${n})`,
      recommendedActions: "Recommended Actions",
      noFindings: "No issues detected in the patterns this tool checks for.",
      capabilitiesLabel: "Key Capabilities",
      dashboardLabel: "Sample Dashboard",
      tieInLabel: "How this connects to NHI Guardian",
      mockLabel: "Illustrative data",
    },
    cspm: {
      title: "Cloud Security Posture Management",
      subtitle: "Rule-based cloud misconfiguration scanner — paste a resource config to check it",
      heroDesc:
        "Paste a cloud resource definition (Terraform, CloudFormation, or plain JSON) for an S3 bucket, security group, or database. The scanner checks it against common misconfiguration patterns — public access, open ingress, missing encryption — and explains exactly what it found.",
      placeholder: "Paste a Terraform, CloudFormation, or JSON resource config here…",
      examples: [
        'resource "aws_s3_bucket" "data" {\n  bucket = "corp-data"\n  acl    = "public-read"\n  versioning { enabled = false }\n}',
        'resource "aws_security_group_rule" "ssh" {\n  type        = "ingress"\n  from_port   = 22\n  to_port     = 22\n  cidr_blocks = ["0.0.0.0/0"]\n}',
        'resource "aws_db_instance" "prod" {\n  publicly_accessible = true\n  storage_encrypted   = false\n}',
      ],
      verdictLabels: { Critical: "Critical", Warning: "Warning", Compliant: "Compliant" },
    },
    iam: {
      title: "IAM & Zero-Trust Policy Analyzer",
      subtitle: "Rule-based IAM policy analysis — paste a policy document to check it",
      heroDesc:
        "Paste an IAM policy statement (AWS-style Effect/Action/Resource/Principal JSON, or similar). The analyzer checks it for wildcard grants, unrestricted principals, and known privilege-escalation combinations — the same least-privilege thinking behind this platform's identity risk engine.",
      placeholder: "Paste an IAM policy document here…",
      examples: [
        '{\n  "Effect": "Allow",\n  "Action": "*",\n  "Resource": "*"\n}',
        '{\n  "Effect": "Allow",\n  "Action": ["iam:PassRole", "ec2:RunInstances"],\n  "Resource": "*"\n}',
        '{\n  "Effect": "Allow",\n  "Principal": "*",\n  "Action": "s3:GetObject",\n  "Resource": "arn:aws:s3:::corp-data/*"\n}',
      ],
      verdictLabels: { "High Risk": "High Risk", "Needs Review": "Needs Review", "Least Privilege": "Least Privilege" },
    },
    vam: {
      title: "Vulnerability Assessment & Management",
      subtitle: "Dependency scanner — paste a component list to check it against known CVEs",
      heroDesc:
        "Paste a list of software components and versions, one per line. The scanner checks each against a reference set of real, publicly disclosed CVEs and flags matches with severity and remediation guidance.",
      placeholder: "e.g.\nlog4j 2.14.1\nlodash 4.17.15\nopenssl 1.0.1",
      examples: [
        "log4j 2.14.1\nlodash 4.17.15\nexpress 4.17.1",
        "openssl 1.0.1g\nbash 4.2\nopenssh 7.2",
        "spring-core 5.3.15\nstruts2 2.3.30\njquery 3.4.0",
      ],
      scannedLabel: (n) => `${n} components scanned`,
      matchesFound: (n) => `${n} known vulnerabilities found`,
      noMatches: "No known-vulnerable versions detected in this list.",
      colComponent: "Component",
      colVersion: "Version",
      colCve: "CVE",
      colSeverity: "Severity",
    },
    sast: {
      title: "Web Application Security Testing (SAST)",
      subtitle: "Static code scanner — paste a code snippet to check it for vulnerable patterns",
      heroDesc:
        "Paste a code snippet in any language. The scanner checks it line by line for hardcoded secrets, injection risks, weak cryptography, and other patterns static analysis tools flag before code ever reaches production. Dynamic (DAST) and interactive (IAST) testing extend this coverage at runtime — see the capability overview below.",
      placeholder: "Paste a code snippet here…",
      examples: [
        'const apiKey = "sk_example_NOT_A_REAL_KEY_00000";',
        'db.query("SELECT * FROM users WHERE id = " + userId);',
        "element.innerHTML = userComment;",
      ],
      verdictLabels: { Critical: "Critical", "Needs Attention": "Needs Attention", Clean: "Clean" },
      lineLabel: (n) => `Line ${n}`,
    },
    dlp: {
      title: "Data Loss Prevention Scanner",
      subtitle: "Sensitive data scanner — paste text to check it for PII and secrets",
      heroDesc:
        "Paste text, chat logs, or document content. The scanner checks it for common sensitive-data patterns — social security numbers, credit card numbers, private keys, and more — the same category of check a DLP product runs before data leaves an organization.",
      placeholder: "Paste text or document content here…",
      examples: [
        "Please process refund for card 4111 1111 1111 1111, SSN 123-45-6789 on file.",
        "-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEA...\n-----END RSA PRIVATE KEY-----",
        "Contact John at john.doe@example.com or (555) 123-4567 for the AWS key AKIAIOSFODNN7EXAMPLE.",
      ],
      categoriesFound: (n) => `${n} sensitive data categories found`,
      noMatches: "No sensitive data patterns detected.",
      colCategory: "Category",
      colCount: "Occurrences",
      colSample: "Sample (redacted)",
      falsePositiveNote: "Pattern-based detection can include false positives, the same as production DLP tools.",
    },
    container: {
      title: "Container & Kubernetes Security",
      subtitle: "Configuration scanner — paste a Dockerfile or manifest to check it",
      heroDesc:
        "Paste a Dockerfile or Kubernetes manifest (YAML). The scanner checks it against common container-hardening gaps — root users, privileged mode, missing resource limits — before the workload ever ships.",
      placeholder: "Paste a Dockerfile or Kubernetes manifest here…",
      examples: [
        'FROM node:latest\nCOPY . .\nCMD ["node", "server.js"]',
        "apiVersion: v1\nkind: Pod\nspec:\n  containers:\n    - name: app\n      securityContext:\n        privileged: true",
        'apiVersion: apps/v1\nkind: Deployment\nspec:\n  template:\n    spec:\n      hostNetwork: true\n      containers:\n        - name: app\n          env:\n            - name: DB_PASSWORD\n              value: "hunter2"',
      ],
      verdictLabels: { Critical: "Critical", "Needs Hardening": "Needs Hardening", Hardened: "Hardened" },
    },
    threatIntel: {
      title: "Threat Intelligence Lookup",
      subtitle: "Simulated IOC enrichment — local mock mode, not a live feed",
      heroDesc:
        "Paste an IP address, domain, URL, or file hash. This runs entirely locally against a small simulated reference set — it is not connected to a real feed like VirusTotal or AbuseIPDB — and demonstrates the enrichment workflow a real Threat Intelligence Platform provides.",
      placeholder: "Paste an IP, domain, URL, or file hash here…",
      examples: ["185.220.101.45", "secure-paypa1-login.com", "44d88612fea8a8f36de82e1278abb02f"],
      verdictLabels: { Malicious: "Malicious", Suspicious: "Suspicious", Clean: "Clean", Unrecognized: "Unrecognized" },
      typeLabel: "Indicator Type",
      confidenceLabel: "Confidence",
      tagsLabel: "Tags",
      simulatedNote: "Local mock mode — simulated enrichment for demonstration, not a live threat feed.",
    },
    cryptoTool: {
      title: "Data Encryption Tool",
      subtitle: "Encrypt or decrypt text in your browser — nothing is sent to a server",
      heroDesc:
        "Protect sensitive text — a note, a credential, a snippet — with a passphrase before storing or sharing it. Encryption and decryption both run entirely in your browser using the Web Crypto API (AES-256-GCM with a PBKDF2-derived key); your text and passphrase are never transmitted anywhere.",
      encryptTab: "Encrypt",
      decryptTab: "Decrypt",
      passphraseLabel: "Passphrase",
      passphrasePlaceholder: "Enter a strong passphrase…",
      inputLabelEncrypt: "Text to encrypt",
      inputPlaceholderEncrypt: "Paste or type the text you want to encrypt…",
      inputLabelDecrypt: "Encrypted text",
      inputPlaceholderDecrypt: "Paste the encrypted text here…",
      encryptButton: "Encrypt",
      decryptButton: "Decrypt",
      outputLabel: "Result",
      copyButton: "Copy",
      copiedLabel: "Copied",
      errorDecrypt: "Decryption failed — check that the passphrase and encrypted text are both correct.",
      errorPassphrase: "Enter a passphrase to continue.",
      disclaimer: "Processed entirely client-side in your browser — your text and passphrase are never sent to a server. For real secrets in production, use a dedicated secrets manager or vault, not a browser tool.",
      algorithmNote: "AES-256-GCM with a PBKDF2-SHA256 derived key (100,000 iterations), random salt and IV per encryption.",
    },
    siem: {
      title: "Security Information & Event Management",
      subtitle: "Centralized log correlation and alerting across the environment",
      description:
        "A SIEM aggregates logs and events from every system — identity providers, cloud platforms, endpoints, network devices — into one place, correlates them against detection rules, and surfaces the alerts that matter out of millions of raw events.",
      capabilities: [
        "Centralized log ingestion from cloud, on-prem, and SaaS sources",
        "Correlation rules that link related events into a single alert",
        "Long-term retention for audit and compliance requirements",
        "Dashboards and saved searches for security operations teams",
        "Case management and escalation workflows",
      ],
      kpis: [
        { label: "Events Ingested (24h)", value: "42.8M" },
        { label: "Active Alerts", value: "17" },
        { label: "Mean Time to Triage", value: "11 min" },
      ],
      tableTitle: "Recent Correlated Alerts",
      tableCols: ["Time", "Alert", "Severity"],
      tableRows: [
        { cells: ["09:14", "5 failed logins followed by success from a new location", "High"], tone: "high" },
        { cells: ["08:52", "PowerShell encoded command execution detected", "Critical"], tone: "critical" },
        { cells: ["07:30", "Impossible travel: login from two countries within 10 minutes", "High"], tone: "high" },
        { cells: ["06:05", "Bulk file download from finance file share", "Medium"], tone: "medium" },
        { cells: ["02:47", "Scheduled task created on domain controller", "Critical"], tone: "critical" },
      ],
      tieIn:
        "NHI Guardian's identity risk findings are exactly the kind of high-signal event a SIEM should ingest and correlate — an overdue credential rotation or an exposed secret becomes a first-class event alongside login and network telemetry, not a blind spot.",
    },
    edr: {
      title: "Endpoint Detection & Response",
      subtitle: "Real-time monitoring, detection, and containment on every endpoint",
      description:
        "EDR agents run on laptops, servers, and workloads to record process, file, and network activity, detect malicious behavior in real time, and give responders the ability to isolate a compromised endpoint in seconds.",
      capabilities: [
        "Real-time process and file activity monitoring",
        "Behavioral detection for fileless and living-off-the-land attacks",
        "One-click endpoint isolation and remote remediation",
        "Rollback of ransomware-encrypted files where supported",
        "Threat hunting across historical endpoint telemetry",
      ],
      kpis: [
        { label: "Protected Endpoints", value: "1,284" },
        { label: "Threats Blocked (7d)", value: "63" },
        { label: "Endpoints Isolated", value: "2" },
      ],
      tableTitle: "Recent Endpoint Detections",
      tableCols: ["Endpoint", "Process", "Verdict"],
      tableRows: [
        { cells: ["FIN-LAPTOP-042", "powershell.exe -enc ...", "Blocked"], tone: "critical" },
        { cells: ["WEB-PROD-07", "Unusual outbound connection to new IP", "Quarantined"], tone: "high" },
        { cells: ["ENG-MAC-118", "Known-good installer", "Allowed"], tone: "low" },
        { cells: ["DEV-WIN-233", "Credential dumping tool signature", "Blocked"], tone: "critical" },
      ],
      tieIn:
        "An endpoint compromise is often how an attacker first reaches the service accounts and API keys NHI Guardian tracks. Feeding EDR containment events into the identity risk model lets a compromised endpoint automatically escalate the risk score of any credential it had access to.",
    },
    xdr: {
      title: "Extended Detection & Response",
      subtitle: "Correlating identity, endpoint, and network signals into one incident",
      description:
        "XDR extends EDR's approach across the whole environment — endpoint, network, identity, and cloud telemetry are correlated automatically into a single incident, instead of leaving analysts to manually stitch together alerts from separate tools.",
      capabilities: [
        "Cross-signal correlation across endpoint, network, identity, and cloud",
        "Automated incident timelines instead of isolated point alerts",
        "Unified investigation console across previously siloed tools",
        "Guided or automated response playbooks",
        "Reduced alert fatigue through de-duplication and correlation",
      ],
      kpis: [
        { label: "Correlated Incidents (7d)", value: "9" },
        { label: "Signals Fused per Incident (avg)", value: "4.2" },
        { label: "Analyst Hours Saved (est.)", value: "31" },
      ],
      tableTitle: "Correlated Incidents",
      tableCols: ["Incident", "Signals Combined", "Status"],
      tableRows: [
        { cells: ["Suspicious service account activity after endpoint compromise", "EDR + Identity + Network", "Investigating"], tone: "high" },
        { cells: ["Credential exported from vault, then used from new geography", "Identity + Cloud", "Contained"], tone: "critical" },
        { cells: ["Lateral movement following phishing click", "Endpoint + Network", "Resolved"], tone: "low" },
      ],
      tieIn:
        "NHI Guardian's identity risk score is a ready-made signal for an XDR correlation engine — an overdue-rotation service account suddenly authenticating from a new endpoint is exactly the cross-domain pattern XDR is built to surface as one incident, not three unrelated alerts.",
    },
    ndr: {
      title: "Network Detection & Response",
      subtitle: "Behavioral analysis of network traffic to catch what endpoints miss",
      description:
        "NDR analyzes network flow and packet data to detect anomalies — lateral movement, data exfiltration, command-and-control beaconing — including on unmanaged devices and workloads where an endpoint agent can't be installed.",
      capabilities: [
        "Passive traffic analysis with no endpoint agent required",
        "Detection of lateral movement and internal reconnaissance",
        "Beaconing and command-and-control pattern detection",
        "Data exfiltration volume and destination anomaly detection",
        "Coverage for IoT, OT, and unmanaged devices",
      ],
      kpis: [
        { label: "Flows Analyzed (24h)", value: "2.1B" },
        { label: "Anomalous Flows Flagged", value: "24" },
        { label: "Devices Monitored", value: "3,940" },
      ],
      tableTitle: "Anomalous Network Flows",
      tableCols: ["Source → Destination", "Anomaly", "Severity"],
      tableRows: [
        { cells: ["10.2.4.18 → unknown external host", "Beaconing pattern, fixed 60s interval", "Critical"], tone: "critical" },
        { cells: ["build-agent-03 → external storage provider", "Unusual outbound data volume", "High"], tone: "high" },
        { cells: ["10.2.1.0/24 internal sweep", "Port scan across subnet", "Medium"], tone: "medium" },
      ],
      tieIn:
        "A CI/CD secret or service account credential exfiltrated over the network often produces a network anomaly before it produces an identity anomaly. NDR is frequently the earliest signal that one of the identities NHI Guardian tracks has already been compromised.",
    },
    pentest: {
      title: "Penetration Testing & Exploitation Frameworks",
      subtitle: "Methodology and sample findings — not a live exploitation tool",
      description:
        'Penetration testing validates, through authorized and controlled exploitation, that the exposures a defensive platform flags are actually exploitable — closing the loop between "this looks risky" and "this is provably exploitable." This page shows the methodology and a sample findings report; it does not perform live exploitation.',
      capabilities: [
        "Reconnaissance and attack surface mapping",
        "Authorized exploitation to validate real-world impact",
        "Post-exploitation and privilege-escalation path testing",
        "Business-risk-focused findings reports for stakeholders",
        "Retesting to confirm remediation actually closed the gap",
      ],
      kpis: [
        { label: "Sample Engagement Findings", value: "14" },
        { label: "Critical / High", value: "3 / 5" },
        { label: "Retest Pass Rate", value: "92%" },
      ],
      tableTitle: "Sample Findings Summary",
      tableCols: ["Finding", "Severity", "Status"],
      tableRows: [
        { cells: ["SQL injection in legacy customer login form", "Critical", "Remediated"], tone: "critical" },
        { cells: ["Default credentials on internal admin panel", "Critical", "Remediated"], tone: "critical" },
        { cells: ["Outdated TLS version accepted on public endpoint", "High", "In Progress"], tone: "high" },
        { cells: ["Verbose error messages disclose stack traces", "Medium", "Accepted Risk"], tone: "medium" },
      ],
      tieIn:
        "Non-human identities are a favorite pentest target — a service account with a never-rotated, overprivileged credential is often the fastest path from initial foothold to full compromise. NHI Guardian's inventory doubles as a pre-engagement map of exactly those high-value targets.",
    },
    dfir: {
      title: "Digital Forensics & Incident Response",
      subtitle: "The structured lifecycle that turns a critical finding into a resolved incident",
      description:
        "DFIR is the discipline of investigating and resolving a confirmed security incident — establishing what happened, containing it, eradicating the cause, recovering safely, and capturing lessons learned, all while preserving evidence.",
      capabilities: [
        "Evidence preservation and chain-of-custody handling",
        "Root-cause and timeline reconstruction",
        "Containment without destroying forensic evidence",
        "Coordinated eradication and recovery across affected systems",
        "Post-incident lessons-learned reporting",
      ],
      kpis: [
        { label: "Active Investigations", value: "2" },
        { label: "Mean Time to Contain", value: "3.1 hrs" },
        { label: "Cases Closed (90d)", value: "11" },
      ],
      tableTitle: "Incident Response Lifecycle",
      tableCols: ["Phase", "Focus"],
      tableRows: [
        { cells: ["Preparation", "Runbooks, tooling, and access ready before an incident happens"], tone: "accent" },
        { cells: ["Identification", "Confirm an incident occurred and scope its extent"], tone: "accent" },
        { cells: ["Containment", "Stop the spread without destroying evidence"], tone: "high" },
        { cells: ["Eradication", "Remove the root cause from every affected system"], tone: "critical" },
        { cells: ["Recovery", "Restore normal operations with monitoring in place"], tone: "medium" },
        { cells: ["Lessons Learned", "Document root cause and update controls"], tone: "low" },
      ],
      tieIn:
        "When an incident does involve a non-human identity — an exposed key, a compromised service account — NHI Guardian's risk findings and audit trail become primary forensic inputs: who owned it, when it last rotated, and what it had access to.",
    },
    sase: {
      title: "SASE & Security Service Edge",
      subtitle: "Converged network and security services enforcing Zero Trust at the edge",
      description:
        "SASE converges networking (SD-WAN) and security (SWG, CASB, ZTNA, FWaaS) into one cloud-delivered edge service, so every user and workload connection — not just the ones that pass through a traditional perimeter — is inspected and policy-enforced.",
      capabilities: [
        "Secure Web Gateway (SWG) for outbound web traffic inspection",
        "Cloud Access Security Broker (CASB) for SaaS visibility and control",
        "Zero Trust Network Access (ZTNA) replacing legacy VPN",
        "Firewall-as-a-Service (FWaaS) enforced at the cloud edge",
        "Consistent policy enforcement regardless of user location",
      ],
      kpis: [
        { label: "Policy Enforcement Points", value: "6" },
        { label: "Sessions Inspected (24h)", value: "1.4M" },
        { label: "Blocked SaaS Access Attempts", value: "58" },
      ],
      tableTitle: "Converged Edge Components",
      tableCols: ["Component", "Role"],
      tableRows: [
        { cells: ["ZTNA", "Per-application access replacing broad VPN trust"], tone: "accent" },
        { cells: ["SWG", "Inspects and filters outbound web traffic"], tone: "accent" },
        { cells: ["CASB", "Governs sanctioned and shadow SaaS usage"], tone: "accent" },
        { cells: ["FWaaS", "Enforces network policy from the cloud edge"], tone: "accent" },
      ],
      tieIn:
        "Zero Trust access decisions are only as good as the identity risk behind them. NHI Guardian supplies the machine-identity half of that equation — a ZTNA policy can deny access outright to a service account flagged as Critical risk, the same way it would for a risky human user.",
    },
    encryption: {
      title: "Encryption & Key Management",
      subtitle: "Key lifecycle governance — rotation, access, and expiration for cryptographic material",
      description:
        "Encryption is only as strong as the key management behind it. A key management program tracks every encryption key's algorithm, access policy, and rotation status across an organization — applying the same lifecycle discipline NHI Guardian applies to API keys and service accounts.",
      capabilities: [
        "Centralized inventory of encryption keys across cloud and on-prem",
        "Automated rotation schedules and expiration policies",
        "Hardware security module (HSM) backed key storage",
        "Access logging for every key use, not just key existence",
        "Bring-your-own-key (BYOK) and hold-your-own-key (HYOK) support",
      ],
      kpis: [
        { label: "Keys Under Management", value: "412" },
        { label: "Rotation Overdue", value: "9" },
        { label: "HSM-Backed Keys", value: "100%" },
      ],
      tableTitle: "Key Inventory Sample",
      tableCols: ["Key ID", "Algorithm", "Rotation Status"],
      tableRows: [
        { cells: ["kms/prod-database-key", "AES-256", "Rotated Recently"], tone: "low" },
        { cells: ["kms/legacy-file-share-key", "AES-128", "Overdue"], tone: "high" },
        { cells: ["kms/partner-api-signing-key", "RSA-2048", "Never Rotated"], tone: "critical" },
        { cells: ["kms/backup-archive-key", "AES-256", "Rotated Recently"], tone: "low" },
      ],
      tieIn:
        "Encryption keys are non-human identities in every sense that matters to this platform — they need an owner, a rotation cadence, and an expiration policy. The same risk-scoring logic NHI Guardian applies to API keys and service accounts extends directly to cryptographic material.",
    },
  },
  severity: { Critical: "Critical", High: "High", Medium: "Medium", Low: "Low" },
  status: { Active: "Active", Inactive: "Inactive", Suspended: "Suspended", "Pending Review": "Pending Review" },
  rotation: {
    "Rotated Recently": "Rotated Recently",
    Overdue: "Overdue",
    "Never Rotated": "Never Rotated",
  },
  common: {
    searchIdentities: "Search identities",
    notifications: "View notifications",
    signedInAs: "Signed in as Security Analyst",
    systemOperational: "All systems operational",
  },
};

const fr: Dictionary = {
  nav: {
    securityProgram: "Programme de sécurité",
    securityTools: "Outils de sécurité",
    toolsHub: "Tous les outils de sécurité",
    dashboard: "Tableau de bord",
    identities: "Inventaire des identités",
    aiAnalyst: "Analyste IA de sécurité",
    reports: "Rapports exécutifs",
    playbook: "Guide de mise en œuvre",
    threatMap: "Carte mondiale des attaques",
    backToOverview: "Retour à la vue d'ensemble",
    launchDashboard: "Ouvrir le tableau de bord",
    askAiAnalyst: "Interroger l'analyste IA",
    poweredBy: "Propulsé par Sidibe Enterprises",
    toolLabels: {
      phishing: "Détecteur d'hameçonnage et de logiciels malveillants",
      resume: "Vérificateur de CV ATS",
      cspm: "Gestion de la posture de sécurité cloud",
      iam: "Analyseur de politiques IAM et Zero-Trust",
      vam: "Évaluation et gestion des vulnérabilités",
      sast: "Tests de sécurité des applications web (SAST)",
      dlp: "Scanner de prévention des pertes de données",
      container: "Sécurité des conteneurs et de Kubernetes",
      threatIntel: "Recherche de renseignement sur les menaces",
      cryptoTool: "Outil de chiffrement des données",
      siem: "Gestion des informations et des événements de sécurité",
      edr: "Détection et réponse sur les terminaux",
      xdr: "Détection et réponse étendues",
      ndr: "Détection et réponse réseau",
      pentest: "Cadres de tests d'intrusion",
      dfir: "Investigation numérique et réponse aux incidents",
      sase: "SASE et Security Service Edge",
      encryption: "Chiffrement et gestion des clés",
    },
    short: {
      dashboard: "Accueil",
      identities: "Identités",
      aiAnalyst: "IA",
      reports: "Rapports",
      playbook: "Guide",
      threatMap: "Carte",
      tools: "Outils",
    },
  },
  landing: {
    eyebrow: "Sécurité des identités non humaines propulsée par l'IA",
    headline1: "Trouvez les identifiants que les attaquants ",
    headline2: "ont déjà trouvés.",
    subcopy:
      "NHI Guardian, propulsé par Sidibe Enterprises, est une plateforme de sécurité des identités non humaines alimentée par l'IA qui aide les équipes de sécurité et IAM à identifier les comptes de service, clés API, jetons, secrets et identifiants machine à risque — avec notation des risques, recommandations de remédiation et rapports exécutifs intégrés.",
    viewLiveDashboard: "Voir le tableau de bord en direct",
    statIdentities: "Identités surveillées",
    statCritical: "Constats critiques",
    statAvgScore: "Score de risque moyen",
    heroAttention: "identités nécessitent une attention immédiate",
    capabilitiesTitle: "Une plateforme pour tout le cycle de vie des identités non humaines",
    capabilitiesSubtitle:
      "Conçu pour les équipes sécurité, IAM, cloud et DevSecOps qui gèrent des identités machine dispersées dans le cloud, le CI/CD et le SaaS.",
    featureInventory: {
      title: "Inventaire des identités",
      desc: "Une source unique de vérité pour chaque clé API, compte de service, jeton OAuth, clé SSH et certificat machine de votre parc.",
    },
    featureScoring: {
      title: "Notation des risques basée sur des règles",
      desc: "Chaque identité est notée selon 9 facteurs de risque concrets — rotation, propriété, privilèges, exposition et plus encore.",
    },
    featureAnalyst: {
      title: "Analyste IA de sécurité",
      desc: "Posez des questions en langage naturel et obtenez des explications, priorisations et plans de remédiation instantanés.",
    },
    featureReporting: {
      title: "Rapports exécutifs",
      desc: "Générez des synthèses de risque prêtes pour le conseil d'administration avec indicateurs clés, principaux constats et feuille de route de remédiation en un clic.",
    },
    featureRemediation: {
      title: "Recommandations de remédiation",
      desc: "Chaque identité à risque est accompagnée d'actions concrètes — rotation, réduction des privilèges, mise en coffre, documentation ou désactivation.",
    },
    featureMultiCloud: {
      title: "Couverture multi-cloud et CI/CD",
      desc: "AWS, Azure, GitHub Actions, Jenkins, Kubernetes, Salesforce, ServiceNow, PostgreSQL et API internes — surveillés depuis une seule console.",
    },
    toolsEyebrow: "Au-delà de la gouvernance des identités",
    toolsTitle: "Outils de sécurité gratuits par Sidibe Enterprises",
    phishingCard: {
      title: "Détecteur d'hameçonnage et de logiciels malveillants",
      desc: "Collez un lien, un e-mail ou un message suspect et obtenez une évaluation instantanée des menaces avec les indicateurs détectés.",
    },
    resumeCard: {
      title: "Vérificateur de CV ATS",
      desc: "Collez votre CV et obtenez un score de compatibilité ATS avec des recommandations de mise en forme, de mots-clés et de contenu.",
    },
    ctaTitle: "Découvrez le risque de vos identités non humaines en moins d'une minute.",
    ctaSubtitle: "Explorez le tableau de bord en direct, alimenté par des données d'exemple réalistes — aucune configuration requise.",
    footer:
      "NHI Guardian — Propulsé par Sidibe Enterprises. Un projet portfolio démontrant la gestion de programmes de cybersécurité assistée par l'IA.",
  },
  dashboard: {
    title: "Tableau de bord sécurité",
    subtitle: "Posture de risque en direct sur toutes les identités non humaines connectées",
    banner: (total) =>
      `Surveillance de ${total} identités non humaines sur 9 systèmes connectés, des clés d'accès cloud aux secrets CI/CD.`,
    kpiTotal: "Identités totales",
    kpiCritical: "Risques critiques",
    kpiNoExpiration: "Sans date d'expiration",
    kpiOverprivileged: "Sur-privilégiées",
    kpiNoRotation: "Secrets sans rotation",
    kpiOrphaned: "Identités orphelines",
    kpiCloudExposure: "Exposition cloud/service",
    kpiHealthy: "Saines (risque faible)",
    riskDistribution: "Répartition des risques",
    identitiesBySystem: "Identités par système connecté",
    highestRisk: "Identités à plus haut risque",
    viewFullInventory: "Voir l'inventaire complet",
  },
  identities: {
    title: "Inventaire des identités",
    subtitle: (total) => `${total} identités non humaines sur 9 systèmes connectés`,
    searchPlaceholder: "Rechercher par nom d'identité ou propriétaire…",
    allSeverities: "Toutes les gravités",
    allTypes: "Tous les types",
    showing: (shown, total) => `Affichage de ${shown} sur ${total} identités`,
    colIdentity: "Identité",
    colSystem: "Système",
    colEnvironment: "Environnement",
    colOwner: "Propriétaire",
    colLastUsed: "Dernière utilisation",
    colPermission: "Permission",
    colRotation: "Rotation",
    colRisk: "Risque",
    colStatus: "Statut",
    unassigned: "Non assigné",
    noMatches: "Aucune identité ne correspond aux filtres actuels.",
    clearFilters: "Effacer tous les filtres",
  },
  identityDetail: {
    backToInventory: "Retour à l'inventaire",
    riskScore: "Score de risque",
    identityDetails: "Détails de l'identité",
    riskFindings: (n) => `Constats de risque (${n})`,
    recommendedRemediation: "Remédiation recommandée",
    noRiskFactors: "Aucun facteur de risque détecté.",
    noRemediationNeeded: "Aucune remédiation nécessaire — cette identité respecte les bonnes pratiques.",
    metaOwner: "Propriétaire",
    metaSystem: "Système",
    metaEnvironment: "Environnement",
    metaPermission: "Niveau de permission",
    metaCreated: "Créée le",
    metaLastUsed: "Dernière utilisation",
    metaHasExpiration: "Date d'expiration",
    metaShared: "Compte partagé",
    metaDocumented: "Documentée",
    metaSecretExposed: "Secret exposé",
    yes: "Oui",
    no: "Non",
  },
  aiAssistant: {
    title: "Analyste IA de sécurité",
    subtitle: "Mode IA simulé local — remplaçable par le point de terminaison /analyze basé sur OpenAI pour une inférence en direct",
    intro:
      "Bonjour, je suis l'analyste IA de sécurité de NHI Guardian (en mode simulé local). Interrogez-moi sur vos identités à plus haut risque, demandez une synthèse exécutive, ou un plan de remédiation.",
    suggested: [
      "Quelles identités présentent le risque le plus élevé ?",
      "Expliquez pourquoi aws-root-automation-key est critique.",
      "Générez un plan de remédiation.",
      "Rédigez une synthèse exécutive des risques.",
      "Que devrions-nous corriger en premier ?",
      "Quelles identités sont obsolètes ou orphelines ?",
    ],
    placeholder: "Interrogez l'analyste IA de sécurité sur vos identités non humaines…",
    analyzing: "Analyse de l'inventaire des identités…",
  },
  reports: {
    title: "Rapports exécutifs",
    subtitle: "Synthèse de risque prête pour le conseil, générée à la demande",
    generated: "Généré",
    heading: "Risque des identités non humaines — Synthèse exécutive",
    exportPrint: "Exporter / Imprimer le rapport",
    riskSummary: "Synthèse des risques",
    keyMetrics: "Indicateurs clés",
    top5: "Top 5 des constats critiques",
    remediationRoadmap: "Feuille de route de remédiation",
    businessImpact: "Impact sur l'activité",
    nextActions: "Prochaines actions recommandées",
  },
  phishing: {
    title: "Détecteur d'hameçonnage et de logiciels malveillants",
    subtitle: "Analyse d'indicateurs de menace basée sur des règles — collez un lien, un e-mail ou un message",
    heroTitle: "Vérifiez un lien ou un message suspect avant de cliquer",
    heroDesc:
      "Collez ci-dessous le texte complet d'un e-mail suspect, d'un SMS ou d'un lien. Le scanner le compare à des indicateurs d'hameçonnage et de logiciels malveillants connus — domaines usurpés, liens basés sur des adresses IP, langage d'urgence, demandes d'identifiants et types de pièces jointes dangereuses — et explique exactement ce qu'il a trouvé.",
    placeholder: "Collez une URL, un corps d'e-mail ou un message texte ici…",
    tryExample: "Essayer un exemple",
    scanButton: "Analyser les menaces",
    verdict: "Verdict",
    indicatorsFound: (n) => `Indicateurs trouvés (${n})`,
    recommendedActions: "Actions recommandées",
    noIndicators: "Aucun indicateur de menace connu détecté.",
    whatChecks: "Ce que ce scanner vérifie",
    checks: [
      "Adresses IP brutes et domaines punycode/homographes",
      "Raccourcisseurs d'URL et domaines de premier niveau suspects",
      "Usurpation de marque via des domaines similaires",
      "Langage d'urgence et tactiques de pression",
      "Demandes de mots de passe, codes ou informations financières",
      "Types de pièces jointes exécutables dangereuses",
    ],
    verdictLabels: { Malicious: "Malveillant", Suspicious: "Suspect", Safe: "Sûr" },
  },
  resume: {
    title: "Vérificateur de CV ATS",
    subtitle: "Notation de compatibilité ATS basée sur des règles — collez le texte de votre CV ci-dessous",
    heroTitle: "Votre CV est-il conçu pour passer un ATS ?",
    heroDesc:
      "La plupart des grands employeurs filtrent les CV via un système de suivi des candidatures (ATS) avant qu'un humain ne les voie. Collez le texte de votre CV ci-dessous — avec éventuellement des mots-clés d'une offre d'emploi ciblée — et obtenez une évaluation détaillée de la mise en forme, du contenu et de la couverture des mots-clés.",
    resumeTextLabel: "Texte du CV",
    resumeTextPlaceholder: "Collez le texte complet de votre CV ici…",
    keywordsLabel: "Mots-clés de l'offre ciblée (facultatif, séparés par des virgules)",
    keywordsPlaceholder: "ex. Python, gestion des parties prenantes, AWS, feuille de route",
    checkButton: "Vérifier la compatibilité ATS",
    atsScore: "Score ATS",
    words: "mots",
    bulletPoints: "puces",
    keywordsMatched: "mots-clés cibles trouvés",
    findings: (n) => `Constats (${n})`,
    noFindings: "Aucun problème de mise en forme ou de contenu détecté.",
    recommendations: "Recommandations",
    bandLabels: { Excellent: "Excellent", Good: "Bon", "Needs Work": "À améliorer", Poor: "Faible" },
  },
  playbook: {
    title: "Guide de mise en œuvre",
    subtitle: "Comment un programme de sécurité des identités non humaines se construit réellement, de la charte à la gouvernance en régime permanent",
    heroEyebrow: "Gestion de programme et de projet",
    heroTitle: "Déployer NHI Guardian dans une organisation réelle",
    heroDesc:
      "Mettre en place un programme d'identités non humaines est autant un effort de conduite du changement qu'un effort technique — il touche la sécurité, la plateforme cloud, le DevSecOps et chaque équipe d'ingénierie qui crée un compte de service ou une clé API. Ce guide présente un programme réaliste et par phases pour faire passer une organisation de « nous ne savons pas ce que nous ne savons pas » à un parc d'identités non humaines gouverné et surveillé en continu, en utilisant cette plateforme comme système d'exploitation du programme.",
    statDuration: "Durée typique",
    statDurationValue: "6 à 9 mois",
    statPhases: "Phases du programme",
    statPhasesValue: "7",
    statRiskReduction: "Objectif de réduction des risques critiques",
    statRiskReductionValue: "80 %+ en 60 jours",
    statSystems: "Systèmes typiquement concernés",
    statSystemsValue: "9+",
    timelineTitle: "Chronologie du programme",
    timelineSubtitle:
      "Les phases se chevauchent délibérément — la remédiation démarre dès que les premiers scores de risque sont disponibles, sans attendre un inventaire complet. Cliquez sur une phase pour l'ouvrir, ou cochez les activités au fur et à mesure de l'avancement de votre programme.",
    goalLabel: "Objectif",
    activitiesLabel: "Activités clés",
    deliverablesLabel: "Livrables",
    metricLabel: "Indicateur de succès",
    yourProgress: "Votre progression",
    resetProgress: "Réinitialiser la progression",
    stepsComplete: (done, total) => `${done}/${total} étapes complétées`,
    expandPhase: "Développer la phase",
    collapsePhase: "Réduire la phase",
    jumpToPhase: "Aller à",
    phases: [
      {
        key: "charter",
        number: "Phase 0",
        timeframe: "Semaines 1 à 3",
        title: "Découverte et argumentaire",
        goal: "Obtenir le parrainage exécutif et cadrer le programme avant de toucher le moindre identifiant.",
        activities: [
          "Recenser le parc à haut niveau : comptes cloud, systèmes CI/CD, panneaux d'administration SaaS utilisés",
          "Estimer l'exposition (nombre approximatif de clés API, comptes de service et jetons déjà en circulation)",
          "Construire l'argumentaire : évitement du coût des violations, constats d'audit, exigences SOC 2 / ISO 27001",
          "Identifier le sponsor exécutif (généralement le RSSI) et les parties prenantes clés en IAM, plateforme cloud, DevSecOps et direction de l'ingénierie",
        ],
        deliverables: ["Charte de programme", "Note d'argumentaire", "RACI des parties prenantes", "Demande de budget et de ressources"],
        metric: "Charte signée et programme financé",
      },
      {
        key: "inventory",
        number: "Phase 1",
        timeframe: "Semaines 4 à 8",
        title: "Découverte et inventaire",
        goal: "Construire un inventaire unique, exact et continuellement mis à jour de chaque identité non humaine du parc.",
        activities: [
          "Connecter la découverte sur AWS, Azure, GitHub Actions, Jenkins, Kubernetes, Salesforce, ServiceNow, PostgreSQL et les API internes",
          "Normaliser les métadonnées d'identité : propriétaire, système, environnement, niveau de permission, historique de rotation",
          "Dédupliquer et réconcilier les identités apparaissant dans plusieurs systèmes",
          "Établir l'inventaire des identités comme source unique de vérité du programme",
        ],
        deliverables: ["Inventaire complet des identités", "Référence de qualité des données (% avec propriétaire connu, % documenté)"],
        metric: "95 %+ des systèmes connus connectés et réconciliés avec la CMDB",
      },
      {
        key: "risk-assessment",
        number: "Phase 2",
        timeframe: "Semaines 6 à 10",
        title: "Évaluation et priorisation des risques",
        goal: "Noter chaque identité afin que l'effort de remédiation cible d'abord les expositions les plus risquées, pas l'équipe la plus bruyante.",
        activities: [
          "Appliquer le moteur de notation des risques basé sur des règles : rotation, propriété, privilèges, exposition, accès production et documentation",
          "Valider le modèle de notation avec les parties prenantes sécurité et IAM ; ajuster les pondérations selon le contexte métier",
          "Segmenter les constats en Critique, Élevé, Moyen et Faible",
          "Informer les dirigeants des principaux risques via le rapport exécutif",
        ],
        deliverables: ["Inventaire noté par risque", "Backlog de remédiation priorisé", "Synthèse exécutive des risques"],
        metric: "100 % des identités notées ; les 20 principaux constats critiques identifiés et assignés",
      },
      {
        key: "remediation",
        number: "Phase 3",
        timeframe: "Semaines 8 à 16",
        title: "Remédiation et gains rapides",
        goal: "Éliminer rapidement les expositions les plus risquées — rien ne renforce la crédibilité du programme comme des premiers succès visibles.",
        activities: [
          "Faire pivoter ou révoquer chaque identité avec un secret exposé sous 48 heures",
          "Assigner des propriétaires responsables aux identités sans propriétaire",
          "Migrer les secrets partagés de longue durée vers un coffre-fort géré",
          "Désactiver les identités orphelines ou inutilisées depuis plus de 180 jours",
          "Suivre la vélocité de remédiation comme indicateur hebdomadaire visible du programme",
        ],
        deliverables: ["Manuel de remédiation", "Migration vers un coffre-fort des principaux contrevenants", "Inventaire actualisé"],
        metric: "Constats critiques réduits de 80 %+ en 60 jours",
      },
      {
        key: "policy",
        number: "Phase 4",
        timeframe: "Semaines 12 à 20",
        title: "Politique et garde-fous",
        goal: "Arrêter l'hémorragie — rendre plus difficile la création d'une identité à risque que d'une identité conforme.",
        activities: [
          "Publier une politique de sécurité NHI : cadence de rotation, exigence de propriétaire, exigence d'expiration, standard de moindre privilège",
          "Faire ratifier la politique par le comité de gouvernance sécurité ou de risque",
          "Définir un processus d'exception pour les systèmes hérités qui ne peuvent pas encore se conformer",
          "Former les équipes d'ingénierie aux nouvelles exigences",
        ],
        deliverables: ["Politique NHI ratifiée", "Registre des exceptions", "Supports de formation pour l'ingénierie"],
        metric: "Politique publiée et reconnue par chaque équipe d'ingénierie",
      },
      {
        key: "automation",
        number: "Phase 5",
        timeframe: "Semaines 16 à 24",
        title: "Automatisation et application des garde-fous",
        goal: "Rendre la conformité aux politiques automatique, plutôt qu'une étape de revue manuelle que quelqu'un doit se rappeler.",
        activities: [
          "Ajouter des contrôles de pipeline CI/CD bloquant les fusions introduisant des identifiants sans propriétaire ou sans expiration",
          "Configurer des alertes pour toute nouvelle identité créée sans propriétaire ni expiration",
          "Intégrer les tâches de remédiation à la billetterie (ServiceNow / Jira)",
          "Automatiser les campagnes trimestrielles de recertification des accès",
        ],
        deliverables: ["Contrôles CI/CD de politique en tant que code", "Règles d'alerte", "Intégration à la billetterie"],
        metric: "90 %+ des nouvelles identités créées conformes à la politique dès la création",
      },
      {
        key: "governance",
        number: "Phase 6",
        timeframe: "En continu, à partir du mois 6+",
        title: "Gouvernance et surveillance continue",
        goal: "Pérenniser le programme comme une capacité opérationnelle permanente, pas un projet qui s'éteint discrètement.",
        activities: [
          "Mettre en place des revues d'accès trimestrielles des identités non humaines",
          "Rapporter la posture de risque NHI au comité de risque aux côtés des autres indicateurs de sécurité",
          "Intégrer en continu de nouveaux systèmes à mesure que le parc cloud et SaaS croît",
          "Réétalonner annuellement le modèle de notation des risques à partir d'incidents réels",
        ],
        deliverables: ["Cadence de revue trimestrielle", "Tableau de bord permanent", "Charte de gouvernance actualisée"],
        metric: "Identités à risque critique maintenues à 5 % ou moins, trimestre après trimestre",
      },
    ],
    raciTitle: "Qui est responsable de quoi",
    raciSubtitle: "Un programme aussi transversal échoue sans une responsabilité claire dès le premier jour.",
    raciColRole: "Rôle",
    raciColResponsibility: "Responsabilité",
    raciRoles: [
      { role: "Sponsor exécutif (RSSI)", responsibility: "Porte l'argumentaire, débloque le financement, rapporte le risque du programme au conseil" },
      { role: "Chef de programme", responsibility: "Responsable du calendrier, de la coordination inter-équipes et du reporting de statut sur toutes les phases" },
      { role: "IAM / Ingénierie sécurité", responsibility: "Responsable du modèle de notation des risques, de la rédaction des politiques et de l'architecture du coffre-fort" },
      { role: "Ingénierie cloud / plateforme", responsibility: "Responsable des intégrations de découverte et de la mise en œuvre des garde-fous CI/CD" },
      { role: "DevSecOps", responsibility: "Responsable des contrôles de pipeline, des alertes et de l'intégration à la billetterie" },
      { role: "Équipes applicatives et d'ingénierie", responsibility: "Responsables de la remédiation des identités dans leurs systèmes et de la conformité aux politiques" },
      { role: "Risque et conformité", responsibility: "Responsable de l'alignement des audits (SOC 2, ISO 27001) et de la revue de gouvernance trimestrielle" },
    ],
    ctaTitle: "Découvrez la plateforme derrière le programme",
    ctaDesc: "Chaque phase de ce guide correspond à une capacité réelle de NHI Guardian — l'inventaire, le moteur de risque et le rapport exécutif ne sont pas des maquettes.",
    ctaDashboard: "Voir le tableau de bord en direct",
    ctaReports: "Voir un rapport exécutif",
  },
  threatMap: {
    title: "Carte mondiale des attaques",
    subtitle: "Vue simulée en direct des attaques ciblant les identités non humaines dans le monde",
    heroDesc:
      "Une vue en temps réel de la façon dont les identités non humaines — clés API, comptes de service, jetons OAuth, secrets CI/CD — sont ciblées à travers le monde. Chaque événement ci-dessous est simulé à des fins de démonstration ; il n'est pas connecté à un flux de menace en direct, de la même manière que l'outil de recherche de renseignement sur les menaces divulgue son mode simulé local.",
    liveLabel: "En direct",
    kpiAttacksToday: "Attaques détectées (24h)",
    kpiActiveRegions: "Régions à risque actives",
    kpiBlockedRate: "Taux de blocage / atténuation",
    kpiTopIdentityType: "Type d'identité le plus ciblé",
    liveFeedTitle: "Flux d'attaques en direct",
    colTime: "Heure",
    colSource: "Origine",
    colTarget: "Cible",
    colAttackType: "Type d'attaque",
    colIdentityType: "Type d'identité",
    colSeverity: "Gravité",
    colStatus: "Statut",
    statusLabels: { Blocked: "Bloquée", Mitigated: "Atténuée", Investigating: "En investigation" },
    mapLegendSource: "Origine de l'attaque",
    mapLegendTarget: "Région surveillée",
    simulatedNote:
      "Données simulées à des fins de démonstration uniquement — non connectées à un flux de menace en direct. Les origines, cibles et horaires des attaques sont générés aléatoirement à chaque visite.",
  },
  tools: {
    hub: {
      title: "Outils de sécurité",
      subtitle: "Analyseurs interactifs et capacités de plateforme couvrant la pile de sécurité moderne",
      interactiveLabel: "Analyseurs interactifs",
      capabilityLabel: "Capacités de plateforme",
      tryItBadge: "Essayer",
      overviewBadge: "Aperçu",
      cards: {
        phishing: { title: "Détecteur d'hameçonnage et de logiciels malveillants", description: "Collez un lien, un e-mail ou un message suspect et obtenez une évaluation instantanée des menaces." },
        resume: { title: "Vérificateur de CV ATS", description: "Collez votre CV et obtenez un score de compatibilité ATS avec des recommandations de mise en forme et de mots-clés." },
        cspm: { title: "Gestion de la posture de sécurité cloud", description: "Collez une configuration de ressource cloud et détectez l'accès public, le chiffrement manquant et les entrées ouvertes." },
        iam: { title: "Analyseur de politiques IAM et Zero-Trust", description: "Collez une politique IAM et détectez les permissions génériques et les chemins d'escalade de privilèges." },
        vam: { title: "Évaluation et gestion des vulnérabilités", description: "Collez une liste de dépendances et comparez-la aux CVE publiquement connues." },
        sast: { title: "Tests de sécurité des applications web (SAST)", description: "Collez un extrait de code et détectez les secrets codés en dur, les risques d'injection et le chiffrement faible." },
        dlp: { title: "Scanner de prévention des pertes de données", description: "Collez du texte ou un contenu de document et détectez les données personnelles, clés et identifiants exposés." },
        container: { title: "Sécurité des conteneurs et de Kubernetes", description: "Collez un Dockerfile ou un manifeste K8s et détectez les lacunes de durcissement courantes." },
        threatIntel: { title: "Recherche de renseignement sur les menaces", description: "Collez une IP, un domaine, une URL ou un hachage de fichier pour un enrichissement de réputation simulé." },
        cryptoTool: { title: "Outil de chiffrement des données", description: "Chiffrez ou déchiffrez du texte entièrement dans votre navigateur avec une phrase secrète — rien n'est jamais envoyé à un serveur." },
        siem: { title: "Gestion des informations et des événements de sécurité", description: "Comment la corrélation centralisée des journaux et des alertes s'intègre à un programme de sécurité axé sur l'identité." },
        edr: { title: "Détection et réponse sur les terminaux", description: "Comment la télémétrie des terminaux et les actions de confinement complètent la gouvernance des identités." },
        xdr: { title: "Détection et réponse étendues", description: "Comment la corrélation des signaux identité, terminal et réseau réduit le temps d'investigation." },
        ndr: { title: "Détection et réponse réseau", description: "Comment l'analyse du trafic réseau révèle des anomalies que les signaux d'identité seuls ne détecteraient pas." },
        pentest: { title: "Cadres de tests d'intrusion", description: "Comment les tests offensifs valident les expositions que cette plateforme signale de manière défensive." },
        dfir: { title: "Investigation numérique et réponse aux incidents", description: "Comment un cycle de vie structuré de réponse aux incidents transforme un constat critique en incident résolu." },
        sase: { title: "SASE et Security Service Edge", description: "Comment les services réseau et sécurité convergents appliquent le Zero Trust à grande échelle." },
        encryption: { title: "Chiffrement et gestion des clés", description: "Comment la gouvernance du cycle de vie des clés étend la même discipline de rotation au matériel cryptographique." },
      },
    },
    common: {
      tryExample: "Essayer un exemple",
      scanButton: "Analyser",
      analyzeButton: "Analyser",
      lookupButton: "Rechercher",
      score: "Score",
      verdict: "Verdict",
      findingsFound: (n) => `Constats (${n})`,
      recommendedActions: "Actions recommandées",
      noFindings: "Aucun problème détecté dans les schémas que cet outil vérifie.",
      capabilitiesLabel: "Capacités clés",
      dashboardLabel: "Tableau de bord d'exemple",
      tieInLabel: "Lien avec NHI Guardian",
      mockLabel: "Données illustratives",
    },
    cspm: {
      title: "Gestion de la posture de sécurité cloud",
      subtitle: "Scanner de mauvaise configuration cloud basé sur des règles — collez une configuration de ressource pour la vérifier",
      heroDesc:
        "Collez une définition de ressource cloud (Terraform, CloudFormation ou JSON brut) pour un bucket S3, un groupe de sécurité ou une base de données. Le scanner la compare à des schémas de mauvaise configuration courants — accès public, entrées ouvertes, chiffrement manquant — et explique exactement ce qu'il a trouvé.",
      placeholder: "Collez ici une configuration de ressource Terraform, CloudFormation ou JSON…",
      examples: [
        'resource "aws_s3_bucket" "data" {\n  bucket = "corp-data"\n  acl    = "public-read"\n  versioning { enabled = false }\n}',
        'resource "aws_security_group_rule" "ssh" {\n  type        = "ingress"\n  from_port   = 22\n  to_port     = 22\n  cidr_blocks = ["0.0.0.0/0"]\n}',
        'resource "aws_db_instance" "prod" {\n  publicly_accessible = true\n  storage_encrypted   = false\n}',
      ],
      verdictLabels: { Critical: "Critique", Warning: "Avertissement", Compliant: "Conforme" },
    },
    iam: {
      title: "Analyseur de politiques IAM et Zero-Trust",
      subtitle: "Analyse de politique IAM basée sur des règles — collez un document de politique pour le vérifier",
      heroDesc:
        "Collez un énoncé de politique IAM (JSON de style AWS Effect/Action/Resource/Principal, ou similaire). L'analyseur vérifie les octrois génériques, les principaux non restreints et les combinaisons connues d'escalade de privilèges — la même logique de moindre privilège qui sous-tend le moteur de risque d'identité de cette plateforme.",
      placeholder: "Collez un document de politique IAM ici…",
      examples: [
        '{\n  "Effect": "Allow",\n  "Action": "*",\n  "Resource": "*"\n}',
        '{\n  "Effect": "Allow",\n  "Action": ["iam:PassRole", "ec2:RunInstances"],\n  "Resource": "*"\n}',
        '{\n  "Effect": "Allow",\n  "Principal": "*",\n  "Action": "s3:GetObject",\n  "Resource": "arn:aws:s3:::corp-data/*"\n}',
      ],
      verdictLabels: { "High Risk": "Risque élevé", "Needs Review": "À revoir", "Least Privilege": "Moindre privilège" },
    },
    vam: {
      title: "Évaluation et gestion des vulnérabilités",
      subtitle: "Scanner de dépendances — collez une liste de composants pour la vérifier par rapport aux CVE connues",
      heroDesc:
        "Collez une liste de composants logiciels et leurs versions, un par ligne. Le scanner compare chacun à un ensemble de référence de vraies CVE publiquement divulguées et signale les correspondances avec leur gravité et des recommandations de remédiation.",
      placeholder: "ex.\nlog4j 2.14.1\nlodash 4.17.15\nopenssl 1.0.1",
      examples: [
        "log4j 2.14.1\nlodash 4.17.15\nexpress 4.17.1",
        "openssl 1.0.1g\nbash 4.2\nopenssh 7.2",
        "spring-core 5.3.15\nstruts2 2.3.30\njquery 3.4.0",
      ],
      scannedLabel: (n) => `${n} composants analysés`,
      matchesFound: (n) => `${n} vulnérabilités connues trouvées`,
      noMatches: "Aucune version connue comme vulnérable détectée dans cette liste.",
      colComponent: "Composant",
      colVersion: "Version",
      colCve: "CVE",
      colSeverity: "Gravité",
    },
    sast: {
      title: "Tests de sécurité des applications web (SAST)",
      subtitle: "Scanner de code statique — collez un extrait de code pour vérifier les schémas vulnérables",
      heroDesc:
        "Collez un extrait de code dans n'importe quel langage. Le scanner l'examine ligne par ligne pour détecter les secrets codés en dur, les risques d'injection, le chiffrement faible et d'autres schémas que les outils d'analyse statique signalent avant que le code n'atteigne la production. Les tests dynamiques (DAST) et interactifs (IAST) étendent cette couverture à l'exécution — voir l'aperçu de capacité ci-dessous.",
      placeholder: "Collez un extrait de code ici…",
      examples: [
        'const apiKey = "sk_example_NOT_A_REAL_KEY_00000";',
        'db.query("SELECT * FROM users WHERE id = " + userId);',
        "element.innerHTML = userComment;",
      ],
      verdictLabels: { Critical: "Critique", "Needs Attention": "À surveiller", Clean: "Propre" },
      lineLabel: (n) => `Ligne ${n}`,
    },
    dlp: {
      title: "Scanner de prévention des pertes de données",
      subtitle: "Scanner de données sensibles — collez du texte pour vérifier la présence de données personnelles et de secrets",
      heroDesc:
        "Collez du texte, des journaux de discussion ou un contenu de document. Le scanner vérifie la présence de schémas de données sensibles courants — numéros de sécurité sociale, numéros de carte bancaire, clés privées et plus encore — le même type de vérification qu'un produit DLP effectue avant que les données ne quittent une organisation.",
      placeholder: "Collez du texte ou un contenu de document ici…",
      examples: [
        "Veuillez traiter le remboursement pour la carte 4111 1111 1111 1111, SSN 123-45-6789 enregistré.",
        "-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEA...\n-----END RSA PRIVATE KEY-----",
        "Contactez John à john.doe@example.com ou au (555) 123-4567 pour la clé AWS AKIAIOSFODNN7EXAMPLE.",
      ],
      categoriesFound: (n) => `${n} catégories de données sensibles trouvées`,
      noMatches: "Aucun schéma de données sensibles détecté.",
      colCategory: "Catégorie",
      colCount: "Occurrences",
      colSample: "Échantillon (masqué)",
      falsePositiveNote: "La détection basée sur des schémas peut inclure des faux positifs, comme les produits DLP en production.",
    },
    container: {
      title: "Sécurité des conteneurs et de Kubernetes",
      subtitle: "Scanner de configuration — collez un Dockerfile ou un manifeste pour le vérifier",
      heroDesc:
        "Collez un Dockerfile ou un manifeste Kubernetes (YAML). Le scanner le compare à des lacunes de durcissement de conteneurs courantes — utilisateurs root, mode privilégié, limites de ressources manquantes — avant que la charge de travail ne soit déployée.",
      placeholder: "Collez un Dockerfile ou un manifeste Kubernetes ici…",
      examples: [
        'FROM node:latest\nCOPY . .\nCMD ["node", "server.js"]',
        "apiVersion: v1\nkind: Pod\nspec:\n  containers:\n    - name: app\n      securityContext:\n        privileged: true",
        'apiVersion: apps/v1\nkind: Deployment\nspec:\n  template:\n    spec:\n      hostNetwork: true\n      containers:\n        - name: app\n          env:\n            - name: DB_PASSWORD\n              value: "hunter2"',
      ],
      verdictLabels: { Critical: "Critique", "Needs Hardening": "À durcir", Hardened: "Durci" },
    },
    threatIntel: {
      title: "Recherche de renseignement sur les menaces",
      subtitle: "Enrichissement d'IOC simulé — mode simulé local, pas un flux en direct",
      heroDesc:
        "Collez une adresse IP, un domaine, une URL ou un hachage de fichier. Ceci s'exécute entièrement localement sur un petit ensemble de référence simulé — ce n'est pas connecté à un vrai flux comme VirusTotal ou AbuseIPDB — et démontre le flux d'enrichissement qu'une véritable plateforme de renseignement sur les menaces fournirait.",
      placeholder: "Collez une IP, un domaine, une URL ou un hachage de fichier ici…",
      examples: ["185.220.101.45", "secure-paypa1-login.com", "44d88612fea8a8f36de82e1278abb02f"],
      verdictLabels: { Malicious: "Malveillant", Suspicious: "Suspect", Clean: "Propre", Unrecognized: "Non reconnu" },
      typeLabel: "Type d'indicateur",
      confidenceLabel: "Confiance",
      tagsLabel: "Étiquettes",
      simulatedNote: "Mode simulé local — enrichissement simulé à des fins de démonstration, pas un flux de menace en direct.",
    },
    cryptoTool: {
      title: "Outil de chiffrement des données",
      subtitle: "Chiffrez ou déchiffrez du texte dans votre navigateur — rien n'est envoyé à un serveur",
      heroDesc:
        "Protégez du texte sensible — une note, un identifiant, un extrait — avec une phrase secrète avant de le stocker ou de le partager. Le chiffrement et le déchiffrement s'exécutent entièrement dans votre navigateur via l'API Web Crypto (AES-256-GCM avec une clé dérivée par PBKDF2) ; votre texte et votre phrase secrète ne sont jamais transmis.",
      encryptTab: "Chiffrer",
      decryptTab: "Déchiffrer",
      passphraseLabel: "Phrase secrète",
      passphrasePlaceholder: "Entrez une phrase secrète robuste…",
      inputLabelEncrypt: "Texte à chiffrer",
      inputPlaceholderEncrypt: "Collez ou saisissez le texte à chiffrer…",
      inputLabelDecrypt: "Texte chiffré",
      inputPlaceholderDecrypt: "Collez le texte chiffré ici…",
      encryptButton: "Chiffrer",
      decryptButton: "Déchiffrer",
      outputLabel: "Résultat",
      copyButton: "Copier",
      copiedLabel: "Copié",
      errorDecrypt: "Échec du déchiffrement — vérifiez que la phrase secrète et le texte chiffré sont corrects.",
      errorPassphrase: "Entrez une phrase secrète pour continuer.",
      disclaimer: "Traité entièrement côté client dans votre navigateur — votre texte et votre phrase secrète ne sont jamais envoyés à un serveur. Pour de vrais secrets en production, utilisez un gestionnaire de secrets ou un coffre-fort dédié, pas un outil de navigateur.",
      algorithmNote: "AES-256-GCM avec une clé dérivée par PBKDF2-SHA256 (100 000 itérations), sel et IV aléatoires à chaque chiffrement.",
    },
    siem: {
      title: "Gestion des informations et des événements de sécurité",
      subtitle: "Corrélation centralisée des journaux et alertes sur l'ensemble de l'environnement",
      description:
        "Un SIEM agrège les journaux et événements de chaque système — fournisseurs d'identité, plateformes cloud, terminaux, équipements réseau — en un seul endroit, les corrèle avec des règles de détection, et fait ressortir les alertes qui comptent parmi des millions d'événements bruts.",
      capabilities: [
        "Ingestion centralisée de journaux depuis le cloud, sur site et le SaaS",
        "Règles de corrélation reliant des événements liés en une seule alerte",
        "Rétention à long terme pour les exigences d'audit et de conformité",
        "Tableaux de bord et recherches enregistrées pour les équipes SOC",
        "Gestion des dossiers et workflows d'escalade",
      ],
      kpis: [
        { label: "Événements ingérés (24h)", value: "42,8 M" },
        { label: "Alertes actives", value: "17" },
        { label: "Délai moyen de triage", value: "11 min" },
      ],
      tableTitle: "Alertes corrélées récentes",
      tableCols: ["Heure", "Alerte", "Gravité"],
      tableRows: [
        { cells: ["09:14", "5 échecs de connexion suivis d'un succès depuis un nouvel emplacement", "Élevé"], tone: "high" },
        { cells: ["08:52", "Exécution de commande PowerShell encodée détectée", "Critique"], tone: "critical" },
        { cells: ["07:30", "Voyage impossible : connexion depuis deux pays en 10 minutes", "Élevé"], tone: "high" },
        { cells: ["06:05", "Téléchargement massif depuis le partage de fichiers finance", "Moyen"], tone: "medium" },
        { cells: ["02:47", "Tâche planifiée créée sur le contrôleur de domaine", "Critique"], tone: "critical" },
      ],
      tieIn:
        "Les constats de risque d'identité de NHI Guardian sont exactement le type d'événement à fort signal qu'un SIEM devrait ingérer et corréler — une rotation de credential en retard ou un secret exposé devient un événement de premier plan aux côtés de la télémétrie de connexion et de réseau, et non un angle mort.",
    },
    edr: {
      title: "Détection et réponse sur les terminaux",
      subtitle: "Surveillance, détection et confinement en temps réel sur chaque terminal",
      description:
        "Les agents EDR s'exécutent sur les ordinateurs portables, serveurs et charges de travail pour enregistrer l'activité des processus, fichiers et réseau, détecter les comportements malveillants en temps réel, et permettre aux intervenants d'isoler un terminal compromis en quelques secondes.",
      capabilities: [
        "Surveillance en temps réel de l'activité des processus et fichiers",
        "Détection comportementale des attaques sans fichier et « living-off-the-land »",
        "Isolation du terminal en un clic et remédiation à distance",
        "Restauration des fichiers chiffrés par rançongiciel lorsque pris en charge",
        "Chasse aux menaces dans la télémétrie historique des terminaux",
      ],
      kpis: [
        { label: "Terminaux protégés", value: "1 284" },
        { label: "Menaces bloquées (7j)", value: "63" },
        { label: "Terminaux isolés", value: "2" },
      ],
      tableTitle: "Détections récentes sur les terminaux",
      tableCols: ["Terminal", "Processus", "Verdict"],
      tableRows: [
        { cells: ["FIN-LAPTOP-042", "powershell.exe -enc ...", "Bloqué"], tone: "critical" },
        { cells: ["WEB-PROD-07", "Connexion sortante inhabituelle vers une nouvelle IP", "Mis en quarantaine"], tone: "high" },
        { cells: ["ENG-MAC-118", "Installateur reconnu comme sûr", "Autorisé"], tone: "low" },
        { cells: ["DEV-WIN-233", "Signature d'outil de vidage d'identifiants", "Bloqué"], tone: "critical" },
      ],
      tieIn:
        "Une compromission de terminal est souvent la façon dont un attaquant atteint pour la première fois les comptes de service et clés API que NHI Guardian suit. Injecter les événements de confinement EDR dans le modèle de risque d'identité permet à un terminal compromis d'augmenter automatiquement le score de risque de tout identifiant auquel il avait accès.",
    },
    xdr: {
      title: "Détection et réponse étendues",
      subtitle: "Corréler les signaux d'identité, de terminal et de réseau en un seul incident",
      description:
        "XDR étend l'approche de l'EDR à l'ensemble de l'environnement — la télémétrie des terminaux, du réseau, de l'identité et du cloud est corrélée automatiquement en un seul incident, au lieu de laisser les analystes assembler manuellement des alertes provenant d'outils séparés.",
      capabilities: [
        "Corrélation multi-signaux entre terminal, réseau, identité et cloud",
        "Chronologies d'incidents automatisées au lieu d'alertes isolées",
        "Console d'investigation unifiée remplaçant des outils auparavant cloisonnés",
        "Playbooks de réponse guidés ou automatisés",
        "Réduction de la fatigue liée aux alertes grâce à la déduplication et la corrélation",
      ],
      kpis: [
        { label: "Incidents corrélés (7j)", value: "9" },
        { label: "Signaux fusionnés par incident (moy.)", value: "4,2" },
        { label: "Heures analystes économisées (est.)", value: "31" },
      ],
      tableTitle: "Incidents corrélés",
      tableCols: ["Incident", "Signaux combinés", "Statut"],
      tableRows: [
        { cells: ["Activité suspecte d'un compte de service après compromission d'un terminal", "EDR + Identité + Réseau", "En cours d'investigation"], tone: "high" },
        { cells: ["Identifiant exporté du coffre-fort, puis utilisé depuis une nouvelle zone géographique", "Identité + Cloud", "Confiné"], tone: "critical" },
        { cells: ["Mouvement latéral suite à un clic d'hameçonnage", "Terminal + Réseau", "Résolu"], tone: "low" },
      ],
      tieIn:
        "Le score de risque d'identité de NHI Guardian est un signal prêt à l'emploi pour un moteur de corrélation XDR — un compte de service en retard de rotation s'authentifiant soudainement depuis un nouveau terminal est exactement le schéma multi-domaine que XDR est conçu pour révéler comme un seul incident, et non trois alertes non liées.",
    },
    ndr: {
      title: "Détection et réponse réseau",
      subtitle: "Analyse comportementale du trafic réseau pour détecter ce que les terminaux manquent",
      description:
        "NDR analyse les données de flux et de paquets réseau pour détecter des anomalies — mouvement latéral, exfiltration de données, balisage de commande et contrôle — y compris sur les appareils et charges de travail non gérés où un agent de terminal ne peut pas être installé.",
      capabilities: [
        "Analyse passive du trafic sans agent de terminal requis",
        "Détection du mouvement latéral et de la reconnaissance interne",
        "Détection de schémas de balisage et de commande et contrôle",
        "Détection d'anomalies de volume et de destination d'exfiltration de données",
        "Couverture des appareils IoT, OT et non gérés",
      ],
      kpis: [
        { label: "Flux analysés (24h)", value: "2,1 Md" },
        { label: "Flux anormaux signalés", value: "24" },
        { label: "Appareils surveillés", value: "3 940" },
      ],
      tableTitle: "Flux réseau anormaux",
      tableCols: ["Source → Destination", "Anomalie", "Gravité"],
      tableRows: [
        { cells: ["10.2.4.18 → hôte externe inconnu", "Schéma de balisage, intervalle fixe de 60 s", "Critique"], tone: "critical" },
        { cells: ["build-agent-03 → fournisseur de stockage externe", "Volume de données sortantes inhabituel", "Élevé"], tone: "high" },
        { cells: ["Balayage interne 10.2.1.0/24", "Scan de ports sur le sous-réseau", "Moyen"], tone: "medium" },
      ],
      tieIn:
        "Un secret CI/CD ou un identifiant de compte de service exfiltré sur le réseau produit souvent une anomalie réseau avant de produire une anomalie d'identité. NDR est fréquemment le signal le plus précoce qu'une des identités suivies par NHI Guardian est déjà compromise.",
    },
    pentest: {
      title: "Cadres de tests d'intrusion et d'exploitation",
      subtitle: "Méthodologie et exemples de constats — pas un outil d'exploitation en direct",
      description:
        "Les tests d'intrusion valident, par une exploitation autorisée et contrôlée, que les expositions signalées par une plateforme défensive sont réellement exploitables — comblant l'écart entre « cela semble risqué » et « cela est démontrablement exploitable ». Cette page présente la méthodologie et un exemple de rapport de constats ; elle n'effectue pas d'exploitation en direct.",
      capabilities: [
        "Reconnaissance et cartographie de la surface d'attaque",
        "Exploitation autorisée pour valider l'impact réel",
        "Tests post-exploitation et de chemins d'escalade de privilèges",
        "Rapports de constats axés sur le risque métier pour les parties prenantes",
        "Nouveaux tests pour confirmer que la remédiation a réellement comblé l'écart",
      ],
      kpis: [
        { label: "Constats d'exemple de mission", value: "14" },
        { label: "Critique / Élevé", value: "3 / 5" },
        { label: "Taux de réussite des nouveaux tests", value: "92 %" },
      ],
      tableTitle: "Synthèse des constats d'exemple",
      tableCols: ["Constat", "Gravité", "Statut"],
      tableRows: [
        { cells: ["Injection SQL dans un ancien formulaire de connexion client", "Critique", "Corrigé"], tone: "critical" },
        { cells: ["Identifiants par défaut sur le panneau d'administration interne", "Critique", "Corrigé"], tone: "critical" },
        { cells: ["Version TLS obsolète acceptée sur un point de terminaison public", "Élevé", "En cours"], tone: "high" },
        { cells: ["Messages d'erreur détaillés révélant des traces de pile", "Moyen", "Risque accepté"], tone: "medium" },
      ],
      tieIn:
        "Les identités non humaines sont une cible privilégiée des tests d'intrusion — un compte de service avec un identifiant jamais renouvelé et sur-privilégié est souvent le chemin le plus rapide entre un point d'ancrage initial et une compromission totale. L'inventaire de NHI Guardian sert aussi de carte pré-mission de ces cibles à haute valeur.",
    },
    dfir: {
      title: "Investigation numérique et réponse aux incidents",
      subtitle: "Le cycle de vie structuré qui transforme un constat critique en incident résolu",
      description:
        "Le DFIR est la discipline consistant à investiguer et résoudre un incident de sécurité confirmé — établir ce qui s'est passé, le contenir, éradiquer la cause, récupérer en toute sécurité et capturer les enseignements tirés, tout en préservant les preuves.",
      capabilities: [
        "Préservation des preuves et gestion de la chaîne de possession",
        "Reconstitution de la cause racine et de la chronologie",
        "Confinement sans détruire les preuves médico-légales",
        "Éradication et récupération coordonnées sur les systèmes affectés",
        "Rapport d'enseignements tirés post-incident",
      ],
      kpis: [
        { label: "Investigations actives", value: "2" },
        { label: "Délai moyen de confinement", value: "3,1 h" },
        { label: "Dossiers clôturés (90j)", value: "11" },
      ],
      tableTitle: "Cycle de vie de la réponse aux incidents",
      tableCols: ["Phase", "Objectif"],
      tableRows: [
        { cells: ["Préparation", "Manuels, outillage et accès prêts avant qu'un incident ne survienne"], tone: "accent" },
        { cells: ["Identification", "Confirmer qu'un incident s'est produit et cadrer son étendue"], tone: "accent" },
        { cells: ["Confinement", "Arrêter la propagation sans détruire les preuves"], tone: "high" },
        { cells: ["Éradication", "Supprimer la cause racine de chaque système affecté"], tone: "critical" },
        { cells: ["Récupération", "Restaurer les opérations normales avec une surveillance en place"], tone: "medium" },
        { cells: ["Enseignements tirés", "Documenter la cause racine et mettre à jour les contrôles"], tone: "low" },
      ],
      tieIn:
        "Lorsqu'un incident implique une identité non humaine — une clé exposée, un compte de service compromis — les constats de risque et la piste d'audit de NHI Guardian deviennent des données médico-légales de premier plan : qui en était propriétaire, quand elle a été renouvelée, et à quoi elle avait accès.",
    },
    sase: {
      title: "SASE et Security Service Edge",
      subtitle: "Services réseau et sécurité convergents appliquant le Zero Trust en périphérie",
      description:
        "SASE fait converger le réseau (SD-WAN) et la sécurité (SWG, CASB, ZTNA, FWaaS) en un service de périphérie livré depuis le cloud, de sorte que chaque connexion utilisateur et charge de travail — pas seulement celles passant par un périmètre traditionnel — soit inspectée et soumise à des politiques.",
      capabilities: [
        "Passerelle web sécurisée (SWG) pour l'inspection du trafic web sortant",
        "Courtier de sécurité d'accès au cloud (CASB) pour la visibilité et le contrôle du SaaS",
        "Accès réseau Zero Trust (ZTNA) remplaçant le VPN traditionnel",
        "Pare-feu en tant que service (FWaaS) appliqué en périphérie du cloud",
        "Application cohérente des politiques quel que soit l'emplacement de l'utilisateur",
      ],
      kpis: [
        { label: "Points d'application des politiques", value: "6" },
        { label: "Sessions inspectées (24h)", value: "1,4 M" },
        { label: "Tentatives d'accès SaaS bloquées", value: "58" },
      ],
      tableTitle: "Composants de périphérie convergents",
      tableCols: ["Composant", "Rôle"],
      tableRows: [
        { cells: ["ZTNA", "Accès par application remplaçant la confiance VPN large"], tone: "accent" },
        { cells: ["SWG", "Inspecte et filtre le trafic web sortant"], tone: "accent" },
        { cells: ["CASB", "Gouverne l'usage du SaaS sanctionné et fantôme"], tone: "accent" },
        { cells: ["FWaaS", "Applique la politique réseau depuis la périphérie cloud"], tone: "accent" },
      ],
      tieIn:
        "Les décisions d'accès Zero Trust ne sont valables que si le risque d'identité qui les sous-tend l'est aussi. NHI Guardian fournit la moitié « identité machine » de cette équation — une politique ZTNA peut refuser complètement l'accès à un compte de service signalé comme risque critique, de la même façon qu'elle le ferait pour un utilisateur humain risqué.",
    },
    encryption: {
      title: "Chiffrement et gestion des clés",
      subtitle: "Gouvernance du cycle de vie des clés — rotation, accès et expiration du matériel cryptographique",
      description:
        "Le chiffrement n'est fort que si la gestion des clés qui le sous-tend l'est aussi. Un programme de gestion des clés suit l'algorithme, la politique d'accès et le statut de rotation de chaque clé de chiffrement à travers une organisation — appliquant la même discipline de cycle de vie que NHI Guardian applique aux clés API et aux comptes de service.",
      capabilities: [
        "Inventaire centralisé des clés de chiffrement sur le cloud et sur site",
        "Calendriers de rotation automatisés et politiques d'expiration",
        "Stockage de clés adossé à des modules matériels de sécurité (HSM)",
        "Journalisation des accès pour chaque utilisation de clé, pas seulement son existence",
        "Prise en charge du « bring-your-own-key » (BYOK) et du « hold-your-own-key » (HYOK)",
      ],
      kpis: [
        { label: "Clés sous gestion", value: "412" },
        { label: "Rotation en retard", value: "9" },
        { label: "Clés adossées à un HSM", value: "100 %" },
      ],
      tableTitle: "Exemple d'inventaire de clés",
      tableCols: ["ID de clé", "Algorithme", "Statut de rotation"],
      tableRows: [
        { cells: ["kms/prod-database-key", "AES-256", "Renouvelée récemment"], tone: "low" },
        { cells: ["kms/legacy-file-share-key", "AES-128", "En retard"], tone: "high" },
        { cells: ["kms/partner-api-signing-key", "RSA-2048", "Jamais renouvelée"], tone: "critical" },
        { cells: ["kms/backup-archive-key", "AES-256", "Renouvelée récemment"], tone: "low" },
      ],
      tieIn:
        "Les clés de chiffrement sont des identités non humaines à tous égards pertinents pour cette plateforme — elles ont besoin d'un propriétaire, d'une cadence de rotation et d'une politique d'expiration. La même logique de notation des risques que NHI Guardian applique aux clés API et aux comptes de service s'étend directement au matériel cryptographique.",
    },
  },
  severity: { Critical: "Critique", High: "Élevé", Medium: "Moyen", Low: "Faible" },
  status: { Active: "Actif", Inactive: "Inactif", Suspended: "Suspendu", "Pending Review": "En attente de revue" },
  rotation: {
    "Rotated Recently": "Renouvelée récemment",
    Overdue: "En retard",
    "Never Rotated": "Jamais renouvelée",
  },
  common: {
    searchIdentities: "Rechercher des identités",
    notifications: "Voir les notifications",
    signedInAs: "Connecté en tant qu'analyste sécurité",
    systemOperational: "Tous les systèmes sont opérationnels",
  },
};

export const dictionaries: Record<Lang, Dictionary> = { en, fr };
