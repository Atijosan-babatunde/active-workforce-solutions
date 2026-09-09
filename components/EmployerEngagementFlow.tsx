"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, MapPin, Users, Building2, User, Mail, Phone, MessageSquare, Lock, CheckCircle2, Loader2, LogIn } from "lucide-react";
import { OptionCard, Field, inputClass, isValidEmail, isValidPhone, isValidName, sanitizePhoneInput } from "./wizard/FormControls";
import { signup, getCurrentUser, createServiceRequest, ApiError } from "@/lib/api/client";

type Step = "prompt" | "location" | "requirements" | "preferences" | "contact" | "review" | "sent";

const ROLE_OPTIONS = ["Support Worker", "Registered Nurse", "Care Assistant", "Domiciliary Carer", "Other"];
const URGENCY_OPTIONS = ["As soon as possible", "Within a month", "Just exploring options"];

type Answers = {
  postcode: string;
  roleType: string;
  numberNeeded: string;
  urgency: string;
  driverRequired: boolean;
  preferences: string;
  organisation: string;
  contactName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  description: string;
  consent: boolean;
};

const emptyAnswers: Answers = {
  postcode: "",
  roleType: "",
  numberNeeded: "",
  urgency: "",
  driverRequired: false,
  preferences: "",
  organisation: "",
  contactName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  description: "",
  consent: false,
};

const STEP_ORDER: Step[] = ["location", "requirements", "preferences", "contact", "review"];

