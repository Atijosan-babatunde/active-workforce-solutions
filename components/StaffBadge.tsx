import Image from "next/image";

// Recreates the effect from the client's flyer: their real AWS mark shown as
// a worn ID badge on the care team, composited onto the photo rather than
// pretending the stock photography already has it. Only used on imagery that
// actually depicts a caregiver/care-team figure.
export default function StaffBadge({ label = "AWS Care Team" }: { label?: string }) {
  return (
    <div className="absolute bottom-6 right-6 flex items-center gap-2.5 bg-white/95 backdrop-blur rounded-full pl-1.5 pr-4 py-1.5 shadow-lg shadow-black/30 ring-1 ring-black/5">
      <span className="relative w-8 h-8 rounded-full bg-navy flex items-center justify-center overflow-hidden shrink-0">
        <Image src="/badge-icon.png" alt="" fill sizes="32px" className="object-cover" />
      </span>
      <span className="text-xs font-semibold text-navy leading-tight">{label}</span>
    </div>
  );
}
