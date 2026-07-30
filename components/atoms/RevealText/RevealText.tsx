"use client";

import clsx from "clsx";
import {
  type HTMLAttributes,
  type ReactNode,
  type Ref,
  useEffect,
  useRef,
  useState,
} from "react";

type RevealTextProps = {
  as?: "div" | "span";
  children: ReactNode;
  className?: string;
  rootMargin?: string;
  threshold?: number | number[];
} & Omit<HTMLAttributes<HTMLElement>, "children" | "className">;

export function RevealText({
  as: Component = "span",
  children,
  className,
  rootMargin = "0px 0px -8% 0px",
  threshold = 0.15,
  ...props
}: RevealTextProps) {
  const elementRef = useRef<HTMLDivElement | HTMLSpanElement | null>(null);

  const [hasMeasured, setHasMeasured] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const prefersReducedMotion =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHasMeasured(true);
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin, threshold },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  const sharedClassName = clsx(
    "transition-[filter,opacity] duration-[1400ms] ease-out will-change-[filter,opacity]",
    hasMeasured
      ? isVisible
        ? "blur-0 opacity-100"
        : "blur-[2px] opacity-45"
      : "blur-0 opacity-100",
    className,
  );

  if (Component === "div") {
    return (
      <div
        {...props}
        ref={elementRef as Ref<HTMLDivElement>}
        className={sharedClassName}
      >
        {children}
      </div>
    );
  }

  return (
    <span
      {...props}
      ref={elementRef as Ref<HTMLSpanElement>}
      className={sharedClassName}
    >
      {children}
    </span>
  );
}
