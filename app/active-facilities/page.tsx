import type { Metadata } from "next";
import DivisionLandingTemplate from "@/components/DivisionLandingTemplate";
import { getDivision } from "@/lib/content/divisions";
import { images } from "@/lib/content/images";

const division = getDivision("active-facilities")!;

export const metadata: Metadata = {
  title: `${division.name} | Active Workforce Solutions`,
  description: division.summary,
};

export default function Page() {
  return (
    <DivisionLandingTemplate
      division={division}
      image={images.facilities}
      secondaryImage={images.facilitiesSecondary}
      showStaffBadge
      staffBadgeLabel="AWS Facilities Team"
      offerBody="Active Facilities provides dependable facilities management and support — from routine maintenance and cleaning standards to wider premises support — so operational sites run smoothly without constant oversight from your team."
      whoBody="We support organisations that need their premises properly maintained and presented, with a single point of coordination rather than juggling multiple contractors."
    />
  );
}
