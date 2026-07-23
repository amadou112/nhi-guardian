import type { MetadataRoute } from "next";
import { TOOL_KEYS } from "@/lib/i18n/dictionary";
import { TOOL_ROUTES, AI_FEATURE_TOOL_KEYS } from "@/lib/toolsMeta";

const SITE_URL = "https://frontend-sandy-nine-57.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/dashboard",
    "/identities",
    "/threat-map",
    "/ai-assistant",
    "/reports",
    "/playbook",
    "/tools",
  ];

  const toolRoutes = [...TOOL_KEYS, ...AI_FEATURE_TOOL_KEYS].map((key) => TOOL_ROUTES[key]);
  const lastModified = new Date();

  return [...staticRoutes, ...toolRoutes].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
