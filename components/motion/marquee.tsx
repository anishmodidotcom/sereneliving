"use client";

import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: React.ReactNode[];
  speed?: number;
  className?: string;
  itemClassName?: string;
  pauseOnHover?: boolean;
}

export function Marquee({
  items,
  speed = 40,
  className,
  itemClassName,
  pauseOnHover = true,
}: MarqueeProps) {
  const reduced = useReducedMotion();
  const duplicated = [...items, ...items];
  const duration = `${Math.max(20, items.length * speed)}s`;

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      aria-hidden={reduced}
    >
      <div
        className={cn(
          "flex w-max items-center",
          !reduced && "marquee-track",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
        style={{
          // @ts-expect-error - CSS variable
          "--marquee-duration": duration,
        }}
      >
        {duplicated.map((item, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 items-center px-8 whitespace-nowrap",
              itemClassName,
            )}
          >
            {item}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translate3d(0,0,0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        .marquee-track {
          animation: marquee-scroll var(--marquee-duration) linear infinite;
        }
      `}</style>
    </div>
  );
}
