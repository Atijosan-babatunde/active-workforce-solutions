import type { Metadata } from "next";
import Link from "next/link";
import ServiceHero from "@/components/ServiceHero";
import EnquiryWizard from "@/components/EnquiryWizard";
import { images } from "@/lib/content/images";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Active Workforce Solutions to discuss workforce solutions, consultancy, recovery coordination, education or facilities services.",
};

export default function Page({ searchParams }: { searchParams: { division?: string } }) {
  return (
    <>
      <ServiceHero eyebrow="Contact Us" h1="Speak to Our Team" supportingCopy="Tell us a little about what you need or the role you're looking for and we'll guide you through the rest, step by step." primaryButton="Get Started" secondaryButton="Looking to join our team?" primaryHref="#enquire" secondaryHref="/careers" image={images.contactHero} />
      <div id="enquire" className="mx-auto max-w-content px-6 py-16 md:py-20">
        <div className="max-w-2xl mx-auto">
          <EnquiryWizard sourcePage="contact" initialDivision={searchParams.division} />
          <p className="text-center text-sm text-ink/60 mt-6">
            Prefer to talk to us about joining the team instead?{" "}
            <Link href="/careers" className="text-navy font-semibold hover:underline">
              Visit our Careers page →
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
