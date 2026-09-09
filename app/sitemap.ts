import type { MetadataRoute } from "next";
import { divisions } from "@/lib/content/divisions";
import { recoveryConciergePages } from "@/lib/content/recovery-concierge";
import { blogPosts } from "@/lib/content/blog";

const base = "https://www.activeworkforcesolutions.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/contact", "/resources", "/blog"].map((path) => ({
    url: `${base}${path}`,
  }));

  const divisionRoutes = divisions.map((d) => ({ url: `${base}/${d.slug}` }));

  const recoveryRoutes = recoveryConciergePages
    .slice(1)
    .map((p) => ({ url: `${base}/active-recovery-concierge/${p.slug}` }));

  const blogRoutes = blogPosts.map((p) => ({ url: `${base}/blog/${p.slug}` }));

  return [...staticRoutes, ...divisionRoutes, ...recoveryRoutes, ...blogRoutes];
}
