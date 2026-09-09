"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, HeartHandshake, CheckCircle2, Loader2, User, Mail, Phone, MessageSquare, Briefcase, Lock } from "lucide-react";
import { divisions } from "@/lib/content/divisions";
import IconBadge from "./IconBadge";
import { OptionCard, Field, inputClass, isValidEmail, isValidPhone, isValidName, sanitizePhoneInput } from "./wizard/FormControls";
import { signup, getCurrentUser, createServiceRequest, ApiError } from "@/lib/api/client";

type EnquiryType = "client" | "professional";

type Props = {
  sourcePage: string;
  /** Pre-select a division slug (e.g. arriving from a division page's "Start Enquiry" link). Locks the path to "client" and skips straight past the fork + division-picker steps. */
  initialDivision?: string;
  /** Skip the fork entirely and lock the flow to one path (used by the careers page). */
  forcePath?: EnquiryType;
};

const CLIENT_STEPS = ["division", "details", "contact", "message", "review"] as const;
const PRO_STEPS = ["division", "details", "contact", "experience", "message", "review"] as const;

const EXPERIENCE_OPTIONS = ["Less than 1 year", "1–3 years", "3–5 years", "5–10 years", "10+ years"];

type Answers = {
  division: string;
  fullName: string;
  organisation: string;
  role: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  experience: string;
  description: string;
  consent: boolean;
};

const emptyAnswers: Answers = {
  division: "",
  fullName: "",
  organisation: "",
  role: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  experience: "",
  description: "",
  consent: false,
};

