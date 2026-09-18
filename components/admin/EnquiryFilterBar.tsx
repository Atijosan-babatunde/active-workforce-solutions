"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ENQUIRY_STATUS_LABELS, type EnquiryStatus } from "@/lib/api/types";

const STATUSES: EnquiryStatus[] = ["new", "contacted", "in_progress", "won", "lost"];

function pillClass(active: boolean) {
  return `rounded-full px-4 py-2 text-sm font-medium border-2 transition-colors whitespace-nowrap ${
    active ? "border-gold bg-goldtint text-golddark" : "border-line text-ink/70 hover:border-navy/30"
  }`;
}

export default function EnquiryFilterBar({ activeStatus }: { activeStatus?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function setStatus(status: EnquiryStatus | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (status) params.set("status", status);
    else params.delete("status");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter by status">
      <button type="button" onClick={() => setStatus(null)} className={pillClass(!activeStatus)}>
        All
      </button>
      {STATUSES.map((s) => (
        <button key={s} type="button" onClick={() => setStatus(s)} className={pillClass(activeStatus === s)}>
          {ENQUIRY_STATUS_LABELS[s]}
        </button>
      ))}
    </div>
  );
}
