import ServiceHero from "./ServiceHero";
import ContentSections from "./ContentSections";
import FAQAccordion from "./FAQAccordion";
import CTASection from "./CTASection";
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
        primaryHref={page.primaryHref ?? "/contact?division=active-recovery-concierge"}
        secondaryHref={page.secondaryHref ?? "/contact?division=active-recovery-concierge"}
        image={heroImage}
        imageAlt=""
      />

      <div className="mx-auto max-w-content px-6 py-16 md:py-20">
        <div className="max-w-3xl mx-auto space-y-14">
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
      </div>

      <CTASection
        heading="Make an Enquiry"
        body="A member of our recovery team will respond to confirm next steps."
        primaryLabel="Start Your Enquiry"
        primaryHref="/contact?division=active-recovery-concierge"
        secondaryLabel="Visit our Careers Page"
        secondaryHref="/careers"
      />
    </>
  );
}
