import { Sparkles } from "lucide-react";
import { images } from "@/lib/content/images";

export default function CTASection({
  heading = "Ready to Strengthen Your Organisation?",
  body,
  primaryLabel = "Book Consultation",
  primaryHref = "/contact",
  secondaryLabel = "Speak to Our Team",
  secondaryHref = "/contact",
  image = images.ctaBackground,
}: {
  heading?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  image?: string;
}) {
  return (
    <section className="relative bg-navy bg-fixed bg-cover" style={{ backgroundImage: `url(${image})`, backgroundPosition: "center 22%" }}>
      {/* Logo watermark sits in the plain wall space above the group's heads.
          mix-blend-soft-light keeps it visible on both the light wall and darker clothing. */}
      {/* <div className="absolute inset-x-0 top-6 md:top-10 flex justify-center overflow-hidden pointer-events-none">
        <img
          src="/logo.png"
          alt=""
          aria-hidden="true"
          className="w-[280px] md:w-[360px] h-auto opacity-70 mix-blend-soft-light select-none"
        />
      </div> */}

      <div className="absolute inset-0" style={{ background: "rgba(6,12,28,0.4)" }} />

      <div className="relative mx-auto max-w-content px-6 py-16 text-center">
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold text-navydeep mb-5 shadow-md shadow-navy/10">
          <Sparkles size={22} strokeWidth={2} />
        </span>
        <h2 className="font-display text-3xl text-white">{heading}</h2>
        {body && <p className="mt-3 text-white/75 max-w-xl mx-auto">{body}</p>}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a href={primaryHref} className="rounded-full bg-gold text-navydeep font-medium px-6 py-3 hover:bg-gold/90 transition-colors">
            {primaryLabel}
          </a>
          <a href={secondaryHref} className="rounded-full border border-white/30 text-white font-medium px-6 py-3 hover:bg-white/10 transition-colors">
            {secondaryLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