export default function EmployerEngagementFlow({ sourcePage = "active-workforce-recruitment" }: { sourcePage?: string }) {
  const [step, setStep] = useState<Step>("prompt");
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [loggedInEmail, setLoggedInEmail] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    getCurrentUser().then((user) => setLoggedInEmail(user?.email ?? null));
  }, []);

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  function set<K extends keyof Answers>(key: K, value: Answers[K]) {
    setAnswers((a) => ({ ...a, [key]: value }));
  }

  const stepIndex = STEP_ORDER.indexOf(step);

  function goBack() {
    setError(null);
    if (stepIndex <= 0) {
      setStep("prompt");
      return;
    }
    setStep(STEP_ORDER[stepIndex - 1]);
  }

  function validateAndAdvance() {
    setError(null);
    if (step === "location" && !answers.postcode.trim()) {
      return setError("Please enter a postcode or city.");
    }
    if (step === "requirements") {
      if (!answers.roleType) return setError("Please choose the type of professional you need.");
      if (!answers.numberNeeded || Number(answers.numberNeeded) < 1 || !Number.isInteger(Number(answers.numberNeeded))) {
        return setError("Please enter how many workers you need (1 or more).");
      }
      if (!answers.urgency) return setError("Please let us know how urgently you need cover.");
    }
    if (step === "contact") {
      if (!isValidName(answers.contactName)) return setError("Please tell us your name.");
      if (!loggedInEmail && !isValidEmail(answers.email)) {
        return setError("Please enter a valid email address.");
      }
      if (!isValidPhone(answers.phone)) return setError("Please enter a valid telephone number.");
      if (!loggedInEmail) {
        if (answers.password.length < 6) return setError("Please choose a password of at least 6 characters.");
        if (answers.password !== answers.confirmPassword) return setError("Passwords don't match.");
      }
    }
    setStep(STEP_ORDER[Math.min(stepIndex + 1, STEP_ORDER.length - 1)]);
  }

  async function submit() {
    if (!answers.consent) return setError("Please confirm you're happy for us to be in touch.");
    setError(null);
    setStatus("sending");

    const enquiryPayload = {
      enquiryType: "employer-recruitment",
      sourcePage,
      postcode: answers.postcode,
      roleType: answers.roleType,
      numberNeeded: answers.numberNeeded,
      urgency: answers.urgency,
      driverRequired: answers.driverRequired,
      preferences: answers.preferences,
      organisation: answers.organisation,
      contactName: answers.contactName,
      email: loggedInEmail ?? answers.email,
      phone: answers.phone,
      description: answers.description,
    };

    // Always send to the CRM webhook pipeline — best-effort, independent of
    // the account/service-request below, so a hiccup in one doesn't lose the
    // enquiry or block account creation.
    fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enquiryPayload),
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
        division: "active-workforce-recruitment",
        source: "employer-recruitment",
        description: answers.description,
        details: {
          postcode: answers.postcode,
          roleType: answers.roleType,
          numberNeeded: answers.numberNeeded,
          urgency: answers.urgency,
          driverRequired: answers.driverRequired,
          preferences: answers.preferences,
          organisation: answers.organisation,
          contactName: answers.contactName,
          phone: answers.phone,
        },
      });

      setStep("sent");
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  const totalSteps = STEP_ORDER.length;
  const progress = stepIndex >= 0 ? ((stepIndex + 1) / totalSteps) * 100 : 0;

  return (
    <div className="rounded-card border border-line bg-white shadow-lg shadow-navy/5 overflow-hidden">
      {stepIndex >= 0 && (
        <div className="h-1.5 bg-line">
          <div className="h-full bg-gold transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      )}

      <div className="p-8 md:p-10">
        {step === "prompt" && (
          <div className="text-center max-w-xl mx-auto">
            <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl md:text-3xl text-navy outline-none">
              Looking to Hire Care &amp; Support Professionals?
            </h2>
            <div className="mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-navy to-gold my-5" />
            <p className="text-ink/70 mb-7">Tell us what you need and we&apos;ll match you with vetted, experienced candidates a few quick questions, no lengthy forms.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button type="button" onClick={() => setStep("location")} className="rounded-full bg-navy text-white font-medium px-7 py-3 hover:bg-navy2 transition-colors">
                Get Started
              </button>
              <Link href="/portal/login" className="inline-flex items-center gap-2 rounded-full border-2 border-line px-7 py-3 font-medium text-navy hover:border-navy/30 transition-colors">
                <LogIn size={16} /> Login
              </Link>
            </div>
            {loggedInEmail && (
              <p className="text-sm text-muted mt-5">
                Logged in as {loggedInEmail} —{" "}
                <Link href="/portal" className="text-navy font-semibold hover:underline">
                  view your requests
                </Link>
              </p>
            )}
          </div>
        )}

        {step === "sent" && (
          <div className="text-center max-w-md mx-auto">
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-sagetint text-sage mb-4">
              <CheckCircle2 size={28} strokeWidth={2} />
            </span>
            <h3 className="font-display text-2xl text-navy mb-2">Thank you</h3>
            <p className="text-ink/75">We&apos;re reviewing your requirements now and will personally match you with suitable candidates. A member of our recruitment team will follow up shortly.</p>
            <Link href="/portal" className="inline-block mt-6 text-navy font-semibold hover:text-navy2">
              Track the status of your request →
            </Link>
          </div>
        )}

        {step === "location" && (
          <>
            <p className="text-xs font-medium text-muted mb-5 tracking-wide uppercase">
              Step {stepIndex + 1} of {totalSteps}
            </p>
            <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl md:text-3xl text-navy mb-6 outline-none">
              Where do you need workers?
            </h2>
            <Field label="Postcode or city" icon={<MapPin size={15} />}>
              <input className={inputClass} value={answers.postcode} onChange={(e) => set("postcode", e.target.value)} placeholder="Enter your postcode or city" />
            </Field>
          </>
        )}

        {step === "requirements" && (
          <>
            <p className="text-xs font-medium text-muted mb-5 tracking-wide uppercase">
              Step {stepIndex + 1} of {totalSteps}
            </p>
            <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl md:text-3xl text-navy mb-6 outline-none">
              What kind of professionals are you looking for?
            </h2>
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {ROLE_OPTIONS.map((opt) => (
                <OptionCard key={opt} selected={answers.roleType === opt} onClick={() => set("roleType", opt)} title={opt} />
              ))}
            </div>

            <Field label="How many workers do you need?" icon={<Users size={15} />}>
              <input type="number" min={1} step={1} inputMode="numeric" className={inputClass} value={answers.numberNeeded} onChange={(e) => set("numberNeeded", e.target.value)} placeholder="e.g. 1" />
            </Field>

            <p className="text-sm font-medium text-navy mt-6 mb-3">How urgently do you need cover?</p>
            <div className="space-y-3">
              {URGENCY_OPTIONS.map((opt) => (
                <OptionCard key={opt} selected={answers.urgency === opt} onClick={() => set("urgency", opt)} title={opt} />
              ))}
            </div>
          </>
        )}

        {step === "preferences" && (
          <>
            <p className="text-xs font-medium text-muted mb-5 tracking-wide uppercase">
              Step {stepIndex + 1} of {totalSteps}
            </p>
            <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl md:text-3xl text-navy mb-2 outline-none">
              Any specific requirements?
            </h2>
            <p className="text-sm text-muted mb-6">(Optional)</p>
            <label className="flex items-center gap-3 text-sm text-ink/80 mb-5">
              <input type="checkbox" checked={answers.driverRequired} onChange={(e) => set("driverRequired", e.target.checked)} className="w-4 h-4 accent-gold" />
              Candidates must be able to drive
            </label>
            <Field label="Anything else we should know?" icon={<MessageSquare size={15} />}>
              <textarea rows={4} className={inputClass} value={answers.preferences} onChange={(e) => set("preferences", e.target.value)} placeholder="Shift pattern, qualifications, specialist skills…" />
            </Field>
          </>
        )}

        {step === "contact" && (
          <>
            <p className="text-xs font-medium text-muted mb-5 tracking-wide uppercase">
              Step {stepIndex + 1} of {totalSteps}
            </p>
            <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl md:text-3xl text-navy mb-6 outline-none">
              {loggedInEmail ? "How can we reach you?" : "Create your account"}
            </h2>
            <div className="space-y-5">
              <Field label="Organisation" icon={<Building2 size={15} />}>
                <input className={inputClass} value={answers.organisation} onChange={(e) => set("organisation", e.target.value)} placeholder="Your organisation's name" />
              </Field>
              <Field label="Your name" icon={<User size={15} />}>
                <input className={inputClass} value={answers.contactName} onChange={(e) => set("contactName", e.target.value)} placeholder="Jane Doe" />
              </Field>
              {loggedInEmail ? (
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
              {!loggedInEmail && (
                <>
                  <Field label="Choose a password" icon={<Lock size={15} />}>
                    <input type="password" className={inputClass} value={answers.password} onChange={(e) => set("password", e.target.value)} placeholder="At least 6 characters" />
                  </Field>
                  <Field label="Confirm password" icon={<Lock size={15} />}>
                    <input type="password" className={inputClass} value={answers.confirmPassword} onChange={(e) => set("confirmPassword", e.target.value)} placeholder="Re-enter your password" />
                  </Field>
                  <p className="text-xs text-muted">We'll use this to create your account so you can log back in later and see the status of this request.</p>
                </>
              )}
            </div>
          </>
        )}

        {step === "review" && (
          <>
            <p className="text-xs font-medium text-muted mb-5 tracking-wide uppercase">
              Step {stepIndex + 1} of {totalSteps}
            </p>
            <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl md:text-3xl text-navy mb-6 outline-none">
              Confirm &amp; get started
            </h2>
            <dl className="divide-y divide-line border border-line rounded-card overflow-hidden mb-6">
              {[
                ["Location", answers.postcode],
                ["Role needed", answers.roleType],
                ["Number needed", answers.numberNeeded || "—"],
                ["Urgency", answers.urgency],
                ["Driver required", answers.driverRequired ? "Yes" : "No"],
                ["Other requirements", answers.preferences || "—"],
                ["Organisation", answers.organisation || "—"],
                ["Name", answers.contactName],
                ["Email", loggedInEmail ?? answers.email],
                ["Phone", answers.phone],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 px-4 py-3 text-sm">
                  <dt className="text-muted w-40 shrink-0">{label}</dt>
                  <dd className="text-ink">{value}</dd>
                </div>
              ))}
            </dl>
            <label className="flex items-start gap-3 text-sm text-ink/80 mb-2">
              <input type="checkbox" checked={answers.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-1 w-4 h-4 accent-gold" />I consent to Active Workforce Solutions contacting me about this enquiry and processing my data in line with the privacy notice.
            </label>
          </>
        )}

        {error && <p className="mt-4 text-sm text-rose font-medium">{error}</p>}
        {status === "error" && <p className="mt-4 text-sm text-rose font-medium">Something went wrong sending your details. Please try again.</p>}

        {stepIndex >= 0 && (
          <div className="mt-8 flex items-center justify-between gap-3">
            <button type="button" onClick={goBack} className="inline-flex items-center gap-1 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-navy hover:bg-sand transition-colors">
              <ChevronLeft size={16} /> Back
            </button>

            {step === "review" ? (
              <button type="button" onClick={submit} disabled={status === "sending"} className="inline-flex items-center gap-2 rounded-full bg-navy text-white font-medium px-6 py-2.5 hover:bg-navy2 transition-colors disabled:opacity-70">
                {status === "sending" && <Loader2 size={16} className="animate-spin" />}
                {status === "sending" ? "Sending…" : "Get Started"}
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
