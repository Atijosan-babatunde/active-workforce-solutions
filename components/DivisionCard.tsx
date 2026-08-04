import Link from "next/link";
import Image from "next/image";
import type { Division } from "@/lib/content/divisions";
import IconBadge from "./IconBadge";

export default function DivisionCard({ division, image }: { division: Division; image: string }) {
  return (
    <Link
      href={`/${division.slug}`}
      className="group block bg-white border border-line rounded-card overflow-hidden hover:shadow-lg hover:shadow-navy/10 transition-all"
    >
      <div className="relative h-40">
        <Image src={image} alt="" fill sizes="400px" className="object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/0 to-transparent" />
        <div className="absolute -bottom-5 left-5 ring-4 ring-white rounded-full">
          <IconBadge icon={division.icon} color={division.color} size="md" />
        </div>
      </div>
      <div className="p-6 pt-8">
        <p className="font-display text-lg text-navy mb-2">{division.name}</p>
        <p className="text-sm text-gold font-semibold mb-3">{division.tagline}</p>
        <p className="text-sm text-ink/70 leading-relaxed">{division.summary}</p>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy mt-4">
          Learn more
          <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
