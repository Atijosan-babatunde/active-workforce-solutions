import { FileCheck2 } from "lucide-react";
import type { Section } from "@/lib/content/recovery-concierge";

export default function ContentSections({ sections }: { sections: Section[] }) {
  if (sections.length === 0) return null;
  return (
    <div className="space-y-6">
      {sections.map((s) => (
        <div key={s.heading} className="rounded-card border border-line bg-white p-6">
          <div className="flex items-start gap-2.5 mb-3">
            <FileCheck2 size={18} className="text-gold mt-0.5 shrink-0" strokeWidth={2} />
            <h2 className="font-display text-lg text-navy leading-snug">{s.heading}</h2>
          </div>
          {s.body && <p className="text-ink/75 leading-relaxed">{s.body}</p>}
          {s.list && (
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mt-2">
              {s.list.map((item) => (
                <li key={item} className="flex gap-2.5 text-ink/75 leading-relaxed">
                  <span className="text-gold mt-0.5 shrink-0" aria-hidden="true">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
