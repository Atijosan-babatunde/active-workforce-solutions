import type { Metadata } from "next";
import DivisionLandingTemplate from "@/components/DivisionLandingTemplate";
import { getDivision } from "@/lib/content/divisions";
import { images } from "@/lib/content/images";

const division = getDivision("active-accommodation-solutions")!;

export const metadata: Metadata = {
  title: `${division.name} | Active Workforce Solutions`,
  description: division.summary,
};

export default function Page() {
  return (
    <DivisionLandingTemplate
      division={division}
      image={images.accommodation}
      secondaryImage={images.accommodationSecondary}
      offerBody="Active Accommodation Solutions sources and coordinates suitable, well-matched accommodation for individuals and organisations with specific requirements handling the search, liaison and practical arrangements from enquiry through to move-in."
      whoBody="We support individuals, families, employers and organisations who need accommodation arranged properly and discreetly, whether that's a single placement or ongoing accommodation coordination across multiple locations."
    />
  );
}
