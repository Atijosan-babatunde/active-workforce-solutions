import type { Metadata } from "next";
import Image from "next/image";
import ServiceHero from "@/components/ServiceHero";
import CTASection from "@/components/CTASection";
import { images } from "@/lib/content/images";

export const metadata: Metadata = {
  title: "About Us",
  description: "Active Workforce Solutions is a trusted organisation providing specialist workforce, consultancy, recovery coordination, education and support services.",
};

export default function Page() {
  return (
    <>
      <ServiceHero
        eyebrow="About Us"
        h1="A Trusted Partner Across Workforce, Consultancy and Recovery"
        supportingCopy="Active Workforce Solutions brings together six specialist divisions under one organisation, united by the same standard of professionalism, partnership and measurable outcomes."
        primaryButton="Book a Consultation"
        secondaryButton="Explore Our Divisions"
        primaryHref="/contact"
        secondaryHref="/#divisions"
        image={images.aboutHero}
      />
      <div className="mx-auto max-w-content px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">Our objective</h2>
            <p className="text-ink/80 leading-relaxed">Our objective is to give organisations and individuals confidence that the practical details coordination, communication and delivery are being handled to a consistently professional standard, across every division we operate.</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">How we work</h2>
            <p className="text-ink/80 leading-relaxed">Every engagement follows the same client journey: Discover, Consult, Design, Deliver, Review and Improve. This gives clients and partners a consistent, predictable experience regardless of which division they are working with.</p>
          </div>
        </div>
        <div className="relative h-72 lg:h-96 rounded-card overflow-hidden">
          <Image src={images.homepageTeam} alt="" fill sizes="600px" className="object-cover" />
        </div>
      </div>
      <CTASection />
    </>
  );
}
