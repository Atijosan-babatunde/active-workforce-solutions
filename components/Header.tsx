"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Briefcase, UserPlus, LogIn } from "lucide-react";
import { divisions } from "@/lib/content/divisions";
import { recoveryConciergePages } from "@/lib/content/recovery-concierge";
import IconBadge from "./IconBadge";

const otherDivisions = divisions.filter((d) => d.slug !== "active-workforce-recruitment" && d.slug !== "active-recovery-concierge");

type MenuKey = "what-we-do" | "recovery-concierge" | "recruitment";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!openMenu) return;

    function handleOutsideOrEscape(e: MouseEvent | KeyboardEvent) {
      if (e instanceof KeyboardEvent && e.key === "Escape") {
        setOpenMenu(null);
        return;
      }
      if (e instanceof MouseEvent && navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }

    document.addEventListener("mousedown", handleOutsideOrEscape);
    document.addEventListener("keydown", handleOutsideOrEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideOrEscape);
      document.removeEventListener("keydown", handleOutsideOrEscape);
    };
  }, [openMenu]);

  return (
    <header className="sticky top-0 z-50 bg-sand/95 backdrop-blur border-b border-line">
      <div className="mx-auto max-w-content px-6 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Active Workforce Solutions — home">
          <Image src="/logo.png" alt="Active Workforce Solutions" width={220} height={46} className="h-9 w-auto" priority />
        </Link>

        <nav ref={navRef} className="hidden lg:flex items-center gap-6 text-sm whitespace-nowrap" aria-label="Primary">
          <Link href="/about" className="text-ink hover:text-teal transition-colors">
            About Us
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("what-we-do")}
            onMouseLeave={() => setOpenMenu((m) => (m === "what-we-do" ? null : m))}
          >
            <button
              className="flex items-center gap-1 text-ink hover:text-teal transition-colors"
              aria-haspopup="true"
              aria-expanded={openMenu === "what-we-do"}
              onClick={() => setOpenMenu((m) => (m === "what-we-do" ? null : "what-we-do"))}
            >
              What We Do
            </button>
            {openMenu === "what-we-do" && (
              <div className="absolute left-0 top-full pt-3">
                <ul className="w-80 bg-white border border-line rounded-card shadow-lg p-2">
                  {otherDivisions.map((d) => (
                    <li key={d.slug}>
                      <Link
                        href={`/${d.slug}`}
                        onClick={() => setOpenMenu(null)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-sand text-ink"
                      >
                        <IconBadge icon={d.icon} color={d.color} size="sm" />
                        {d.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("recovery-concierge")}
            onMouseLeave={() => setOpenMenu((m) => (m === "recovery-concierge" ? null : m))}
          >
            <button
              className="flex items-center gap-1 text-ink hover:text-teal transition-colors"
              aria-haspopup="true"
              aria-expanded={openMenu === "recovery-concierge"}
              onClick={() => setOpenMenu((m) => (m === "recovery-concierge" ? null : "recovery-concierge"))}
            >
              Recovery Concierge
            </button>
            {openMenu === "recovery-concierge" && (
              <div className="absolute left-0 top-full pt-3">
                <ul className="w-80 bg-white border border-line rounded-card shadow-lg p-2 max-h-[26rem] overflow-y-auto">
                  {recoveryConciergePages.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={p.slug === "active-recovery-concierge" ? "/active-recovery-concierge" : `/active-recovery-concierge/${p.slug}`}
                        onClick={() => setOpenMenu(null)}
                        className="block px-3 py-2.5 rounded-md hover:bg-sand text-ink"
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("recruitment")}
            onMouseLeave={() => setOpenMenu((m) => (m === "recruitment" ? null : m))}
          >
            <button
              className="flex items-center gap-1 text-ink hover:text-teal transition-colors"
              aria-haspopup="true"
              aria-expanded={openMenu === "recruitment"}
              onClick={() => setOpenMenu((m) => (m === "recruitment" ? null : "recruitment"))}
            >
              Workforce Recruitment
            </button>
            {openMenu === "recruitment" && (
              <div className="absolute left-0 top-full pt-3">
                <ul className="w-72 bg-white border border-line rounded-card shadow-lg p-2">
                  <li>
                    <Link
                      href="/active-workforce-recruitment/perm-temp"
                      onClick={() => setOpenMenu(null)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-sand text-ink"
                    >
                      <IconBadge icon={Briefcase} color="gold" size="sm" />
                      Perm &amp; Temp Recruitment
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/active-workforce-recruitment"
                      onClick={() => setOpenMenu(null)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-sand text-ink"
                    >
                      <IconBadge icon={UserPlus} color="gold" size="sm" />
                      Register with Us
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <Link href="/resources" className="text-ink hover:text-teal transition-colors">
            Resources
          </Link>
          <Link href="/contact" className="text-ink hover:text-teal transition-colors">
            Contact Us
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <Link
            href="/portal/login"
            aria-label="Log in to your account"
            title="Log in to your account"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full text-muted hover:text-navy hover:bg-sand transition-colors shrink-0"
          >
            <LogIn size={17} />
          </Link>
          <Link href="/contact" className="inline-flex items-center whitespace-nowrap shrink-0 rounded-full bg-navy text-white px-5 py-2.5 text-sm font-medium hover:bg-navy2 transition-colors">
            Book a Consultation
          </Link>
        </div>

        <button className="lg:hidden p-2 -mr-2" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          <span className="block w-6 h-0.5 bg-ink mb-1.5" />
          <span className="block w-6 h-0.5 bg-ink mb-1.5" />
          <span className="block w-6 h-0.5 bg-ink" />
        </button>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-line bg-sand px-6 py-4" aria-label="Mobile">
          <ul className="flex flex-col gap-1">
            <li>
              <Link href="/about" className="block py-2.5 text-ink" onClick={() => setOpen(false)}>
                About Us
              </Link>
            </li>
            {otherDivisions.map((d, i) => (
              <li key={d.slug} className={i === 0 ? "pt-2 mt-2 border-t border-line" : undefined}>
                <Link href={`/${d.slug}`} className="flex items-center gap-3 py-2.5 text-ink" onClick={() => setOpen(false)}>
                  <IconBadge icon={d.icon} color={d.color} size="sm" />
                  {d.name}
                </Link>
              </li>
            ))}
            <li className="pt-2 mt-2 border-t border-line">
              <span className="block py-1.5 text-xs font-semibold uppercase tracking-wide text-muted">Active Recovery Concierge</span>
            </li>
            {recoveryConciergePages.map((p) => (
              <li key={p.slug}>
                <Link
                  href={p.slug === "active-recovery-concierge" ? "/active-recovery-concierge" : `/active-recovery-concierge/${p.slug}`}
                  className="block py-2.5 text-ink"
                  onClick={() => setOpen(false)}
                >
                  {p.title}
                </Link>
              </li>
            ))}
            <li className="pt-2 mt-2 border-t border-line">
              <span className="block py-1.5 text-xs font-semibold uppercase tracking-wide text-muted">Active Workforce Recruitment</span>
            </li>
            <li>
              <Link href="/active-workforce-recruitment/perm-temp" className="flex items-center gap-3 py-2.5 text-ink" onClick={() => setOpen(false)}>
                <IconBadge icon={Briefcase} color="gold" size="sm" />
                Perm &amp; Temp Recruitment
              </Link>
            </li>
            <li>
              <Link href="/active-workforce-recruitment" className="flex items-center gap-3 py-2.5 text-ink" onClick={() => setOpen(false)}>
                <IconBadge icon={UserPlus} color="gold" size="sm" />
                Register with Us
              </Link>
            </li>
            <li>
              <Link href="/resources" className="block py-2.5 text-ink" onClick={() => setOpen(false)}>
                Resources
              </Link>
            </li>
            <li>
              <Link href="/portal/login" className="flex items-center gap-2 py-2.5 text-ink" onClick={() => setOpen(false)}>
                <LogIn size={16} /> Log In
              </Link>
            </li>
            <li>
              <Link href="/contact" className="block py-2.5 font-medium text-teal" onClick={() => setOpen(false)}>
                Book a Consultation
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
