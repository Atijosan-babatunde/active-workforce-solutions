import type { Metadata } from "next";
import DivisionLandingTemplate from "@/components/DivisionLandingTemplate";
import { getDivision } from "@/lib/content/divisions";
import { images } from "@/lib/content/images";

const division = getDivision("active-provider-solutions")!;

export const metadata: Metadata = {
  title: `${division.name} | Active Workforce Solutions`,
  description: division.summary,
};

export default function Page() {
  return (
    <DivisionLandingTemplate
      division={division}
      image={images.providerSolutions}
      secondaryImage={images.providerSolutionsSecondary}
      offerBody="Active Provider Solutions gives care and support provider organisations practical, experienced consultancy — covering compliance readiness, operational improvement, growth planning and the day-to-day challenges of running a regulated service."
      whoBody="We work alongside provider leadership teams, registered managers and boards who want an experienced outside perspective they can act on, not just a report on a shelf."
    />
  );
}
