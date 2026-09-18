import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Mail, Phone, Inbox } from "lucide-react";
import { getCurrentAdmin, getEnquiries } from "@/lib/api/admin-server";
import { getDivision } from "@/lib/content/divisions";
import { ENQUIRY_STATUS_LABELS, ENQUIRY_STATUS_BADGE_CLASS, ENQUIRY_TYPE_LABELS, type EnquiryStatus } from "@/lib/api/types";
import IconBadge from "@/components/IconBadge";
import AdminHeader from "@/components/admin/AdminHeader";
import EnquiryFilterBar from "@/components/admin/EnquiryFilterBar";

export const metadata: Metadata = { title: "Admin Dashboard" };

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  const status = searchParams.status as EnquiryStatus | undefined;
  const { enquiries, total } = await getEnquiries({ status });

  return (
    <>
      <AdminHeader admin={admin} />
      <div className="mx-auto max-w-content px-6 py-10 md:py-14">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl text-navy">Enquiries</h1>
            <p className="text-ink/60 mt-1">
              {total} {total === 1 ? "enquiry" : "enquiries"}
              {status ? ` · ${ENQUIRY_STATUS_LABELS[status]}` : " total"}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <EnquiryFilterBar activeStatus={status} />
        </div>

        {enquiries.length === 0 ? (
          <div className="rounded-card border border-line bg-white p-16 text-center">
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-silvertint text-muted mb-4">
              <Inbox size={24} strokeWidth={2} />
            </span>
            <p className="text-ink/70">No enquiries {status ? `with status "${ENQUIRY_STATUS_LABELS[status]}"` : "yet"}.</p>
          </div>
        ) : (
          <div className="rounded-card border border-line bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line text-left text-xs font-semibold uppercase tracking-wide text-muted">
                    <th className="px-5 py-3.5">Contact</th>
                    <th className="px-5 py-3.5">Division</th>
                    <th className="px-5 py-3.5">Type</th>
                    <th className="px-5 py-3.5">Submitted</th>
                    <th className="px-5 py-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {enquiries.map((e) => {
                    const division = e.division ? getDivision(e.division) : undefined;
                    return (
                      <tr key={e.id} className="hover:bg-sand/60 transition-colors">
                        <td className="px-5 py-4">
                          <Link href={`/admin/${e.id}`} className="block">
                            <p className="font-medium text-navy">{e.fullName}</p>
                            <p className="flex items-center gap-1.5 text-xs text-muted mt-1">
                              <Mail size={12} /> {e.email}
                            </p>
                            {e.phone && (
                              <p className="flex items-center gap-1.5 text-xs text-muted mt-0.5">
                                <Phone size={12} /> {e.phone}
                              </p>
                            )}
                          </Link>
                        </td>
                        <td className="px-5 py-4">
                          <Link href={`/admin/${e.id}`} className="flex items-center gap-2 text-ink/80">
                            {division && <IconBadge icon={division.icon} color={division.color} size="sm" />}
                            <span className="whitespace-nowrap">{division?.name ?? "—"}</span>
                          </Link>
                        </td>
                        <td className="px-5 py-4">
                          <Link href={`/admin/${e.id}`} className="text-ink/70 whitespace-nowrap">
                            {ENQUIRY_TYPE_LABELS[e.enquiryType] ?? e.enquiryType}
                          </Link>
                        </td>
                        <td className="px-5 py-4">
                          <Link href={`/admin/${e.id}`} className="text-ink/70 whitespace-nowrap">
                            {formatDate(e.createdAt)}
                          </Link>
                        </td>
                        <td className="px-5 py-4">
                          <Link href={`/admin/${e.id}`}>
                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${ENQUIRY_STATUS_BADGE_CLASS[e.status]}`}>
                              {ENQUIRY_STATUS_LABELS[e.status] ?? e.status}
                            </span>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
