import type { LucideIcon } from "lucide-react";
import { HeartHandshake, GraduationCap, Briefcase, Building2, Users, Wrench } from "lucide-react";
import type { BadgeColor } from "@/components/IconBadge";

export type Division = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  hasFullBlueprint: boolean;
  icon: LucideIcon;
  color: BadgeColor;
};

// NOTE for Babatunde: only Active Recovery Concierge has a full Volume 3
// style blueprint from the client. The other five divisions below use
// placeholder positioning derived from Volume 1/2 only — confirm with the
// client whether further "Volume 4-8" documents exist before finalising copy.
export const divisions: Division[] = [
  {
    slug: "active-recovery-concierge",
    name: "Active Recovery Concierge",
    tagline: "Recovery, carefully coordinated around you",
    summary: "Discreet, personalised recovery planning and non clinical coordination for individuals and families following surgery, hospital treatment or illness.",
    hasFullBlueprint: true,
    icon: HeartHandshake,
    color: "rose",
  },
  {
    slug: "active-quality-academy",
    name: "Active Quality Academy",
    tagline: "Practical training built around real standards",
    summary: "Education and workforce development that raises quality and compliance standards across health, care and support organisations.",
    hasFullBlueprint: false,
    icon: GraduationCap,
    color: "sky",
  },
  {
    slug: "active-provider-solutions",
    name: "Active Provider Solutions",
    tagline: "Consultancy for provider organisations",
    summary: "Practical consultancy support for care and support providers navigating growth, compliance and operational challenges.",
    hasFullBlueprint: false,
    icon: Briefcase,
    color: "navy",
  },
  {
    slug: "active-accommodation-solutions",
    name: "Active Accommodation Solutions",
    tagline: "Suitable accommodation, sourced and coordinated",
    summary: "Sourcing and coordination of suitable accommodation arrangements for individuals and organisations with specific requirements.",
    hasFullBlueprint: false,
    icon: Building2,
    color: "sage",
  },
  {
    slug: "active-workforce-recruitment",
    name: "Active Workforce Recruitment",
    tagline: "Specialist workforce, properly matched",
    summary: "Recruitment services connecting organisations with qualified professionals across health, care and workforce sectors.",
    hasFullBlueprint: false,
    icon: Users,
    color: "gold",
  },
  {
    slug: "active-facilities",
    name: "Active Facilities",
    tagline: "Facilities support that keeps operations running",
    summary: "Facilities management and support services for organisations that need dependable, well coordinated premises support.",
    hasFullBlueprint: false,
    icon: Wrench,
    color: "silver",
  },
];

export function getDivision(slug: string) {
  return divisions.find((d) => d.slug === slug);
}
