import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Notice" };

export default function Page() {
  return (
    <div className="mx-auto max-w-content px-6 py-16 max-w-2xl prose-body">
      <h1 className="font-display text-3xl text-navy mb-6">Privacy Notice</h1>
      <p className="text-sm text-brass bg-brasstint border border-brass/30 rounded-card px-4 py-3 mb-6">
        Placeholder — this notice must be drafted or reviewed by a qualified
        data-protection adviser before launch, covering lawful basis, retention
        periods for unconverted enquiries and consent logging, as required by
        the client&apos;s brief.
      </p>
      <p className="text-ink/80">
        Active Workforce Solutions Ltd collects only the information necessary
        to respond to your enquiry. Full details of what we collect, how it is
        used, how long it is retained and your rights will be published here
        prior to launch.
      </p>
    </div>
  );
}
