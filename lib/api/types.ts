// Shared shape for a client's service request, regardless of which division
// or form it came from — keeps the portal page and every submitting form
// (EnquiryWizard, EmployerEngagementFlow, PermTempRecruitmentForm) agreed on
// one schema instead of each inventing its own status vocabulary.

export type ServiceRequestSource = "contact-wizard" | "employer-recruitment" | "perm-temp-recruitment";

export type ServiceRequestStatus = "submitted" | "in_review" | "in_progress" | "completed";

export type ServiceRequest = {
  id: string;
  division: string;
  source: ServiceRequestSource;
  description: string;
  details: Record<string, unknown> | null;
  status: ServiceRequestStatus;
  createdAt: string;
};

export const STATUS_LABELS: Record<ServiceRequestStatus, string> = {
  submitted: "Submitted",
  in_review: "In Review",
  in_progress: "In Progress",
  completed: "Completed",
};

export const STATUS_BADGE_CLASS: Record<ServiceRequestStatus, string> = {
  submitted: "bg-silvertint text-muted",
  in_review: "bg-goldtint text-golddark",
  in_progress: "bg-skytint text-sky",
  completed: "bg-sagetint text-sage",
};

// The admin dashboard's record of every form submission site-wide — a
// superset of ServiceRequest (which only exists for the subset of client
// submissions that also created a portal account). Uses a classic sales
// pipeline vocabulary rather than ServiceRequest's recovery-coordination
// wording, since this covers every division and every enquiry type.
export type EnquiryStatus = "new" | "contacted" | "in_progress" | "won" | "lost";

export type Enquiry = {
  id: string;
  enquiryType: string;
  division: string | null;
  fullName: string;
  email: string;
  phone: string | null;
  organisation: string | null;
  description: string | null;
  sourcePage: string | null;
  details: Record<string, unknown> | null;
  status: EnquiryStatus;
  createdAt: string;
  updatedAt: string;
};

export const ENQUIRY_STATUS_LABELS: Record<EnquiryStatus, string> = {
  new: "New",
  contacted: "Contacted",
  in_progress: "In Progress",
  won: "Won",
  lost: "Lost",
};

export const ENQUIRY_STATUS_BADGE_CLASS: Record<EnquiryStatus, string> = {
  new: "bg-silvertint text-muted",
  contacted: "bg-skytint text-sky",
  in_progress: "bg-goldtint text-golddark",
  won: "bg-sagetint text-sage",
  lost: "bg-rosetint text-rose",
};

export const ENQUIRY_TYPE_LABELS: Record<string, string> = {
  client: "Client Enquiry",
  professional: "Job Applicant",
  "employer-recruitment": "Employer (Recruitment)",
  "perm-temp-recruitment": "Employer (Perm & Temp)",
};
