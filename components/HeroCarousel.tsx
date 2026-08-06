"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Slide = {
  slug: string;
  name: string;
  summary: string;
  image: string;
};

export default function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [index, slides.length]);

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Our divisions"
      className="relative overflow-hidden bg-navy text-white h-[680px] md:h-[760px]"
    >
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-gold via-gold to-gold/40 hidden md:block z-20" />

      <div
        className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={slide.slug} className="relative w-full h-full shrink-0 flex items-center">
            <div className="absolute inset-0 overflow-hidden">
              <Image src={slide.image} alt="" fill priority={i === 0} sizes="100vw" className="hero-image object-cover" />
            </div>
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(80deg, rgba(6,12,28,0.94) 0%, rgba(6,12,28,0.75) 32%, rgba(11,24,54,0.3) 62%, rgba(11,24,54,0.08) 88%)",
              }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,12,28,0.75) 0%, rgba(6,12,28,0) 50%)" }} />

            <div className="relative mx-auto max-w-content px-6 py-24 md:py-32">
              <span className="inline-flex items-center gap-2 eyebrow text-navydeep bg-gold rounded-full px-4 py-1.5 mb-6 shadow-lg shadow-black/20">
                Our Divisions
              </span>
              <h1 className="text-shadow-banner font-display text-5xl md:text-7xl leading-[1.02] max-w-3xl">{slide.name}</h1>
              <p className="text-shadow-banner mt-7 text-white/90 max-w-xl leading-relaxed text-lg">{slide.summary}</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href="/contact" className="rounded-full bg-gold text-navydeep font-semibold px-8 py-4 hover:bg-gold/90 hover:-translate-y-0.5 transition-all shadow-xl shadow-black/30">
                  Book a Consultation
                </a>
                <a href={`/${slide.slug}`} className="rounded-full border-2 border-white/50 text-white font-semibold px-8 py-4 hover:bg-white hover:text-navydeep transition-colors">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 inset-x-0 flex items-center justify-center gap-2 z-20">
        {slides.map((slide, i) => (
          <button
            key={slide.slug}
            type="button"
            aria-label={`Show ${slide.name}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-gold" : "w-2 bg-white/40 hover:bg-white/60"}`}
          />
        ))}
      </div>
    </section>
  );
}
