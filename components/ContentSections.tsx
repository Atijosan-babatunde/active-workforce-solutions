import { FileCheck2, Download } from "lucide-react";
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

          {s.quote && <p className="font-display text-lg md:text-xl text-navy leading-snug mb-3">{s.quote}</p>}

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

          {s.subsections && (
            <div className="mt-4 space-y-5">
              {s.subsections.map((sub) => (
                <div key={sub.heading}>
                  <p className="font-display text-base text-navy mb-1.5">{sub.heading}</p>
                  <p className="text-ink/75 leading-relaxed">{sub.body}</p>
                </div>
              ))}
            </div>
          )}

          {s.steps && (
            <ol className="mt-4 space-y-5">
              {s.steps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-navy text-gold font-display text-sm flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium text-navy mb-1">{step.title}</p>
                    <p className="text-ink/75 leading-relaxed text-sm">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}

          {s.outcomes && (
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 mt-4">
              {s.outcomes.map((o) => (
                <div key={o.label} className="flex gap-2.5">
                  <span className="text-gold mt-0.5 shrink-0" aria-hidden="true">✓</span>
                  <p className="text-ink/75 leading-relaxed">
                    <span className="font-semibold text-navy">{o.label}</span> {o.body}
                  </p>
                </div>
              ))}
            </div>
          )}

          {s.transformations && (
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              {s.transformations.map((t) => (
                <div key={t.from} className="flex items-center gap-3 rounded-md bg-sand px-4 py-3">
                  <span className="text-ink/70 font-medium">{t.from}</span>
                  <span className="text-gold shrink-0" aria-hidden="true">→</span>
                  <span className="text-navy font-semibold">{t.to}</span>
                </div>
              ))}
            </div>
          )}

          {s.downloads && (
            <ul className="space-y-2.5 mt-2">
              {s.downloads.map((d) => (
                <li key={d.href}>
                  <a
                    href={d.href}
                    download
                    className="flex items-center gap-3 rounded-md border border-line px-4 py-3 text-ink hover:border-gold hover:bg-goldtint/40 transition-colors"
                  >
                    <Download size={16} className="text-gold shrink-0" strokeWidth={2} />
                    <span className="text-sm font-medium">{d.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}

          {s.outcome && (
            <p className="mt-4 pl-4 border-l-2 border-gold text-navy font-medium leading-relaxed">{s.outcome}</p>
          )}
        </div>
      ))}
    </div>
  );
}