export default function EnquiryWizard({ sourcePage, initialDivision, forcePath }: Props) {
  const startPath: EnquiryType | null = forcePath ?? (initialDivision ? "client" : null);
  const [path, setPath] = useState<EnquiryType | null>(startPath);
  const steps = path === "professional" ? PRO_STEPS : CLIENT_STEPS;
  const [stepIndex, setStepIndex] = useState(initialDivision ? 1 : 0);
  const [answers, setAnswers] = useState<Answers>({
    ...emptyAnswers,
    division: initialDivision ?? "",
  });
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [loggedInEmail, setLoggedInEmail] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const currentStepId = path ? steps[stepIndex] : "fork";

  useEffect(() => {
    if (path !== "client") return;
    getCurrentUser().then((user) => setLoggedInEmail(user?.email ?? null));
  }, [path]);

  useEffect(() => {
    headingRef.current?.focus();
  }, [currentStepId, path]);

  function set<K extends keyof Answers>(key: K, value: Answers[K]) {
    setAnswers((a) => ({ ...a, [key]: value }));
  }

  function choosePath(p: EnquiryType) {
    setPath(p);
    setStepIndex(0);
    setError(null);
  }

  function goBack() {
    setError(null);
    if (stepIndex === 0) {
      if (!forcePath && !initialDivision) {
        setPath(null);
      }
      return;
    }
    setStepIndex((i) => i - 1);
  }

  function validateAndAdvance() {
    setError(null);
    if (currentStepId === "division") {
      if (!answers.division) return setError("Please choose a division to continue.");
    }
    if (currentStepId === "details") {
      if (!isValidName(answers.fullName)) return setError("Please tell us your name.");
      if (path === "professional" && !answers.role.trim()) return setError("Please tell us the role you're interested in.");
    }
    if (currentStepId === "contact") {
      const usingLoggedInEmail = path === "client" && !!loggedInEmail;
      if (!usingLoggedInEmail && !isValidEmail(answers.email)) return setError("Please enter a valid email address.");
      if (!isValidPhone(answers.phone)) return setError("Please enter a valid telephone number.");
      if (path === "client" && !loggedInEmail) {
        if (answers.password.length < 6) return setError("Please choose a password of at least 6 characters.");
        if (answers.password !== answers.confirmPassword) return setError("Passwords don't match.");
      }
    }
    if (currentStepId === "experience") {
      if (!answers.experience) return setError("Please select your level of experience.");
    }
    if (currentStepId === "message") {
      if (!answers.description.trim() || answers.description.trim().length < 10) {
        return setError(path === "professional" ? "Please tell us a little about your experience." : "Please tell us a little about your enquiry.");
      }
    }
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  }

  async function submit() {
    if (!answers.consent) return setError("Please confirm you're happy for us to be in touch.");
    setError(null);
    setStatus("sending");
    const division = divisions.find((d) => d.slug === answers.division);
    const payload = {
      enquiryType: path,
      division: answers.division,
      divisionName: division?.name,
      fullName: answers.fullName,
      organisation: path === "client" ? answers.organisation : undefined,
      role: path === "professional" ? answers.role : undefined,
      email: loggedInEmail ?? answers.email,
      phone: answers.phone,
      experience: path === "professional" ? answers.experience : undefined,
      description: answers.description,
      sourcePage,
    };

    // The professional (careers) path never creates a portal account — it's
    // a job application, not a trackable service request — so it keeps the
    // original CRM-only behaviour.
    if (path !== "client") {
      try {
        const res = await fetch("/api/enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Request failed");
        setStatus("sent");
      } catch {
        setStatus("error");
      }
      return;
    }

    // Always send to the CRM webhook pipeline — best-effort, independent of
    // the account/service-request below, so a hiccup in one doesn't lose the
    // enquiry or block account creation.
    fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {});

    try {
      if (!loggedInEmail) {
        try {
          await signup(answers.email, answers.password);
        } catch (err) {
          setStatus("idle");
          if (err instanceof ApiError && err.status === 409) {
            return setError("You already have an account with this email — please log in to submit a new request.");
          }
          return setError(err instanceof ApiError ? err.message : "Something went wrong creating your account.");
        }
      }

      await createServiceRequest({
        division: answers.division,
        source: "contact-wizard",
        description: answers.description,
        details: {
          fullName: answers.fullName,
          organisation: answers.organisation,
          phone: answers.phone,
        },
      });

      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const totalSteps = steps.length;
  const progress = path ? ((stepIndex + 1) / totalSteps) * 100 : 0;

  if (status === "sent") {
    return (
      <div className="bg-white border border-line rounded-card p-8 text-center shadow-lg shadow-navy/5">
        <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-sagetint text-sage mb-4">
          <CheckCircle2 size={28} strokeWidth={2} />
        </span>
        <h3 className="font-display text-2xl text-navy mb-2">Thank you</h3>
        <p className="text-ink/75 max-w-md mx-auto">{path === "professional" ? "Thanks for your interest in joining Active Workforce Solutions. We'll review your details and be in touch about next steps." : "Your enquiry has been received. A member of our team will be in touch shortly."}</p>
        {path === "client" ? (
          <Link href="/portal" className="inline-block mt-6 text-navy font-semibold hover:text-navy2">
            Track the status of your request →
          </Link>
        ) : (
          <Link href="/" className="inline-block mt-6 text-navy font-semibold hover:text-navy2">
            Back to homepage →
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white border border-line rounded-card shadow-lg shadow-navy/5 overflow-hidden">
      {path && (
        <div className="h-1.5 bg-line">
          <div className="h-full bg-gold transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      )}

      <div className="p-7 md:p-9">
        {path && (
          <p className="text-xs font-medium text-muted mb-5 tracking-wide uppercase">
            Step {stepIndex + 1} of {totalSteps}
          </p>
        )}

        {currentStepId === "fork" && (
          <>
            <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl md:text-3xl text-navy mb-2 outline-none">
              What brings you here today?
            </h2>
            <p className="text-ink/70 mb-6">Choose the option that best describes you, and we'll guide you through the rest.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <button type="button" onClick={() => choosePath("client")} className="text-left rounded-card border-2 border-line hover:border-gold bg-sand p-6 transition-colors">
                <IconBadge icon={HeartHandshake} color="rose" size="lg" />
                <p className="font-display text-lg text-navy mt-4">I need care or workforce services</p>
                <p className="text-sm text-muted mt-1.5">Speak to us about consultancy, recovery coordination, training or support.</p>
              </button>
              <button type="button" onClick={() => choosePath("professional")} className="text-left rounded-card border-2 border-line hover:border-gold bg-sand p-6 transition-colors">
                <IconBadge icon={Briefcase} color="gold" size="lg" />
                <p className="font-display text-lg text-navy mt-4">I'm a professional looking to work with you</p>
                <p className="text-sm text-muted mt-1.5">Tell us about your experience and the kind of role you're looking for.</p>
              </button>
            </div>
          </>
        )}

        {currentStepId === "division" && (
          <>
            <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl md:text-3xl text-navy mb-2 outline-none">
              {path === "professional" ? "Which division would you like to work in?" : "Which division is this about?"}
            </h2>
            <p className="text-ink/70 mb-6">Not sure? Pick the closest match we'll route your enquiry to the right team.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {divisions.map((d) => (
                <OptionCard key={d.slug} selected={answers.division === d.slug} onClick={() => set("division", d.slug)} title={d.name} description={d.tagline} icon={<IconBadge icon={d.icon} color={d.color} size="sm" />} />
              ))}
            </div>
          </>
        )}

        {currentStepId === "details" && (
          <>
            <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl md:text-3xl text-navy mb-6 outline-none">
              Tell us about yourself
            </h2>
            <div className="space-y-5">
              <Field label="Full name" icon={<User size={15} />}>
                <input className={inputClass} value={answers.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="Jane Doe" />
              </Field>
              {path === "client" ? (
                <Field label="Organisation, if applicable" icon={<Briefcase size={15} />}>
                  <input className={inputClass} value={answers.organisation} onChange={(e) => set("organisation", e.target.value)} placeholder="Optional" />
                </Field>
              ) : (
                <Field label="Role you're interested in" icon={<Briefcase size={15} />}>
                  <input className={inputClass} value={answers.role} onChange={(e) => set("role", e.target.value)} placeholder="e.g. Support Worker, Registered Nurse" />
                </Field>
              )}
            </div>
          </>
        )}

        {currentStepId === "contact" && (
          <>
            <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl md:text-3xl text-navy mb-6 outline-none">
              How can we reach you?
            </h2>
            <div className="space-y-5">
              {path === "client" && loggedInEmail ? (
                <Field label="Email address" icon={<Mail size={15} />}>
                  <input className={inputClass} value={loggedInEmail} disabled />
                </Field>
              ) : (
                <Field label="Email address" icon={<Mail size={15} />}>
                  <input type="email" className={inputClass} value={answers.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" />
                </Field>
              )}
              <Field label="Telephone number" icon={<Phone size={15} />}>
                <input type="tel" inputMode="tel" className={inputClass} value={answers.phone} onChange={(e) => set("phone", sanitizePhoneInput(e.target.value))} placeholder="07XXX XXXXXX" />
              </Field>
              {path === "client" && !loggedInEmail && (
                <>
                  <Field label="Choose a password" icon={<Lock size={15} />}>
                    <input type="password" className={inputClass} value={answers.password} onChange={(e) => set("password", e.target.value)} placeholder="At least 6 characters" />
                  </Field>
                  <Field label="Confirm password" icon={<Lock size={15} />}>
                    <input type="password" className={inputClass} value={answers.confirmPassword} onChange={(e) => set("confirmPassword", e.target.value)} placeholder="Re-enter your password" />
                  </Field>
                  <p className="text-xs text-muted">We'll use this to create your account so you can log back in later and see the status of this enquiry.</p>
                </>
              )}
            </div>
          </>
        )}

        {currentStepId === "experience" && (
          <>
            <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl md:text-3xl text-navy mb-6 outline-none">
              What's your level of experience?
            </h2>
            <div className="space-y-3">
              {EXPERIENCE_OPTIONS.map((opt) => (
                <OptionCard key={opt} selected={answers.experience === opt} onClick={() => set("experience", opt)} title={opt} />
              ))}
            </div>
          </>
        )}

        {currentStepId === "message" && (
          <>
            <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl md:text-3xl text-navy mb-6 outline-none">
              {path === "professional" ? "Tell us briefly about your experience" : "Tell us briefly about your enquiry"}
            </h2>
            <Field label={path === "professional" ? "Relevant experience" : "Brief description"} icon={<MessageSquare size={15} />}>
              <textarea rows={5} className={inputClass} value={answers.description} onChange={(e) => set("description", e.target.value)} placeholder={path === "professional" ? "Qualifications, past roles, availability…" : "What kind of support are you looking for?"} />
            </Field>
          </>
        )}

        {currentStepId === "review" && (
          <>
            <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl md:text-3xl text-navy mb-6 outline-none">
              Confirm &amp; send
            </h2>
            <dl className="divide-y divide-line border border-line rounded-card overflow-hidden mb-6">
              {[
                ["Enquiry type", path === "professional" ? "Working with us" : "Care / workforce services"],
                ["Division", divisions.find((d) => d.slug === answers.division)?.name ?? "—"],
                ["Name", answers.fullName],
                path === "client" ? ["Organisation", answers.organisation || "—"] : ["Role", answers.role],
                ["Email", answers.email],
                ["Phone", answers.phone],
                ...(path === "professional" ? [["Experience", answers.experience]] : []),
                ["Details", answers.description],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 px-4 py-3 text-sm">
                  <dt className="text-muted w-32 shrink-0">{label}</dt>
                  <dd className="text-ink">{value}</dd>
                </div>
              ))}
            </dl>
            <label className="flex items-start gap-3 text-sm text-ink/80 mb-2">
              <input type="checkbox" checked={answers.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-1 w-4 h-4 accent-gold" />I consent to Active Workforce Solutions contacting me about this {path === "professional" ? "application" : "enquiry"} and processing my data in line with the privacy notice.
            </label>
          </>
        )}

        {error && <p className="mt-4 text-sm text-rose font-medium">{error}</p>}
        {status === "error" && <p className="mt-4 text-sm text-rose font-medium">Something went wrong sending your details. Please try again.</p>}

        {path && (
          <div className="mt-8 flex items-center justify-between gap-3">
            <button type="button" onClick={goBack} disabled={stepIndex === 0 && (!!forcePath || !!initialDivision)} className="inline-flex items-center gap-1 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-navy hover:bg-sand transition-colors disabled:opacity-0 disabled:pointer-events-none">
              <ChevronLeft size={16} /> Back
            </button>

            {currentStepId === "review" ? (
              <button type="button" onClick={submit} disabled={status === "sending"} className="inline-flex items-center gap-2 rounded-full bg-navy text-white font-medium px-6 py-2.5 hover:bg-navy2 transition-colors disabled:opacity-70">
                {status === "sending" && <Loader2 size={16} className="animate-spin" />}
                {status === "sending" ? "Sending…" : "Send"}
              </button>
            ) : (
              <button type="button" onClick={validateAndAdvance} className="inline-flex items-center gap-1 rounded-full bg-navy text-white font-medium px-6 py-2.5 hover:bg-navy2 transition-colors">
                Continue
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
