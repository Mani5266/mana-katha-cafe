"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TiltCard from "./TiltCard";

const pillars = [
  {
    title: "Rooftop Magic",
    description:
      "The largest multistoried rooftop cafe in the city. Dine under the open sky across two stunning floors with panoramic city views.",
    icon: "\u2726",
  },
  {
    title: "Live Music Nights",
    description:
      "Every weekend comes alive with live bands, acoustic sets, and unforgettable performances that set the perfect mood.",
    icon: "\u266B",
  },
  {
    title: "Handcrafted Menu",
    description:
      "A flavorful journey across cultures. From South Indian classics to Continental delights, every dish tells a story.",
    icon: "\u25C6",
  },
];

export default function BrandEssence() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-100px", once: true });

  return (
    <section ref={ref} className="relative z-10 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-oasis-accent glow-dot" />
            <span className="text-oasis-accent text-xs font-medium tracking-wider uppercase">
              The Experience
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-oasis-text tracking-tight">
            Why Mana Katha?
          </h2>
          <p className="text-oasis-muted text-sm mt-3 max-w-lg mx-auto">
            Three pillars that make every visit extraordinary
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5 }}
            >
              <TiltCard
                tiltMax={10}
                corners={true}
                scanLine={true}
                glowSpots={true}
              >
                <div className="glass-card p-8 text-center h-full">
                  <div className="text-3xl mb-4" style={{ color: '#D4A373' }}>
                    {pillar.icon}
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-oasis-text mb-3 group-hover:text-oasis-accent transition-colors duration-300">
                    {pillar.title}
                  </h3>
                  <p className="text-oasis-muted text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
