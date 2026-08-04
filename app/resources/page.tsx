import type { Metadata } from "next";
import ServiceHero from "@/components/ServiceHero";
import { recoveryConciergePages } from "@/lib/content/recovery-concierge";
import { images } from "@/lib/content/images";

export const metadata: Metadata = {
  title: "Resources",
  description: "Guides, capability statements and insights from across Active Workforce Solutions' divisions.",
};

const recoveryResources = recoveryConciergePages.find((p) => p.slug === "resources-faqs");

export default function Page() {
  const resources = recoveryResources?.sections.find((s) => s.list)?.list ?? [];
  return (
    <>
      <ServiceHero
        eyebrow="Resources"
        h1="Guides, Capability Statements and Insights"
        supportingCopy="Practical resources from across our divisions, including recovery planning guides from Active Recovery Concierge."
        primaryButton="Speak to Our Team"
        secondaryButton="Explore Our Divisions"
        primaryHref="/contact"
        secondaryHref="/#divisions"
        image={images.recovery["resources-faqs"]}
      />
      <div className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-display text-2xl text-navy mb-6">Active Recovery Concierge resources</h2>
        <ul className="grid sm:grid-cols-2 gap-4 max-w-3xl">
          {resources.map((r) => (
            <li key={r} className="bg-white border border-line rounded-card p-5 text-ink/80">{r}</li>
          ))}
        </ul>
        <p className="text-sm text-ink/60 mt-6">
          Resources from other divisions will appear here as they become available.
        </p>
      </div>
    </>
  );
}
