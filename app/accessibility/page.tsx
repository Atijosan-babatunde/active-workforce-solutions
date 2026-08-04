import type { Metadata } from "next";

export const metadata: Metadata = { title: "Accessibility Statement" };

export default function Page() {
  return (
    <div className="mx-auto max-w-content px-6 py-16 max-w-2xl prose-body">
      <h1 className="font-display text-3xl text-navy mb-6">Accessibility Statement</h1>
      <p className="text-ink/80 mb-4">
        This website is built to conform to WCAG 2.1 AA, including a logical
        heading hierarchy, keyboard-accessible navigation and forms, visible
        focus states, alternative text for informative images and content that
        remains usable at 200% zoom.
      </p>
      <p className="text-ink/80">
        If you experience any difficulty using this site, please contact us
        via the <a href="/contact" className="text-teal underline">contact page</a> and
        we will do our best to help.
      </p>
    </div>
  );
}
