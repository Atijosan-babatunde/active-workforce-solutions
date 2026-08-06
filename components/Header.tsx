"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Briefcase, UserPlus } from "lucide-react";
import { divisions } from "@/lib/content/divisions";
import IconBadge from "./IconBadge";

const otherDivisions = divisions.filter((d) => d.slug !== "active-workforce-recruitment");

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-sand/95 backdrop-blur border-b border-line">
      <div className="mx-auto max-w-content px-6 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Active Workforce Solutions — home">
          <Image src="/logo.png" alt="Active Workforce Solutions" width={220} height={46} className="h-9 w-auto" priority />
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-sm" aria-label="Primary">
          <Link href="/about" className="text-ink hover:text-teal transition-colors">
            About Us
          </Link>
          <div className="relative group">
            <button className="flex items-center gap-1 text-ink hover:text-teal transition-colors" aria-haspopup="true">
              Divisions
            </button>
            <div className="absolute left-0 top-full pt-3 hidden group-hover:block group-focus-within:block">
              <ul className="w-80 bg-white border border-line rounded-card shadow-lg p-2">
                {otherDivisions.map((d) => (
                  <li key={d.slug}>
                    <Link href={`/${d.slug}`} className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-sand text-ink">
                      <IconBadge icon={d.icon} color={d.color} size="sm" />
                      {d.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="relative group">
            <button className="flex items-center gap-1 text-ink hover:text-teal transition-colors" aria-haspopup="true">
              Active Workforce Recruitment
            </button>
            <div className="absolute left-0 top-full pt-3 hidden group-hover:block group-focus-within:block">
              <ul className="w-72 bg-white border border-line rounded-card shadow-lg p-2">
                <li>
                  <Link href="/active-workforce-recruitment/perm-temp" className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-sand text-ink">
                    <IconBadge icon={Briefcase} color="gold" size="sm" />
                    Perm &amp; Temp Recruitment
                  </Link>
                </li>
                <li>
                  <Link href="/active-workforce-recruitment" className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-sand text-ink">
                    <IconBadge icon={UserPlus} color="gold" size="sm" />
                    Register with Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <Link href="/resources" className="text-ink hover:text-teal transition-colors">
            Resources
          </Link>
          <Link href="/contact" className="text-ink hover:text-teal transition-colors">
            Contact Us
          </Link>
        </nav>

        <div className="hidden lg:block">
          <Link href="/contact" className="inline-flex items-center rounded-full bg-navy text-white px-5 py-2.5 text-sm font-medium hover:bg-navy2 transition-colors">
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
