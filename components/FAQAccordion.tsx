import { Plus } from "lucide-react";
import type { FAQ } from "@/lib/content/recovery-concierge";

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  if (faqs.length === 0) return null;
  return (
    <div className="divide-y divide-line border-t border-b border-line">
      {faqs.map((f) => (
        <details key={f.q} className="group py-5">
          <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-medium text-ink">
            <span>{f.q}</span>
            <Plus size={18} className="text-gold shrink-0 group-open:rotate-45 transition-transform" strokeWidth={2.5} />
          </summary>
          <p className="mt-3 text-ink/75 leading-relaxed max-w-2xl">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
