import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import { divisions } from "@/lib/content/divisions";

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
        <div className="mx-auto max-w-content px-6 py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/60">
          <p>© {new Date().getFullYear()} Active Workforce Solutions Ltd. Company number [TO BE CONFIRMED]. Registered office: [TO BE CONFIRMED].</p>
          {/* <p>This website provides non-clinical information. It is not a substitute for advice from a regulated professional.</p> */}
        </div>
      </div>
    </footer>
  );
}
