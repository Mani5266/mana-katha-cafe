"use client";

import { useRef, useEffect, useState, useCallback, type ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  /** Add warm gold glow orb behind this section */
  glow?: boolean;
  /** Delay multiplier for stagger effect (0, 1, 2...) */
  index?: number;
  /** Disable scale effect (useful for footer) */
  noScale?: boolean;
  /** Extra className on the outer wrapper */
  className?: string;
}

/**
 * Premium scroll-driven section wrapper.
 *
 * Uses IntersectionObserver to trigger initial reveal, then
 * passive scroll listener + rAF for continuous depth effect.
 *
 * Only uses transform + opacity (GPU-composited, 60fps safe).
 * Mobile: disables scale, keeps fade.
 */
export default function SectionWrapper({
  children,
  glow = false,
  index = 0,
  noScale = false,
  className = "",
}: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const progressRef = useRef(0);
  const rafRef = useRef(0);

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
            observer.disconnect(); // once revealed, stop observing
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

  // Scroll-linked depth: rAF loop for smooth 60fps
  const updateProgress = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const center = rect.top + rect.height / 2;
    const raw = 1 - Math.abs(center - vh / 2) / (vh * 0.75);
    const clamped = Math.max(0, Math.min(1, raw));

    // Smooth lerp to avoid jitter
    progressRef.current += (clamped - progressRef.current) * 0.15;

    const p = progressRef.current;
    const shouldScale = !noScale && !isMobile;

    const scale = shouldScale ? 0.96 + p * 0.04 : 1;
    const opacity = isVisible ? (0.55 + p * 0.45) : 0;

    el.style.transform = `scale(${scale})`;
    el.style.opacity = `${opacity}`;

    // Also update glow opacity if present
    const glowEl = el.querySelector(".section-glow") as HTMLElement | null;
    if (glowEl) {
      glowEl.style.opacity = `${p * 0.6}`;
    }

    rafRef.current = requestAnimationFrame(updateProgress);
  }, [isVisible, noScale, isMobile]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(rafRef.current);
  }, [updateProgress]);

  return (
    <div
      ref={ref}
      className={`section-wrapper ${isVisible ? "section-wrapper--visible" : ""} ${className}`}
      style={{
        opacity: 0,
        willChange: "transform, opacity",
        transformOrigin: "center top",
        transition: isVisible
          ? "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease"
          : "opacity 0.5s ease",
      }}
    >
      {/* Warm gold glow orb */}
      {glow && <div className="section-glow" />}

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
