import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser, getMyServiceRequests } from "@/lib/api/server";
import { getDivision } from "@/lib/content/divisions";
import { STATUS_LABELS, STATUS_BADGE_CLASS } from "@/lib/api/types";
import IconBadge from "@/components/IconBadge";
import LogoutButton from "@/components/portal/LogoutButton";

export const metadata: Metadata = {
  title: "Your Requests",
};

export default async function PortalPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/portal/login");
  }

  const requests = await getMyServiceRequests();

  return (
    <div className="mx-auto max-w-content px-6 py-16 md:py-20">
      <div className="flex items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="font-display text-3xl text-navy">Your Requests</h1>
          <p className="text-ink/70 mt-1">{user.email}</p>
        </div>
        <LogoutButton />
      </div>

      {requests.length === 0 ? (
        <p className="text-ink/70">You haven&apos;t submitted a request yet.</p>
      ) : (
        <div className="space-y-5">
          {requests.map((r) => {
            const division = getDivision(r.division);
            return (
              <div key={r.id} className="rounded-card border border-line bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    {division && <IconBadge icon={division.icon} color={division.color} size="sm" />}
                    <div>
                      <p className="font-semibold text-navy">{division?.name ?? "Service request"}</p>
                      <p className="text-sm text-muted mt-1 max-w-md leading-relaxed">{r.description}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold shrink-0 ${STATUS_BADGE_CLASS[r.status]}`}>
                    {STATUS_LABELS[r.status] ?? r.status}
                  </span>
                </div>
                <p className="text-xs text-muted mt-4">
                  Submitted {new Date(r.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
