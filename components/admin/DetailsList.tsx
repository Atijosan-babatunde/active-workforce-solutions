// Renders the form-specific extra fields captured in an Enquiry's `details`
// jsonb (postcode, role type, urgency, experience, etc.) without needing a
// bespoke layout per form — camelCase keys become "Title Case" labels.
function humanizeKey(key: string): string {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());
}

function formatValue(value: unknown): string {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (value === null || value === undefined || value === "") return "—";
  return String(value);
}

export default function DetailsList({ details }: { details: Record<string, unknown> | null }) {
  if (!details || Object.keys(details).length === 0) return null;
  return (
    <dl className="divide-y divide-line border border-line rounded-card overflow-hidden">
      {Object.entries(details).map(([key, value]) => (
        <div key={key} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 px-4 py-3 text-sm">
          <dt className="text-muted w-40 shrink-0">{humanizeKey(key)}</dt>
          <dd className="text-ink">{formatValue(value)}</dd>
        </div>
      ))}
    </dl>
  );
}
