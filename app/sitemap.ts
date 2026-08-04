import type { MetadataRoute } from "next";
import { divisions } from "@/lib/content/divisions";
import { recoveryConciergePages } from "@/lib/content/recovery-concierge";

const base = "https://www.activeworkforcesolutions.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/contact", "/resources"].map((path) => ({
    url: `${base}${path}`,
  }));

  const divisionRoutes = divisions.map((d) => ({ url: `${base}/${d.slug}` }));

  const recoveryRoutes = recoveryConciergePages
    .slice(1)
    .map((p) => ({ url: `${base}/active-recovery-concierge/${p.slug}` }));

  return [...staticRoutes, ...divisionRoutes, ...recoveryRoutes];
}
