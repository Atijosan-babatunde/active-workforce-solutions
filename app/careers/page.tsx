import type { Metadata } from "next";
import ServiceHero from "@/components/ServiceHero";
import EnquiryWizard from "@/components/EnquiryWizard";
import { images } from "@/lib/content/images";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Active Workforce Solutions. We're always looking for experienced care, support and workforce professionals to work with us.",
};

export default function Page() {
  return (
    <>
      <ServiceHero
        eyebrow="Careers"
        h1="Work With Active Workforce Solutions"
        supportingCopy="We're always looking for experienced, professional people across our divisions. Tell us about yourself and the role you're looking for, and we'll be in touch."
        primaryButton="Apply Now"
        secondaryButton="Looking for our services instead?"
        primaryHref="#enquire"
        secondaryHref="/contact"
        image={images.workforceRecruitment}
      />
      <div id="enquire" className="mx-auto max-w-content px-6 py-16 md:py-20">
        <div className="max-w-2xl mx-auto">
          <EnquiryWizard sourcePage="careers" forcePath="professional" />
        </div>
      </div>
    </>
  );
}
