"use client";

import { useState } from "react";
import { User, Mail, Phone, Calendar, MessageSquare, ListChecks, Type, CheckCircle2, AlertTriangle } from "lucide-react";
import { isValidEmail, isValidPhone, sanitizePhoneInput } from "./wizard/FormControls";

type Props = {
  fields: string[];
  sourcePage: string;
  campaign?: string;
};

// Turns a plain-English field label from the client's blueprint into a
// usable form field. Long "field descriptions" (e.g. "I am enquiring as:
// client / family / professional / employer / other") become a select;
// everything else becomes a text input. This keeps the data model driven
// entirely by the blueprint content, so adding a field for another
// division just means adding a string to its formFields array.
function toFieldConfig(label: string) {
  const id = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  if (label.toLowerCase().startsWith("i am enquiring as")) {
    const options = label.split(":")[1]?.split("/").map((o) => o.trim()) ?? [];
    return { id, label: "I am enquiring as", type: "select" as const, options };
  }
  if (/email/i.test(label)) return { id, label, type: "email" as const };
  if (/phone|telephone/i.test(label)) return { id, label, type: "tel" as const };
  if (/date/i.test(label)) return { id, label, type: "date" as const };
  if (/consent/i.test(label)) return { id, label, type: "checkbox" as const };
  if (/description|concern|need|situation|reason/i.test(label)) return { id, label, type: "textarea" as const };
  return { id, label, type: "text" as const };
}

function fieldIcon(type: string) {
  switch (type) {
    case "email": return Mail;
    case "tel": return Phone;
    case "date": return Calendar;
    case "textarea": return MessageSquare;
    case "select": return ListChecks;
    case "checkbox": return null;
    default: return Type;
  }
}

export default function EnquiryForm({ fields, sourcePage, campaign }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const config = fields.length > 0 ? fields.map(toFieldConfig) : [
    { id: "full-name", label: "Full name", type: "text" as const },
    { id: "email", label: "Email address", type: "email" as const },
    { id: "message", label: "How can we help?", type: "textarea" as const },
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    // Belt-and-braces on top of the native `required`/`type` constraints below —
    // catches things native validation can miss, like a value that's only whitespace.
    for (const f of config) {
      const raw = payload[f.id];
      const value = typeof raw === "string" ? raw.trim() : "";
      if (f.type === "checkbox") continue;
      if (!value) return setError(`Please fill in "${f.label}".`);
      if (f.type === "email" && !isValidEmail(value)) return setError("Please enter a valid email address.");
      if (f.type === "tel" && !isValidPhone(value)) return setError("Please enter a valid telephone number.");
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, sourcePage, campaign: campaign ?? null }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-card bg-tealtint border border-teal/30 p-6">
        <p className="flex items-center gap-2 font-medium text-tealdark">
          <CheckCircle2 size={18} strokeWidth={2} />
          Thank you — your enquiry has been received.
        </p>
        <p className="text-sm text-ink/80 mt-2">
          A member of our team will be in touch. If your enquiry is urgent or
          medical, please contact the appropriate emergency or clinical service
          directly rather than waiting for a reply here.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <p className="flex items-start gap-2 text-xs text-muted bg-brasstint border border-brass/30 rounded-card px-4 py-3">
        <AlertTriangle size={15} className="shrink-0 mt-0.5 text-golddark" strokeWidth={2} />
        This form is not for emergencies or urgent medical advice. In an emergency,
        contact the appropriate emergency or clinical service directly.
      </p>

      {config.map((f) => {
        const Icon = /name/i.test(f.label) && f.type === "text" ? User : fieldIcon(f.type);
        return (
        <div key={f.id}>
          <label htmlFor={f.id} className="flex items-center gap-1.5 text-sm font-medium text-ink mb-1.5">
            {Icon && <Icon size={14} className="text-gold" strokeWidth={2.5} />}
            {f.label}
          </label>
          {f.type === "textarea" ? (
            <textarea id={f.id} name={f.id} rows={4} required minLength={10} className="w-full rounded-md border border-line px-3.5 py-2.5 bg-white focus-visible:border-teal" />
          ) : f.type === "select" ? (
            <select id={f.id} name={f.id} required className="w-full rounded-md border border-line px-3.5 py-2.5 bg-white focus-visible:border-teal">
              <option value="">Select an option</option>
              {"options" in f && f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          ) : f.type === "checkbox" ? (
            <label className="flex items-start gap-2.5 text-sm text-ink/90">
              <input id={f.id} name={f.id} type="checkbox" required className="mt-1" />
              I consent to the privacy notice and understand how my information will be used.
            </label>
          ) : f.type === "tel" ? (
            <input
              id={f.id}
              name={f.id}
              type="tel"
              inputMode="tel"
              required
              onInput={(e) => {
                e.currentTarget.value = sanitizePhoneInput(e.currentTarget.value);
              }}
              className="w-full rounded-md border border-line px-3.5 py-2.5 bg-white focus-visible:border-teal"
            />
          ) : (
            <input id={f.id} name={f.id} type={f.type} required className="w-full rounded-md border border-line px-3.5 py-2.5 bg-white focus-visible:border-teal" />
          )}
        </div>
        );
      })}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-teal text-white font-medium py-3 hover:bg-tealdark transition-colors disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Submit Enquiry"}
      </button>

      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="text-sm text-red-700">
          Something went wrong sending your enquiry. Please try again, or email us directly.
        </p>
      )}
    </form>
  );
}
