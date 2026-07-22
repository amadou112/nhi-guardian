import type { MetadataRoute } from "next";

const SITE_URL = "https://frontend-sandy-nine-57.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
