import type { Metadata } from "next";
import DivisionLandingTemplate from "@/components/DivisionLandingTemplate";
import EmployerEngagementFlow from "@/components/EmployerEngagementFlow";
import { getDivision } from "@/lib/content/divisions";
import { images } from "@/lib/content/images";

const division = getDivision("active-workforce-recruitment")!;

export const metadata: Metadata = {
  title: `${division.name} | Active Workforce Solutions`,
  description: division.summary,
};

export default function Page() {
  return (
    <DivisionLandingTemplate
      division={division}
      image={images.workforceRecruitment}
      secondaryImage={images.workforceRecruitmentSecondary}
      offerBody="Active Workforce Recruitment connects organisations with qualified, properly vetted professionals across health, care and workforce sectors from single hires to ongoing staffing partnerships, handled with the same care as the rest of our services."
      whoBody="We work with employers who need candidates who are genuinely the right fit, not just available and with professionals looking for roles that match their skills and values."
      engagementFlow={<EmployerEngagementFlow />}
    />
  );
}
