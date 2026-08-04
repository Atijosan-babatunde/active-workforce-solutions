"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Loader2 } from "lucide-react";
import ServiceHero from "@/components/ServiceHero";
import { Field, inputClass } from "@/components/wizard/FormControls";
import { images } from "@/lib/content/images";
import { createClient } from "@/lib/supabase/client";

export default function PortalLoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setError(null);
    setStatus("sending");
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setStatus("idle");
      return setError("Incorrect email or password. Please try again.");
    }
    router.push("/portal");
    router.refresh();
  }

  if (!supabase) {
    return (
      <div className="mx-auto max-w-content px-6 py-20 text-center">
        <h1 className="font-display text-2xl text-navy mb-2">Client Portal Coming Soon</h1>
        <p className="text-ink/70">This isn&apos;t set up yet — check back soon.</p>
      </div>
    );
  }

  return (
    <>
      <ServiceHero
        eyebrow="Client Portal"
        h1="Log In to Your Account"
        supportingCopy="Check the status of the workforce requests you've submitted with us."
        primaryButton="Log In"
        secondaryButton="Submit a New Request"
        primaryHref="#login"
        secondaryHref="/active-workforce-recruitment"
        image={images.workforceRecruitment}
      />
      <div id="login" className="mx-auto max-w-content px-6 py-16 md:py-20">
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white border border-line rounded-card p-8 shadow-lg shadow-navy/5 space-y-5"
        >
          <Field label="Email address" icon={<Mail size={15} />}>
            <input
              type="email"
              required
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </Field>
          <Field label="Password" icon={<Lock size={15} />}>
            <input
              type="password"
              required
              className={inputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
            />
          </Field>
          {error && <p className="text-sm text-rose font-medium">{error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-navy text-white font-medium px-6 py-3 hover:bg-navy2 transition-colors disabled:opacity-70"
          >
            {status === "sending" && <Loader2 size={16} className="animate-spin" />}
            {status === "sending" ? "Logging in…" : "Log In"}
          </button>
          <p className="text-center text-sm text-ink/60">
            Don&apos;t have an account yet?{" "}
            <Link href="/active-workforce-recruitment#get-started" className="text-navy font-semibold hover:underline">
              Submit a request to get started
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
