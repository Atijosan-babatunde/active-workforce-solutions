import type { Metadata } from "next";
import DivisionLandingTemplate from "@/components/DivisionLandingTemplate";
import { getDivision } from "@/lib/content/divisions";
import { images } from "@/lib/content/images";

const division = getDivision("active-quality-academy")!;

export const metadata: Metadata = {
  title: `${division.name} | Active Workforce Solutions`,
  description: division.summary,
};

export default function Page() {
  return (
    <DivisionLandingTemplate
      division={division}
      image={images.qualityAcademy}
      secondaryImage={images.qualityAcademySecondary}
      offerBody="Active Quality Academy delivers structured, practical training and workforce development from induction and mandatory training through to leadership and quality improvement programmes designed around real day-to-day standards, not generic course content."
      whoBody="We work with care and support providers, health organisations and employers who need their teams trained, confident and compliant, whether that's a single workshop or an ongoing training partnership."
    />
  );
}
