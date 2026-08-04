import Image from "next/image";
import Link from "next/link";
import { Sparkles, Users, Award, MessageCircleHeart, ArrowRight, Briefcase } from "lucide-react";
import ServiceHero from "./ServiceHero";
import CTASection from "./CTASection";
import StaffBadge from "./StaffBadge";
import type { Division } from "@/lib/content/divisions";

type Props = {
  division: Division;
  image: string;
  secondaryImage?: string;
  offerBody: string;
  whoBody: string;
  showStaffBadge?: boolean;
  staffBadgeLabel?: string;
  /** Optional interactive engagement flow (e.g. a guided "Get Started" wizard), rendered full-width right after the hero. */
  engagementFlow?: React.ReactNode;
};

export default function DivisionLandingTemplate({ division, image, secondaryImage, offerBody, whoBody, showStaffBadge, staffBadgeLabel, engagementFlow }: Props) {
  return (
    <>
      <ServiceHero
        eyebrow="Active Workforce Solutions"
        h1={division.tagline}
        supportingCopy={division.summary}
        primaryButton="Book a Consultation"
        secondaryButton="Enquire Now"
        image={image}
        badge={showStaffBadge}
        badgeLabel={staffBadgeLabel}
      />

      {engagementFlow && (
        <div id="get-started" className="mx-auto max-w-content px-6 pt-16 md:pt-20">{engagementFlow}</div>
      )}

      <div className="mx-auto max-w-content px-6 py-16 md:py-20 grid lg:grid-cols-[1fr_360px] gap-16">
        <div className="space-y-10">
          <div className="rounded-card border border-line bg-white p-6">
            <div className="flex items-start gap-2.5 mb-3">
              <Sparkles size={18} className="text-gold mt-0.5 shrink-0" strokeWidth={2} />
              <h2 className="font-display text-lg text-navy">What we offer</h2>
            </div>
            <p className="text-ink/75 leading-relaxed">{offerBody}</p>
          </div>

          {secondaryImage && (
            <div className="relative h-72 md:h-96 rounded-card overflow-hidden">
              <Image src={secondaryImage} alt="" fill sizes="800px" className="object-cover" />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(6,12,28,0.85) 0%, rgba(6,12,28,0.1) 55%, rgba(6,12,28,0) 75%)" }}
              />
              <div className="absolute left-0 bottom-0 w-1.5 h-full bg-gold/80" />
              <p className="text-shadow-banner absolute bottom-6 left-8 right-8 font-display text-2xl md:text-3xl text-white">
                {division.name}
              </p>
              {showStaffBadge && <StaffBadge label={staffBadgeLabel} />}
            </div>
          )}

          <div className="rounded-card border border-line bg-white p-6">
            <div className="flex items-start gap-2.5 mb-3">
              <Users size={18} className="text-gold mt-0.5 shrink-0" strokeWidth={2} />
              <h2 className="font-display text-lg text-navy">Who we help</h2>
            </div>
            <p className="text-ink/75 leading-relaxed">{whoBody}</p>
          </div>

          <div className="rounded-card border border-line bg-white p-6">
            <div className="flex items-start gap-2.5 mb-3">
              <Award size={18} className="text-gold mt-0.5 shrink-0" strokeWidth={2} />
              <h2 className="font-display text-lg text-navy">Why choose Active Workforce Solutions</h2>
            </div>
            <p className="text-ink/75 leading-relaxed">
              As part of Active Workforce Solutions, this division draws on the same standards of
              professionalism, partnership and measurable outcomes across every engagement.
            </p>
          </div>
        </div>

        <aside id="enquire" className="lg:sticky lg:top-28 h-fit bg-white border border-line rounded-card p-7 shadow-lg shadow-navy/5">
          <div className="flex items-center gap-2.5 mb-1">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-goldtint text-golddark shrink-0">
              <MessageCircleHeart size={18} strokeWidth={2} />
            </span>
            <h2 className="font-display text-xl text-navy">Make an Enquiry</h2>
          </div>
          <p className="text-sm text-ink/70 mb-5">
            Tell us a little about your requirements in a few quick steps and a member of our team will be in touch.
          </p>
          <Link
            href={`/contact?division=${division.slug}`}
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

      <CTASection
        heading="Speak to Our Team"
        body={`Discuss your requirements with a member of the ${division.name} team.`}
      />
    </>
  );
}
