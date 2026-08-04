import type { LucideIcon } from "lucide-react";

export type BadgeColor = "gold" | "navy" | "sage" | "rose" | "sky" | "silver";

const colorMap: Record<BadgeColor, string> = {
  gold: "bg-goldtint text-golddark",
  navy: "bg-skytint text-navy",
  sage: "bg-sagetint text-sage",
  rose: "bg-rosetint text-rose",
  sky: "bg-skytint text-sky",
  silver: "bg-silvertint text-muted",
};

export default function IconBadge({
  icon: Icon,
  color = "gold",
  size = "md",
}: {
  icon: LucideIcon;
  color?: BadgeColor;
  size?: "sm" | "md" | "lg";
}) {
  const dims = size === "sm" ? "w-9 h-9" : size === "lg" ? "w-14 h-14" : "w-11 h-11";
  const iconSize = size === "sm" ? 16 : size === "lg" ? 26 : 20;
  return (
    <span className={`inline-flex items-center justify-center rounded-full shrink-0 ${dims} ${colorMap[color]}`}>
      <Icon size={iconSize} strokeWidth={2} />
    </span>
  );
}
