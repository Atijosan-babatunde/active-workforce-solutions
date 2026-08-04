import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { recoveryConciergePages, getRecoveryPage } from "@/lib/content/recovery-concierge";

export function generateStaticParams() {
  return recoveryConciergePages
    .slice(1) // the first entry is the /active-recovery-concierge index itself
    .map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = getRecoveryPage(params.slug);
  if (!page) return {};
  return { title: page.seoTitle, description: page.seoDescription };
}

export default function Page({ params }: { params: { slug: string } }) {
  const page = getRecoveryPage(params.slug);
  if (!page || page.slug === "active-recovery-concierge") return notFound();
  return <ServicePageTemplate page={page} />;
}
