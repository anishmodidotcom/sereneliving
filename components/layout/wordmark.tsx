import { cn } from "@/lib/utils";

interface WordmarkProps {
  className?: string;
  tone?: "sage" | "cream" | "ink";
}

const toneClass: Record<NonNullable<WordmarkProps["tone"]>, string> = {
  sage: "text-sage-deep",
  cream: "text-cream",
  ink: "text-ink",
};

export function Wordmark({ className, tone = "sage" }: WordmarkProps) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline font-display text-2xl tracking-tight",
        toneClass[tone],
        className,
      )}
      aria-label="Serene Living"
    >
      <span className="relative">
        <svg
          aria-hidden="true"
          viewBox="0 0 40 14"
          className="absolute -top-3 left-1/2 h-3 w-10 -translate-x-1/2"
          fill="none"
        >
          <path
            d="M2 12 C 8 4, 14 4, 20 12"
            stroke="currentColor"
            strokeWidth="0.7"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M6 12 C 11 6, 17 6, 22 12"
            stroke="currentColor"
            strokeWidth="0.7"
            strokeLinecap="round"
            opacity="0.5"
          />
          <path
            d="M11 12 C 15 8, 19 8, 23 12"
            stroke="currentColor"
            strokeWidth="0.7"
            strokeLinecap="round"
            opacity="0.35"
          />
        </svg>
        Serene
      </span>
    </span>
  );
}
