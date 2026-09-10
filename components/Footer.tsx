import Link from "next/link";
import { Phone, MessageCircle, Instagram, Facebook, Linkedin } from "lucide-react";
import { divisions } from "@/lib/content/divisions";

// lucide-react has no TikTok glyph — a small inline SVG, same approach as
// the WhatsApp icon in components/WhatsAppButton.tsx.
function TikTokIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.82c-1.02-.9-1.6-2.19-1.6-3.62h-3.15v13.4c0 1.6-1.3 2.9-2.9 2.9a2.9 2.9 0 0 1 0-5.8c.3 0 .58.04.85.12V9.6a6.1 6.1 0 0 0-.85-.06 6.06 6.06 0 1 0 6.06 6.06V9.4a7.14 7.14 0 0 0 4.16 1.33V7.6a3.98 3.98 0 0 1-2.57-1.78Z" />
    </svg>
  );
}

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/activerecoveryconcierge?stkn=aTA1MWZ6c3JyYmhl&utm_source=qr", icon: Instagram },
  { label: "TikTok", href: "#", icon: TikTokIcon },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "Facebook", href: "https://www.facebook.com/share/1DgvzpzLL2/?mibextid=wwXIfr", icon: Facebook },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white/80 mt-24">
      <div className="mx-auto max-w-content px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <p className="font-display text-lg text-white mb-3">Active Workforce Solutions</p>
          <p className="text-sm leading-relaxed mb-4">Specialist workforce, consultancy, recovery coordination, education and support services.</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="tel:+441603336018" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone size={14} className="shrink-0" strokeWidth={2} /> 01603 336018
              </a>
            </li>
            <li>
              <a href="https://wa.me/447943553777" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                <MessageCircle size={14} className="shrink-0" strokeWidth={2} /> WhatsApp 07943 553777
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium text-white mb-3">Divisions</p>
          <ul className="space-y-2 text-sm">
            {divisions.map((d) => (
              <li key={d.slug}>
                <Link href={`/${d.slug}`} className="hover:text-white transition-colors">
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium text-white mb-3">Company</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/resources" className="hover:text-white transition-colors">
                Resources
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/accessibility" className="hover:text-white transition-colors">
                Accessibility Statement
              </Link>
            </li>
            <li>
              <Link href="/complaints" className="hover:text-white transition-colors">
                Complaints &amp; Feedback
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium text-white mb-3">Legal</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Notice
              </Link>
            </li>
            <li>
              <Link href="/cookie-policy" className="hover:text-white transition-colors">
                Cookie Notice
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Website Use
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-content px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/60">
          <p>© {new Date().getFullYear()} Active Workforce Solutions Ltd. Company number 14242200.</p>

          {/* <p>This website provides non-clinical information. It is not a substitute for advice from a regulated professional.</p> */}

          <div className="flex items-center gap-3">
            {socialLinks.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors">
                <s.icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
