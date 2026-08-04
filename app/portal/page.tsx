import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Briefcase, MapPin, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import IconBadge from "@/components/IconBadge";
import LogoutButton from "@/components/portal/LogoutButton";

export const metadata: Metadata = {
  title: "Your Requests",
};

const STATUS_LABELS: Record<string, string> = {
  submitted: "Submitted",
  being_matched: "Being Matched",
  candidates_proposed: "Candidates Proposed",
  filled: "Filled",
};

const STATUS_COLORS: Record<string, "silver" | "gold" | "sky" | "sage"> = {
  submitted: "silver",
  being_matched: "gold",
  candidates_proposed: "sky",
  filled: "sage",
};

type EmployerRequest = {
  id: string;
  postcode: string | null;
  role_type: string | null;
  number_needed: string | null;
  urgency: string | null;
  status: string;
  created_at: string;
};

export default async function PortalPage() {
  if (!isSupabaseConfigured) {
    return (
      <div className="mx-auto max-w-content px-6 py-20 text-center">
        <h1 className="font-display text-2xl text-navy mb-2">Client Portal Coming Soon</h1>
        <p className="text-ink/70">This isn&apos;t set up yet — check back soon.</p>
      </div>
    );
  }

  const supabase = createClient()!;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/portal/login");
  }

  const { data: requests } = await supabase
    .from("employer_requests")
    .select("id, postcode, role_type, number_needed, urgency, status, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .returns<EmployerRequest[]>();

  return (
    <div className="mx-auto max-w-content px-6 py-16 md:py-20">
      <div className="flex items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="font-display text-3xl text-navy">Your Requests</h1>
          <p className="text-ink/70 mt-1">{user.email}</p>
        </div>
        <LogoutButton />
      </div>

      {!requests || requests.length === 0 ? (
        <p className="text-ink/70">You haven&apos;t submitted a hiring request yet.</p>
      ) : (
        <div className="space-y-5">
          {requests.map((r) => (
            <div key={r.id} className="rounded-card border border-line bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <IconBadge icon={Briefcase} color="gold" size="sm" />
                  <div>
                    <p className="font-semibold text-navy">{r.role_type || "Recruitment request"}</p>
                    <p className="text-sm text-muted flex items-center gap-1.5 mt-1">
                      <MapPin size={13} /> {r.postcode || "—"}
                      {r.number_needed && (
                        <>
                          <span className="mx-1">·</span>
                          <Users size={13} /> {r.number_needed}
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold ${
                    STATUS_COLORS[r.status] === "gold"
                      ? "bg-goldtint text-golddark"
                      : STATUS_COLORS[r.status] === "sky"
                        ? "bg-skytint text-sky"
                        : STATUS_COLORS[r.status] === "sage"
                          ? "bg-sagetint text-sage"
                          : "bg-silvertint text-muted"
                  }`}
                >
                  {STATUS_LABELS[r.status] ?? r.status}
                </span>
              </div>
              <p className="text-xs text-muted mt-4">
                Submitted {new Date(r.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
