import type { Metadata } from "next";

export const metadata: Metadata = { title: "Cookie Notice" };

export default function Page() {
  return (
    <div className="mx-auto max-w-content px-6 py-16 max-w-2xl prose-body">
      <h1 className="font-display text-3xl text-navy mb-6">Cookie Notice</h1>
      <p className="text-sm text-brass bg-brasstint border border-brass/30 rounded-card px-4 py-3 mb-6">
        Placeholder — populate once analytics and marketing technologies are
        finalised, with a working consent-management banner appropriate to
        those technologies.
      </p>
      <p className="text-ink/80">
        This site uses cookies for essential functionality and, subject to
        your consent, for analytics. A full list of cookies used will be
        published here.
      </p>
    </div>
  );
}
