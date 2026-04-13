"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TiltCard from "./TiltCard";

const proofs = [
  { icon: "\u2605", value: "4.7", label: "on Google" },
  { icon: "\u266B", value: "200+", label: "Live Shows" },
  { icon: "\u2665", value: "5,000+", label: "Happy Guests" },
  { icon: "\u2606", value: "#1", label: "Rooftop Cafe" },
];

export default function SocialProof() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-60px", once: true });

  return (
    <section ref={ref} className="relative z-10 py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {proofs.map((proof, i) => (
          <motion.div
            key={proof.label}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <TiltCard
              tiltMax={6}
              corners={false}
              scanLine={false}
              glowSpots={false}
            >
              <div className="glass-card p-6 text-center">
                <div className="text-2xl mb-2">{proof.icon}</div>
                <div className="font-serif text-2xl md:text-3xl font-bold" style={{ color: '#D4A373' }}>
                  {proof.value}
                </div>
                <div className="text-oasis-muted text-xs tracking-wider uppercase mt-1">
                  {proof.label}
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
