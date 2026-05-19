"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/use-reduced-motion";

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof Pick<React.JSX.IntrinsicElements, "div" | "section" | "article" | "header" | "footer" | "li">;
  delay?: number;
  y?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

export function Reveal({
  as: Tag = "div",
  delay = 0,
  y = 40,
  duration = 800,
  threshold = 0.15,
  once = true,
  className,
  style,
  children,
  ...rest
}: RevealProps) {
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
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) obs.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold, once, reduced]);

  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref}
      className={cn("will-change-transform", className)}
      style={{
        transform: visible ? "translate3d(0,0,0)" : `translate3d(0, ${y}px, 0)`,
        opacity: visible ? 1 : 0,
        transition: reduced
          ? "none"
          : `transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Component>
  );
}
