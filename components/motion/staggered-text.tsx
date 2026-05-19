"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/use-reduced-motion";

interface StaggeredTextProps {
  text: string;
  by?: "word" | "char";
  stagger?: number;
  delay?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  italicWords?: string[];
}

export function StaggeredText({
  text,
  by = "word",
  stagger = 60,
  delay = 0,
  className,
  as: Tag = "p",
  italicWords = [],
}: StaggeredTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [reduced]);

  const tokens = by === "word" ? text.split(" ") : text.split("");
  const Component = Tag as React.ElementType;

  return (
    <Component ref={ref} className={cn("inline-block", className)}>
      {tokens.map((token, i) => {
        const isItalic = italicWords.includes(token.replace(/[.,]/g, ""));
        const transitionDelay = `${delay + i * stagger}ms`;
        return (
          <span
            key={i}
            className={cn(
              "inline-block",
              isItalic && "italic text-sage-deep",
            )}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible
                ? "translate3d(0,0,0)"
                : "translate3d(0, 0.6em, 0)",
              transition: reduced
                ? "none"
                : `opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) ${transitionDelay}, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) ${transitionDelay}`,
            }}
          >
            {token}
            {by === "word" && i < tokens.length - 1 ? " " : ""}
          </span>
        );
      })}
    </Component>
  );
}
