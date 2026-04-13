"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const STORY = [
  "Mana Katha Cafe \u2014 A Flavorful Journey Across Cultures. Born from a dream to create the most unforgettable dining experience, Mana Katha stands as the largest multistoried rooftop cafe in the city.",
  "Spread across the 5th and 6th floors of BNR Tower, we offer more than just food \u2014 we offer a story. Your story. Our name, 'Mana Katha,' means 'Our Story' in Telugu, and every visit here writes a new chapter.",
  "From the first sip of our signature cold coffee to the last bite of our handcrafted brownie, every detail is designed to make you feel at home under the open sky. With live music, cozy corners, and panoramic city views, Mana Katha is where memories are made.",
];

const QUICK_INFO = [
  { label: "Established", value: "2022" },
  { label: "Seating", value: "120+ Covers" },
  { label: "Floors", value: "5th & 6th" },
  { label: "Cuisine", value: "Multi-Cuisine" },
];

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-60px", once: true });

  return (
    <section ref={ref} id="about" className="relative z-10 py-20 px-6">
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
              Our Story
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-oasis-text tracking-tight">
            About Mana Katha
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&h=600&q=80"
                alt="Mana Katha Cafe rooftop dining"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" style={{ backdropFilter: 'blur(0px)' }} />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-4 mb-8">
              {STORY.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-oasis-muted text-sm leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4">
              {QUICK_INFO.map((info, i) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="glass-pill rounded-xl p-4"
                >
                  <div className="text-oasis-accent text-[10px] tracking-wider uppercase mb-1">
                    {info.label}
                  </div>
                  <div className="text-oasis-text text-sm font-medium">
                    {info.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
