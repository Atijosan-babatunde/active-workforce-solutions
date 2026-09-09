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
