import type { Metadata } from "next";

export const metadata: Metadata = { title: "Complaints & Feedback" };

export default function Page() {
  return (
    <div className="mx-auto max-w-content px-6 py-16 max-w-2xl prose-body">
      <h1 className="font-display text-3xl text-navy mb-6">Complaints &amp; Feedback</h1>
      <p className="text-sm text-brass bg-brasstint border border-brass/30 rounded-card px-4 py-3 mb-6">
        Placeholder — replace with the client&apos;s confirmed complaints procedure.
      </p>
      <p className="text-ink/80">
        If you are unhappy with any aspect of our service, please contact us
        via the <a href="/contact" className="text-teal underline">contact page</a> and
        we will acknowledge your complaint and explain the next steps.
      </p>
    </div>
  );
}
