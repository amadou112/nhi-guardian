// Rule-based scanner for the Container & Kubernetes Security tool.
// Paste a Dockerfile or Kubernetes manifest (YAML) and it's checked
// against common container-hardening misconfigurations.

export interface ContainerFinding {
  factor: string;
  description: string;
  weight: number;
}

export type ContainerVerdict = "Critical" | "Needs Hardening" | "Hardened";

export interface ContainerResult {
  score: number;
  verdict: ContainerVerdict;
  findings: ContainerFinding[];
  recommendations: string[];
}

export function scanContainerConfig(raw: string): ContainerResult {
  const findings: ContainerFinding[] = [];
  const recommendations = new Set<string>();
  const looksLikeManifest = /kind:\s*(pod|deployment|daemonset|statefulset)/i.test(raw);
  const looksLikeDockerfile = /^\s*from\s+\S+/im.test(raw);

  if (looksLikeDockerfile && /from\s+[a-z0-9./_-]+:latest/i.test(raw)) {
    findings.push({
      factor: "Unpinned Base Image",
      description: 'The base image uses the "latest" tag, making builds non-reproducible and unpredictable.',
      weight: 15,
    });
    recommendations.add("Pin the base image to a specific, immutable version or digest");
  }

  if (looksLikeDockerfile && !/^\s*user\s+/im.test(raw)) {
    findings.push({
      factor: "Running as Root",
      description: "No USER instruction was found — the container will run as root by default.",
      weight: 20,
    });
    recommendations.add("Add a non-root USER instruction near the end of the Dockerfile");
  }

  if (/privileged\s*:\s*true|--privileged/i.test(raw)) {
    findings.push({
      factor: "Privileged Mode Enabled",
      description: "The container runs in privileged mode, granting it full access to the host.",
      weight: 30,
    });
    recommendations.add("Remove privileged mode; grant only the specific Linux capabilities required");
  }

  if (/hostnetwork\s*:\s*true|hostpid\s*:\s*true/i.test(raw)) {
    findings.push({
      factor: "Host Namespace Sharing",
      description: "The pod shares the host's network or PID namespace, weakening workload isolation.",
      weight: 20,
    });
    recommendations.add("Avoid hostNetwork/hostPID unless strictly required");
  }

  if (/allowprivilegeescalation\s*:\s*true/i.test(raw)) {
    findings.push({
      factor: "Privilege Escalation Allowed",
      description: "allowPrivilegeEscalation is explicitly set to true in the security context.",
      weight: 15,
    });
    recommendations.add("Set allowPrivilegeEscalation: false in the pod's securityContext");
  }

  if (looksLikeManifest && !/resources\s*:/i.test(raw)) {
    findings.push({
      factor: "No Resource Limits",
      description: "No CPU/memory resource requests or limits are defined for this workload.",
      weight: 10,
    });
    recommendations.add("Define resource requests and limits to prevent noisy-neighbor and denial-of-service conditions");
  }

  if (/env\s*:/i.test(raw) && /(secret|password|token)\s*:\s*["']?[a-zA-Z0-9]{8,}/i.test(raw)) {
    findings.push({
      factor: "Secret in Plain Environment Variable",
      description: "A credential appears to be set directly as a plaintext environment variable.",
      weight: 20,
    });
    recommendations.add("Mount secrets from a Secret object or external secrets manager instead of inline env values");
  }

  if (looksLikeManifest && !/securitycontext/i.test(raw)) {
    findings.push({
      factor: "Missing securityContext",
      description: "No securityContext block was found to restrict container capabilities.",
      weight: 10,
    });
    recommendations.add("Add a securityContext with runAsNonRoot, readOnlyRootFilesystem, and dropped capabilities");
  }

  const score = Math.min(100, findings.reduce((sum, f) => sum + f.weight, 0));
  const verdict: ContainerVerdict = score >= 50 ? "Critical" : score >= 20 ? "Needs Hardening" : "Hardened";

  if (findings.length === 0) {
    recommendations.add("No common misconfigurations detected in this manifest");
  }

  return { score, verdict, findings, recommendations: Array.from(recommendations) };
}
