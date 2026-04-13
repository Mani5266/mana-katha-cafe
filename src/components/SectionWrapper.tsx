"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  /** Add warm gold glow orb behind this section */
  glow?: boolean;
  /** Delay multiplier for stagger effect (0, 1, 2...) */
  index?: number;
  /** Disable scale effect (unused now, kept for API compat) */
  noScale?: boolean;
  /** Extra className on the outer wrapper */
  className?: string;
}

/**
 * Section wrapper with a one-time reveal animation.
 *
 * Uses IntersectionObserver to trigger a slide-up + fade-in
 * when the section enters the viewport. No continuous scroll-linked
 * depth or opacity changes — sections stay fully visible once revealed.
 */
export default function SectionWrapper({
  children,
  glow = false,
  index = 0,
  noScale: _noScale = false,
  className = "",
}: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile once on mount
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // IntersectionObserver for triggering the "revealed" state
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        }
      },
      {
        threshold: 0.06,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`section-wrapper ${isVisible ? "section-wrapper--visible" : ""} ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : "translateY(0)",
        transition: "opacity 0.6s ease",
      }}
    >
      {/* Warm gold glow orb */}
      {glow && <div className="section-glow" style={{ opacity: isVisible ? 0.6 : 0, transition: "opacity 0.8s ease" }} />}

      {/* Content with initial slide-up reveal */}
      <div
        className="section-content"
        style={{
          transform: isVisible ? "translateY(0)" : `translateY(${isMobile ? 16 : 30}px)`,
          opacity: isVisible ? 1 : 0,
          transition:
            "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease",
        }}
      >
        {children}
      </div>
    </div>
  );
}
