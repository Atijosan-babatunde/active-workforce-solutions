import Link from "next/link";
import { MessageCircleHeart, ArrowRight, Briefcase } from "lucide-react";
import ServiceHero from "./ServiceHero";
import ContentSections from "./ContentSections";
import FAQAccordion from "./FAQAccordion";
import StaffBadge from "./StaffBadge";
import type { ServicePage } from "@/lib/content/recovery-concierge";
import { images } from "@/lib/content/images";

export default function ServicePageTemplate({ page }: { page: ServicePage }) {
  const heroImage = images.recovery[page.slug] ?? images.recovery["active-recovery-concierge"];
  const midSections = page.sections.slice(0, Math.ceil(page.sections.length / 2));
  const restSections = page.sections.slice(Math.ceil(page.sections.length / 2));

  return (
    <>
      <ServiceHero
        eyebrow={page.eyebrow}
        h1={page.h1}
        supportingCopy={page.supportingCopy}
        primaryButton={page.primaryButton}
        secondaryButton={page.secondaryButton}
        image={heroImage}
        imageAlt=""
        badge
        badgeLabel="AWS Recovery Coordinator"
      />

      <div className="mx-auto max-w-content px-6 py-16 md:py-20 grid lg:grid-cols-[1fr_360px] gap-16">
        <div className="space-y-14">
          <ContentSections sections={midSections} />

          {restSections.length > 0 && (
            <>
              <div className="relative h-72 md:h-96 rounded-card overflow-hidden group">
                <img src={heroImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(6,12,28,0.85) 0%, rgba(6,12,28,0.1) 55%, rgba(6,12,28,0) 75%)" }}
                />
                <div className="absolute left-0 bottom-0 w-1.5 h-full bg-gold/80" />
                <p className="text-shadow-banner absolute bottom-6 left-8 right-8 font-display text-2xl md:text-3xl text-white">
                  {page.title === "Overview" ? "Active Recovery Concierge" : page.title}
                </p>
                <StaffBadge label="AWS Recovery Coordinator" />
              </div>
              <ContentSections sections={restSections} />
            </>
          )}

          {page.faqs.length > 0 && (
            <div>
              <h2 className="font-display text-2xl text-navy mb-4">Frequently Asked Questions</h2>
              <FAQAccordion faqs={page.faqs} />
            </div>
          )}
        </div>

        <aside id="enquire" className="lg:sticky lg:top-28 h-fit bg-white border border-line rounded-card p-7 shadow-lg shadow-navy/5">
          <div className="flex items-center gap-2.5 mb-1">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-goldtint text-golddark shrink-0">
              <MessageCircleHeart size={18} strokeWidth={2} />
            </span>
            <h2 className="font-display text-xl text-navy">Make an Enquiry</h2>
          </div>
          <p className="text-sm text-ink/70 mb-5">A member of our recovery team will respond to confirm next steps.</p>
          <Link
            href="/contact?division=active-recovery-concierge"
            className="flex items-center justify-center gap-2 rounded-full bg-navy text-white font-medium px-6 py-3 hover:bg-navy2 transition-colors"
          >
            Start Your Enquiry <ArrowRight size={16} />
          </Link>

          <div className="mt-6 pt-6 border-t border-line flex items-start gap-2.5">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-silvertint text-muted shrink-0">
              <Briefcase size={16} strokeWidth={2} />
            </span>
            <p className="text-sm text-ink/70">
              Looking to work with us instead?{" "}
              <Link href="/careers" className="text-navy font-semibold hover:underline">
                Visit our Careers page →
              </Link>
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
