"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { getDivision } from "@/lib/content/divisions";
import { getRecoveryPage } from "@/lib/content/recovery-concierge";

// Segments that aren't division slugs or Recovery Concierge sub-pages —
// filled in by hand since there's no content file to look them up in.
const STATIC_LABELS: Record<string, string> = {
  about: "About Us",
  contact: "Contact Us",
  careers: "Careers",
  resources: "Resources",
  "privacy-policy": "Privacy Notice",
  "cookie-policy": "Cookie Notice",
  terms: "Terms of Website Use",
  complaints: "Complaints & Feedback",
  accessibility: "Accessibility Statement",
  portal: "Client Portal",
  login: "Log In",
  "perm-temp": "Perm & Temp Recruitment",
};

function labelFor(segment: string, ancestors: string[]): string {
  const division = getDivision(segment);
  if (division) return division.name;

  if (ancestors[ancestors.length - 1] === "active-recovery-concierge") {
    const page = getRecoveryPage(segment);
    if (page) return page.title;
  }

  if (STATIC_LABELS[segment]) return STATIC_LABELS[segment];

  return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  if (!pathname || pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((segment, i) => ({
    href: "/" + segments.slice(0, i + 1).join("/"),
    label: labelFor(segment, segments.slice(0, i)),
  }));
  const parentHref = segments.length > 1 ? "/" + segments.slice(0, -1).join("/") : "/";

  return (
    <nav aria-label="Breadcrumb" className="bg-sand border-b border-line">
      <div className="mx-auto max-w-content px-6 py-3 flex items-center gap-3 text-sm overflow-x-auto">
        <Link href={parentHref} className="flex items-center gap-1.5 font-medium text-navy hover:text-teal transition-colors shrink-0">
          <ArrowLeft size={15} strokeWidth={2} /> Back
        </Link>
        <span className="text-line shrink-0" aria-hidden="true">|</span>
        <ol className="flex items-center gap-1.5 text-muted shrink-0">
          <li>
            <Link href="/" className="hover:text-navy transition-colors">Home</Link>
          </li>
          {crumbs.map((crumb, i) => (
            <li key={crumb.href} className="flex items-center gap-1.5">
              <ChevronRight size={14} className="text-line shrink-0" aria-hidden="true" />
              {i === crumbs.length - 1 ? (
                <span className="text-navy font-medium" aria-current="page">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="hover:text-navy transition-colors">{crumb.label}</Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
