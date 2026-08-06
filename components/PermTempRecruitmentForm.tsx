"use client";

import { useState } from "react";
import { User, Building2, Mail, Phone, MapPin, MessageSquare, CheckCircle2, Loader2 } from "lucide-react";
import { Field, inputClass } from "./wizard/FormControls";

const SPECIALISM_OPTIONS = ["Support Worker", "Registered Nurse", "Care Assistant", "Domiciliary Carer", "Other"];

type Answers = {
  fullName: string;
  organisation: string;
  email: string;
  phone: string;
  specialism: string;
  location: string;
  description: string;
  consent: boolean;
};

const emptyAnswers: Answers = {
  fullName: "",
  organisation: "",
  email: "",
  phone: "",
  specialism: SPECIALISM_OPTIONS[0],
  location: "",
  description: "",
  consent: false,
};

export default function PermTempRecruitmentForm({ sourcePage = "active-workforce-recruitment-perm-temp" }: { sourcePage?: string }) {
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function set<K extends keyof Answers>(key: K, value: Answers[K]) {
    setAnswers((a) => ({ ...a, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!answers.fullName.trim()) return setError("Please tell us your name.");
    if (!answers.organisation.trim()) return setError("Please tell us your organisation's name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email)) return setError("Please enter a valid email address.");
    if (answers.phone.trim().length < 7) return setError("Please enter a valid telephone number.");
    if (!answers.location.trim()) return setError("Please tell us where the role is based.");
    if (!answers.description.trim() || answers.description.trim().length < 10) {
      return setError("Please tell us a little about the role(s) you're hiring for.");
    }
    if (!answers.consent) return setError("Please confirm you're happy for us to be in touch.");

    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enquiryType: "perm-temp-recruitment",
          sourcePage,
          fullName: answers.fullName,
          organisation: answers.organisation,
          email: answers.email,
          phone: answers.phone,
          specialism: answers.specialism,
          location: answers.location,
          description: answers.description,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="bg-white border border-line rounded-card p-8 text-center shadow-lg shadow-navy/5">
        <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-sagetint text-sage mb-4">
          <CheckCircle2 size={28} strokeWidth={2} />
        </span>
        <h3 className="font-display text-2xl text-navy mb-2">Thank you</h3>
        <p className="text-ink/75 max-w-md mx-auto">
          Your enquiry has been received. A member of our recruitment team will be in touch shortly to discuss your
          Perm &amp; Temp hiring needs.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-line rounded-card p-7 md:p-9 shadow-lg shadow-navy/5 space-y-5">
      <Field label="Your name" icon={<User size={15} />}>
        <input className={inputClass} value={answers.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="Jane Doe" />
      </Field>
      <Field label="Organisation name" icon={<Building2 size={15} />}>
        <input
          className={inputClass}
          value={answers.organisation}
          onChange={(e) => set("organisation", e.target.value)}
          placeholder="Your organisation's name"
        />
      </Field>
      <Field label="Email address" icon={<Mail size={15} />}>
        <input
          type="email"
          className={inputClass}
          value={answers.email}
          onChange={(e) => set("email", e.target.value)}
          placeholder="you@example.com"
        />
      </Field>
      <Field label="Telephone" icon={<Phone size={15} />}>
        <input
          type="tel"
          className={inputClass}
          value={answers.phone}
          onChange={(e) => set("phone", e.target.value)}
          placeholder="07XXX XXXXXX"
        />
      </Field>
      <Field label="What specialism are you hiring?" icon={<User size={15} />}>
        <select className={inputClass} value={answers.specialism} onChange={(e) => set("specialism", e.target.value)}>
          {SPECIALISM_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Which location will the job role be based in?" icon={<MapPin size={15} />}>
        <input
          className={inputClass}
          value={answers.location}
          onChange={(e) => set("location", e.target.value)}
          placeholder="e.g. Manchester"
        />
      </Field>
      <Field label="Tell us a little about the role(s) you're hiring for…" icon={<MessageSquare size={15} />}>
        <textarea
          rows={5}
          className={inputClass}
          value={answers.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Shift pattern, number of roles, start date, qualifications…"
        />
      </Field>

      <p className="text-sm text-muted bg-sand rounded-md px-4 py-3">
        Have a job description ready? Once you submit this enquiry, a member of our recruitment team will follow up
        to request it.
      </p>

      <label className="flex items-start gap-3 text-sm text-ink/80">
        <input
          type="checkbox"
          checked={answers.consent}
          onChange={(e) => set("consent", e.target.checked)}
          className="mt-1 w-4 h-4 accent-gold"
        />
        I consent to Active Workforce Solutions contacting me about this enquiry and processing my data in line
        with the privacy notice.
      </label>

      {error && <p className="text-sm text-rose font-medium">{error}</p>}
      {status === "error" && <p className="text-sm text-rose font-medium">Something went wrong sending your details. Please try again.</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-navy text-white font-medium px-6 py-3 hover:bg-navy2 transition-colors disabled:opacity-70"
      >
        {status === "sending" && <Loader2 size={16} className="animate-spin" />}
        {status === "sending" ? "Submitting…" : "Submit Enquiry"}
      </button>
    </form>
  );
}
