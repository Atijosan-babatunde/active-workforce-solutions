import Image from "next/image";

type Props = {
  eyebrow: string;
  h1: string;
  supportingCopy: string;
  primaryButton: string;
  secondaryButton: string;
  primaryHref?: string;
  secondaryHref?: string;
  image: string;
  imageAlt?: string;
};

export default function ServiceHero({
  eyebrow, h1, supportingCopy, primaryButton, secondaryButton,
  primaryHref = "#enquire", secondaryHref = "#how-it-works",
  image, imageAlt = "",
}: Props) {
  return (
    <section className="relative overflow-hidden bg-navy text-white min-h-[600px] md:min-h-[660px] flex items-end">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="hero-image object-cover"
        />
      </div>

      {/* Diagonal scrim: strong enough behind the text for contrast, but the photo reads clearly across the rest of the frame — bolder than a flat wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(75deg, rgba(6,12,28,0.92) 0%, rgba(6,12,28,0.72) 30%, rgba(11,24,54,0.25) 60%, rgba(11,24,54,0.05) 85%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(6,12,28,0.85) 0%, rgba(6,12,28,0) 45%)" }}
      />
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-gold via-gold to-gold/40 hidden md:block" />

      <div className="relative mx-auto max-w-content px-6 py-16 md:py-20 w-full">
        <span className="inline-flex items-center gap-2 eyebrow text-navydeep bg-gold rounded-full px-4 py-1.5 mb-5 shadow-lg shadow-black/20">
          {eyebrow}
        </span>
        <h1 className="text-shadow-banner font-display text-4xl md:text-6xl leading-[1.05] max-w-2xl">{h1}</h1>
        <p className="text-shadow-banner mt-6 text-white/90 max-w-xl leading-relaxed text-lg">{supportingCopy}</p>
        <div className="mt-9 flex flex-wrap gap-4">
          <a href={primaryHref} className="rounded-full bg-gold text-navydeep font-semibold px-7 py-3.5 hover:bg-gold/90 hover:-translate-y-0.5 transition-all shadow-xl shadow-black/30">
            {primaryButton}
          </a>
          <a href={secondaryHref} className="rounded-full border-2 border-white/50 text-white font-semibold px-7 py-3.5 hover:bg-white hover:text-navydeep transition-colors">
            {secondaryButton}
          </a>
        </div>
      </div>
    </section>
  );
}
