"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, 80]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95]);

  const stats = [
    { value: "4.7", label: "Google Rating" },
    { value: "418+", label: "Reviews" },
    { value: "#1", label: "Rooftop Cafe" },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32"
    >
      {/* Warm glow orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-oasis-accent/[0.04] blur-[150px] pointer-events-none" />

      <motion.div
        style={{ opacity, y, scale }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-2 mb-12"
        >
          <div className="w-2 h-2 rounded-full bg-oasis-accent glow-dot" />
          <span className="text-oasis-accent text-xs font-medium tracking-wider uppercase">
            The Largest Rooftop Cafe
          </span>
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display text-7xl md:text-9xl lg:text-[10rem] font-light italic leading-[0.95] bg-gradient-to-r from-oasis-accent via-oasis-accent-soft to-oasis-accent bg-clip-text text-transparent mb-10"
        >
          Mana Katha
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-oasis-muted text-lg md:text-xl font-light mb-14 max-w-xl mx-auto"
        >
          Let&apos;s begin our story &mdash; where flavors meet the sky
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="#reserve"
            className="shimmer-btn bg-oasis-accent text-oasis-bg text-sm tracking-wider uppercase font-medium px-8 py-4 rounded-full"
          >
            Reserve a Table
          </a>
          <a
            href="#menu"
            className="glass-pill text-oasis-accent text-sm tracking-wider uppercase font-medium px-8 py-4 rounded-full hover:bg-oasis-accent/5 transition-all duration-300"
          >
            Explore Menu
          </a>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card inline-flex items-center gap-6 md:gap-10 px-8 py-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.12 }}
              className="flex items-center gap-6 md:gap-10"
            >
              {i > 0 && (
                <div className="w-px h-8 bg-white/30" />
              )}
              <div className="text-center">
                <div className="font-serif text-lg md:text-xl font-bold" style={{ color: '#D4A373' }}>
                  {stat.value}
                </div>
                <div className="text-[10px] tracking-wider uppercase text-oasis-muted mt-1">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-20 flex justify-center"
        >
          <div className="w-5 h-8 rounded-full border border-black/10 flex items-start justify-center pt-1.5" style={{ background: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-1 rounded-full bg-oasis-gold"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
