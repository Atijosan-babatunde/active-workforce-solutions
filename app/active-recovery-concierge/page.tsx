import type { Metadata } from "next";
import Link from "next/link";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { recoveryConciergePages } from "@/lib/content/recovery-concierge";

const page = recoveryConciergePages[0];

export const metadata: Metadata = {
  title: page.seoTitle,
  description: page.seoDescription,
};

export default function Page() {
  const subPages = recoveryConciergePages.slice(1);
  return (
    <>
      <ServicePageTemplate page={page} />

      <section className="bg-sand border-t border-line">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="font-display text-2xl text-navy mb-8">Explore Active Recovery Concierge</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {subPages.map((p) => (
              <Link
                key={p.slug}
                href={`/active-recovery-concierge/${p.slug}`}
                className="block bg-white border border-line rounded-card p-5 hover:border-teal transition-colors"
              >
                <p className="font-medium text-ink">{p.title}</p>
                <p className="text-sm text-ink/60 mt-1.5">{p.supportingCopy.slice(0, 90)}…</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
