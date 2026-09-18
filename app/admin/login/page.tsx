"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Mail, Lock, Loader2, ShieldCheck } from "lucide-react";
import { Field, inputClass } from "@/components/wizard/FormControls";
import { adminLogin } from "@/lib/api/admin";
import { ApiError } from "@/lib/api/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setStatus("sending");
    try {
      await adminLogin(email, password);
    } catch (err) {
      setStatus("idle");
      return setError(err instanceof ApiError ? err.message : "Incorrect email or password.");
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-navydeep flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Image src="/icon.png" alt="Active Workforce Solutions" width={48} height={48} className="rounded-full" />
        </div>
        <div className="bg-white rounded-card shadow-2xl shadow-black/40 p-8">
          <div className="flex items-center gap-2.5 mb-1.5">
            <ShieldCheck size={18} className="text-gold" strokeWidth={2} />
            <p className="eyebrow text-muted">Staff Only</p>
          </div>
          <h1 className="font-display text-2xl text-navy mb-6">Admin Dashboard</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Field label="Email address" icon={<Mail size={15} />}>
              <input
                type="email"
                required
                className={inputClass}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@activeworkforcesolutions.com"
                autoFocus
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
            {error && (
              <p role="alert" className="text-sm text-rose font-medium">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-navy text-white font-medium px-6 py-3 hover:bg-navy2 transition-colors disabled:opacity-70"
            >
              {status === "sending" && <Loader2 size={16} className="animate-spin" />}
              {status === "sending" ? "Logging in…" : "Log In"}
            </button>
          </form>
        </div>
        <p className="text-center text-xs text-white/40 mt-6">
          This area is for Active Workforce Solutions staff only.
        </p>
      </div>
    </div>
  );
}
