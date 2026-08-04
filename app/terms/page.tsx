import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Website Use" };

export default function Page() {
  return (
    <div className="mx-auto max-w-content px-6 py-16 max-w-2xl prose-body">
      <h1 className="font-display text-3xl text-navy mb-6">Terms of Website Use</h1>
      <p className="text-sm text-brass bg-brasstint border border-brass/30 rounded-card px-4 py-3 mb-6">
        Placeholder — requires review by the client&apos;s legal adviser before launch.
      </p>
      <p className="text-ink/80">
        These terms will explain acceptable use of this website, intellectual
        property, liability and the non-clinical, non-emergency nature of the
        information provided.
      </p>
    </div>
  );
}
