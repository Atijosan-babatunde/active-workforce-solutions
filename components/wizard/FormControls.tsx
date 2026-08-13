import { CheckCircle2 } from "lucide-react";

export function OptionCard({
  selected,
  onClick,
  title,
  description,
  icon,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left flex items-start gap-4 rounded-card border-2 px-5 py-4 transition-colors ${
        selected ? "border-gold bg-goldtint" : "border-line bg-white hover:border-navy/30"
      }`}
    >
      {icon}
      <span className="flex-1">
        <span className="block font-semibold text-navy">{title}</span>
        {description && <span className="block text-sm text-muted mt-0.5">{description}</span>}
      </span>
      <span
        className={`mt-1 w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${
          selected ? "border-gold bg-gold" : "border-line"
        }`}
      >
        {selected && <CheckCircle2 size={14} className="text-navydeep" strokeWidth={3} />}
      </span>
    </button>
  );
}

export function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-center gap-2 text-sm font-medium text-navy mb-1.5">
        {icon}
        {label}
      </span>
      {children}
    </label>
  );
}

export const inputClass =
  "w-full rounded-md border border-line px-3.5 py-2.5 text-ink placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold";

// Shared validation — every form on the site should use these rather than
// rolling its own regex, so a fix (like the phone field accepting letters)
// only has to happen in one place.

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

// Strips anything that isn't a digit, space, or the handful of characters
// real phone numbers use (+, -, parentheses) — applied on every keystroke
// so letters can't be typed into a phone field in the first place.
export function sanitizePhoneInput(value: string) {
  return value.replace(/[^0-9+()\s-]/g, "");
}

export function isValidPhone(value: string) {
  const digitCount = value.replace(/\D/g, "").length;
  return digitCount >= 7 && digitCount <= 15;
}

export function isValidName(value: string) {
  return value.trim().length >= 2 && /[a-zA-Z]/.test(value);
}
