import Image from "next/image";
import DivisionCard from "@/components/DivisionCard";
import CTASection from "@/components/CTASection";
import IconBadge from "@/components/IconBadge";
import HeroCarousel from "@/components/HeroCarousel";
import { divisions } from "@/lib/content/divisions";
import { images } from "@/lib/content/images";
import { Award, ShieldCheck, Lightbulb, Handshake, Sparkles, BarChart3, Search, MessagesSquare, PenTool, Send, ClipboardCheck, TrendingUp, BadgeCheck, Clock, HeartHandshake } from "lucide-react";

const divisionImages: Record<string, string> = {
  "active-recovery-concierge": images.recovery["active-recovery-concierge"],
  "active-quality-academy": images.qualityAcademy,
  "active-provider-solutions": images.providerSolutions,
  "active-accommodation-solutions": images.accommodation,
  "active-workforce-recruitment": images.workforceRecruitment,
  "active-facilities": images.facilities,
};

const differentiators = [
  { title: "Expertise", body: "Deep, practical experience across workforce, consultancy and recovery coordination.", icon: Award, color: "gold" as const },
  { title: "Professionalism", body: "A discreet, consistent standard of service in every engagement.", icon: ShieldCheck, color: "navy" as const },
  { title: "Practical Solutions", body: "Guidance built for real operational and personal circumstances, not theory.", icon: Lightbulb, color: "sky" as const },
  { title: "Partnership", body: "We work alongside your existing teams and professionals, not around them.", icon: Handshake, color: "sage" as const },
  { title: "Innovation", body: "Continually refining how services are coordinated and delivered.", icon: Sparkles, color: "rose" as const },
  { title: "Measurable Outcomes", body: "Clear plans, documented actions and outcomes you can track.", icon: BarChart3, color: "gold" as const },
];

const journey = [
  { label: "Discover", icon: Search },
  { label: "Consult", icon: MessagesSquare },
  { label: "Design", icon: PenTool },
  { label: "Deliver", icon: Send },
  { label: "Review", icon: ClipboardCheck },
  { label: "Improve", icon: TrendingUp },
];

const trustBar = [
  { label: "Experienced Practitioners", icon: BadgeCheck },
  { label: "Compliance-Aware Delivery", icon: ShieldCheck },
  { label: "Responsive Coordination", icon: Clock },
  { label: "Professional Standards", icon: Award },
  { label: "Client-Focused Service", icon: HeartHandshake },
];

const testimonials = [
  { quote: "A calm, coordinated point of contact when we needed it most.", name: "Private client family", image: images.recovery["family-recovery-coordination"] },
  { quote: "Professional from the first call to the final handover.", name: "Referring case manager", image: images.providerSolutions },
  { quote: "Exactly the premium, organised experience we were looking for.", name: "Corporate partner", image: images.homepageTeam },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <HeroCarousel
        slides={divisions.map((d) => ({ slug: d.slug, name: d.name, summary: d.summary, image: divisionImages[d.slug] }))}
      />

      {/* Trust bar */}
      <section className="bg-navydeep text-white/90">
        <div className="mx-auto max-w-content px-6 py-6 flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm font-medium">
          {trustBar.map(({ label, icon: Icon }) => (
            <span key={label} className="inline-flex items-center gap-2">
              <Icon size={16} className="text-gold" strokeWidth={2} />
              {label}
            </span>
          ))}
        </div>
      </section>

      {/* Six divisions */}
      <section id="divisions" className="mx-auto max-w-content px-6 py-20">
        <p className="eyebrow text-gold mb-3">Our Divisions</p>
        <h2 className="font-display text-3xl text-navy max-w-xl">Six specialist divisions, one coordinated organisation</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {divisions.map((d) => (
            <DivisionCard key={d.slug} division={d} image={divisionImages[d.slug]} />
          ))}
        </div>
      </section>

      {/* Why choose us — image + list split */}
      <section className="bg-white border-y border-line">
        <div className="mx-auto max-w-content px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="eyebrow text-gold mb-3">Why Choose Us</p>
            <h2 className="font-display text-3xl text-navy mb-8">What sets Active Workforce Solutions apart</h2>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-7">
              {differentiators.map((d) => (
                <div key={d.title} className="flex gap-4">
                  <IconBadge icon={d.icon} color={d.color} size="md" />
                  <div>
                    <p className="font-display text-base text-navy mb-1">{d.title}</p>
                    <p className="text-sm text-ink/70 leading-relaxed">{d.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-80 lg:h-[420px] rounded-card overflow-hidden">
            <Image src={images.homepageWhyChoose} alt="" fill sizes="600px" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Client journey */}
      {/* <section className="mx-auto max-w-content px-6 py-20">
        <p className="eyebrow text-gold mb-3">Client Journey</p>
        <h2 className="font-display text-3xl text-navy max-w-xl mb-12">A clear, structured path from first contact to ongoing improvement</h2>
        <ol className="grid grid-cols-2 md:grid-cols-6 gap-6">
          {journey.map((step) => (
            <li key={step.label} className="text-center">
              <div className="mx-auto w-14 h-14 rounded-full bg-navy text-gold flex items-center justify-center shadow-md shadow-navy/20">
                <step.icon size={24} strokeWidth={2} />
              </div>
              <p className="mt-3 font-medium text-ink text-sm">{step.label}</p>
            </li>
          ))}
        </ol>
      </section> */}

      {/* Testimonials with photos */}
      <section className="bg-navy">
        <div className="mx-auto max-w-content px-6 py-20">
          <p className="eyebrow text-gold mb-3">Testimonials</p>
          <h2 className="font-display text-3xl text-white max-w-xl mb-10">What our clients and partners say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <blockquote key={t.name} className="bg-white rounded-card border border-line overflow-hidden">
                <div className="relative h-36">
                  <Image src={t.image} alt="" fill sizes="400px" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                </div>
                <div className="p-6">
                  <p className="font-display text-lg text-ink leading-snug">&ldquo;{t.quote}&rdquo;</p>
                  <footer className="mt-4 text-sm text-muted">{t.name}</footer>
                </div>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      {/* <section className="mx-auto max-w-content px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="eyebrow text-gold mb-3">Resources</p>
          <h2 className="font-display text-3xl text-navy mb-4">Guides, capability statements and insights</h2>
          <p className="text-ink/70 mb-8">Downloadable guides and articles from across our divisions, including practical resources from Active Recovery Concierge.</p>
          <a href="/resources" className="inline-flex items-center gap-1.5 text-navy font-semibold">
            View all resources <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="relative h-56 rounded-card overflow-hidden">
          <Image src={images.recovery["resources-faqs"]} alt="" fill sizes="600px" className="object-cover" />
        </div>
      </section> */}

      <CTASection heading="Ready to Strengthen Your Organisation?" body="Speak to our team about workforce solutions, consultancy, recovery coordination or training for your organisation or family." />
    </>
  );
}
