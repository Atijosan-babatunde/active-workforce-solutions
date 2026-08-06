import type { Metadata } from "next";
import ServiceHero from "@/components/ServiceHero";
import PermTempRecruitmentForm from "@/components/PermTempRecruitmentForm";
import { images } from "@/lib/content/images";

export const metadata: Metadata = {
  title: "Perm & Temp Recruitment | Active Workforce Solutions",
  description: "Tell us about the permanent or temporary role you're hiring for and our recruitment team will be in touch.",
};

export default function Page() {
  return (
    <>
      <ServiceHero
        eyebrow="Active Workforce Recruitment"
        h1="Perm & Temp Recruitment"
        supportingCopy="Tell us about the role you're hiring for — permanent or temporary — and a member of our recruitment team will be in touch to discuss how we can help."
        primaryButton="Submit Your Enquiry"
        secondaryButton="Looking to register instead?"
        primaryHref="#enquire"
        secondaryHref="/active-workforce-recruitment"
        image={images.workforceRecruitment}
      />
      <div id="enquire" className="mx-auto max-w-content px-6 py-16 md:py-20">
        <div className="max-w-2xl mx-auto">
          <PermTempRecruitmentForm />
        </div>
      </div>
    </>
  );
}
