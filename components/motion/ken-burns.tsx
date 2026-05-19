"use client";

import Image, { type ImageProps } from "next/image";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/use-reduced-motion";

interface KenBurnsProps extends Omit<ImageProps, "className" | "style"> {
  className?: string;
  innerClassName?: string;
  duration?: number;
  scale?: number;
}

export function KenBurns({
  className,
  innerClassName,
  duration = 18,
  scale = 1.08,
  alt,
  ...imageProps
}: KenBurnsProps) {
  const reduced = useReducedMotion();

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        {...imageProps}
        alt={alt}
        className={cn(
          "absolute inset-0 h-full w-full object-cover will-change-transform",
          !reduced && "kb-anim",
          innerClassName,
        )}
        style={
          {
            "--kb-duration": `${duration}s`,
            "--kb-scale": scale,
          } as React.CSSProperties
        }
      />
      <style>{`
        @keyframes ken-burns-pan {
          0% { transform: scale(1) translate3d(0,0,0); }
          100% { transform: scale(var(--kb-scale, 1.08)) translate3d(-1%, -1%, 0); }
        }
        .kb-anim {
          animation: ken-burns-pan var(--kb-duration, 18s) ease-out forwards;
        }
      `}</style>
    </div>
  );
}
