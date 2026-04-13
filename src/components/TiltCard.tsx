"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setIsTouch(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isTouch;
}

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltMax?: number;
  corners?: boolean;
  scanLine?: boolean;
  glowSpots?: boolean;
  rounded?: string;
}

export default function TiltCard({
  children,
  className = "",
  tiltMax = 10,
  corners = true,
  scanLine = true,
  glowSpots = true,
  rounded = "rounded-[20px]",
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouch || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * tiltMax * 2;
      const rotateX = (0.5 - y) * tiltMax * 2;
      setTilt({ rotateX, rotateY });
      setGlare({ x: x * 100, y: y * 100, opacity: 1 });
    },
    [tiltMax, isTouch]
  );

  const handleMouseEnter = useCallback(() => {
    if (!isTouch) setHovering(true);
  }, [isTouch]);

  const handleMouseLeave = useCallback(() => {
    if (isTouch) return;
    setTilt({ rotateX: 0, rotateY: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
    setHovering(false);
  }, [isTouch]);

  return (
    <div className="tilt-card-wrapper" style={{ perspective: "800px" }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          scale: hovering ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
        className={`tilt-card group relative overflow-hidden ${rounded} ${className}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative z-10 h-full w-full">{children}</div>

        {/* Glare overlay — glass refraction style */}
        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.08) 30%, transparent 70%)`,
            opacity: glare.opacity,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Glow spots — warm ambient light refraction */}
        {glowSpots && (
          <div className="pointer-events-none absolute inset-0 z-[5]">
            <div
              className="absolute -top-5 -left-5 w-24 h-24 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(255, 240, 200, 0.30) 0%, transparent 70%)",
                filter: "blur(18px)",
                opacity: hovering ? 1 : 0,
                transition: "opacity 0.4s ease",
              }}
            />
            <div
              className="absolute top-1/2 -right-8 w-24 h-24 rounded-full -translate-y-1/2"
              style={{
                background:
                  "radial-gradient(circle, rgba(255, 240, 200, 0.22) 0%, transparent 70%)",
                filter: "blur(18px)",
                opacity: hovering ? 1 : 0,
                transition: "opacity 0.4s ease 0.1s",
              }}
            />
            <div
              className="absolute -bottom-5 left-1/3 w-24 h-24 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(255, 240, 200, 0.22) 0%, transparent 70%)",
                filter: "blur(18px)",
                opacity: hovering ? 1 : 0,
                transition: "opacity 0.4s ease 0.2s",
              }}
            />
          </div>
        )}

        {/* Corner L-brackets — frosted glass accent */}
        {corners && (
          <div className="pointer-events-none absolute inset-0 z-20">
            {[
              "top-2.5 left-2.5 border-t-2 border-l-2",
              "top-2.5 right-2.5 border-t-2 border-r-2",
              "bottom-2.5 left-2.5 border-b-2 border-l-2",
              "bottom-2.5 right-2.5 border-b-2 border-r-2",
            ].map((pos) => (
              <span
                key={pos}
                className={`absolute w-3.5 h-3.5 ${pos} transition-all duration-300`}
                style={{
                  borderColor: hovering
                    ? "rgba(255, 255, 255, 0.7)"
                    : "rgba(255, 255, 255, 0.2)",
                  boxShadow: hovering
                    ? "0 0 8px rgba(255, 255, 255, 0.4)"
                    : "none",
                }}
              />
            ))}
          </div>
        )}

        {/* Scan line */}
        {scanLine && (
          <div
            className="pointer-events-none absolute inset-0 z-20 tilt-scan-line"
            style={{
              opacity: hovering ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          />
        )}

        {/* Border glow — warm edge light */}
        <div
          className="pointer-events-none absolute inset-0 z-[15]"
          style={{
            borderRadius: "inherit",
            border: "1px solid transparent",
            borderColor: hovering
              ? "rgba(255, 255, 255, 0.4)"
              : "transparent",
            boxShadow: hovering
              ? "0 0 25px rgba(255, 190, 11, 0.06), 0 8px 32px rgba(0, 0, 0, 0.06)"
              : "none",
            transition: "border-color 0.4s ease, box-shadow 0.4s ease",
          }}
        />
      </motion.div>
    </div>
  );
}
