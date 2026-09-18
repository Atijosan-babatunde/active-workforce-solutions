"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Check } from "lucide-react";
import { updateEnquiryStatus } from "@/lib/api/admin";
import { ApiError } from "@/lib/api/client";
import { ENQUIRY_STATUS_LABELS, type EnquiryStatus } from "@/lib/api/types";

const STATUSES: EnquiryStatus[] = ["new", "contacted", "in_progress", "won", "lost"];

export default function StatusUpdateForm({ id, currentStatus }: { id: string; currentStatus: EnquiryStatus }) {
  const router = useRouter();
  const [status, setStatus] = useState<EnquiryStatus>(currentStatus);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      await updateEnquiryStatus(id, status);
      setSaved(true);
      router.refresh();
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to update status.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as EnquiryStatus)}
        className="rounded-md border border-line px-3.5 py-2.5 bg-white text-sm focus-visible:border-teal"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {ENQUIRY_STATUS_LABELS[s]}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={handleSave}
        disabled={saving || status === currentStatus}
        className="inline-flex items-center gap-2 rounded-full bg-navy text-white font-medium px-5 py-2.5 text-sm hover:bg-navy2 transition-colors disabled:opacity-50"
      >
        {saving && <Loader2 size={15} className="animate-spin" />}
        {saved && <Check size={15} />}
        {saving ? "Saving…" : saved ? "Saved" : "Update Status"}
      </button>
      {error && <p className="text-sm text-rose font-medium">{error}</p>}
    </div>
  );
}
