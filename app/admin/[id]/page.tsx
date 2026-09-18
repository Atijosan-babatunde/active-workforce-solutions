import type { Metadata } from "next";
import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { ChevronLeft, Mail, Phone, Building2, Calendar, FileText } from "lucide-react";
import { getCurrentAdmin, getEnquiryById } from "@/lib/api/admin-server";
import { getDivision } from "@/lib/content/divisions";
import { ENQUIRY_TYPE_LABELS } from "@/lib/api/types";
import IconBadge from "@/components/IconBadge";
import AdminHeader from "@/components/admin/AdminHeader";
import StatusUpdateForm from "@/components/admin/StatusUpdateForm";
import DetailsList from "@/components/admin/DetailsList";

export const metadata: Metadata = { title: "Enquiry Detail" };

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default async function AdminEnquiryDetailPage({ params }: { params: { id: string } }) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  const enquiry = await getEnquiryById(params.id);
  if (!enquiry) return notFound();

  const division = enquiry.division ? getDivision(enquiry.division) : undefined;

  return (
    <>
      <AdminHeader admin={admin} />
      <div className="mx-auto max-w-content px-6 py-10 md:py-14">
        <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:text-navy2 transition-colors mb-6">
          <ChevronLeft size={16} /> All Enquiries
        </Link>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          <div className="space-y-6">
            <div className="rounded-card border border-line bg-white p-7">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="eyebrow text-gold mb-2">{ENQUIRY_TYPE_LABELS[enquiry.enquiryType] ?? enquiry.enquiryType}</p>
                  <h1 className="font-display text-2xl text-navy">{enquiry.fullName}</h1>
                </div>
                {division && (
                  <div className="flex items-center gap-2 shrink-0">
                    <IconBadge icon={division.icon} color={division.color} size="md" />
                  </div>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <a href={`mailto:${enquiry.email}`} className="flex items-center gap-2.5 text-ink/80 hover:text-navy transition-colors">
                  <Mail size={15} className="text-gold shrink-0" /> {enquiry.email}
                </a>
                {enquiry.phone && (
                  <a href={`tel:${enquiry.phone}`} className="flex items-center gap-2.5 text-ink/80 hover:text-navy transition-colors">
                    <Phone size={15} className="text-gold shrink-0" /> {enquiry.phone}
                  </a>
                )}
                {enquiry.organisation && (
                  <p className="flex items-center gap-2.5 text-ink/80">
                    <Building2 size={15} className="text-gold shrink-0" /> {enquiry.organisation}
                  </p>
                )}
                <p className="flex items-center gap-2.5 text-ink/80">
                  <Calendar size={15} className="text-gold shrink-0" /> Submitted {formatDateTime(enquiry.createdAt)}
                </p>
                {enquiry.sourcePage && (
                  <p className="flex items-center gap-2.5 text-ink/80">
                    <FileText size={15} className="text-gold shrink-0" /> via {enquiry.sourcePage}
                  </p>
                )}
              </div>
            </div>

            {enquiry.description && (
              <div className="rounded-card border border-line bg-white p-7">
                <h2 className="font-display text-lg text-navy mb-3">Message</h2>
                <p className="text-ink/75 leading-relaxed whitespace-pre-wrap">{enquiry.description}</p>
              </div>
            )}

            {enquiry.details && Object.keys(enquiry.details).length > 0 && (
              <div className="rounded-card border border-line bg-white p-7">
                <h2 className="font-display text-lg text-navy mb-3">Additional Details</h2>
                <DetailsList details={enquiry.details} />
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-8 h-fit rounded-card border border-line bg-white p-6">
            <h2 className="font-display text-lg text-navy mb-4">Status</h2>
            <StatusUpdateForm id={enquiry.id} currentStatus={enquiry.status} />
          </aside>
        </div>
      </div>
    </>
  );
}
