// The brand's single signature visual: several thin lines, representing the
// separate practical threads of a case (appointments, transport, family,
// providers), converging into one calm, coordinated point. Used sparingly:
// once per major hero, never as generic decoration.
export default function ConvergeMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 240"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path d="M10 20 C 140 20, 250 120, 380 118" stroke="#C9962E" strokeWidth="1" opacity="0.5" />
      <path d="M10 70 C 140 70, 250 118, 380 118" stroke="#C9962E" strokeWidth="1" opacity="0.65" />
      <path d="M10 170 C 140 170, 250 122, 380 120" stroke="#C9962E" strokeWidth="1" opacity="0.65" />
      <path d="M10 220 C 140 220, 250 124, 380 120" stroke="#C9962E" strokeWidth="1" opacity="0.5" />
      <path d="M10 120 L 380 119" stroke="#C9962E" strokeWidth="1" opacity="0.4" />
      <circle cx="384" cy="119" r="4.5" fill="#C9962E" />
    </svg>
  );
}
