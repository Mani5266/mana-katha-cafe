"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TiltCard from "./TiltCard";

export default function LocationSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-60px", once: true });

  return (
    <section ref={ref} id="location" className="relative z-10 py-20 px-6">
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
              Find Us
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-oasis-text tracking-tight">
            Visit Mana Katha
          </h2>
          <p className="text-oasis-muted text-sm mt-3 max-w-lg mx-auto">
            Your table is waiting
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 items-stretch">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="md:col-span-3"
          >
            <TiltCard
              tiltMax={5}
              corners={false}
              scanLine={false}
              glowSpots={false}
            >
              <div
                className="glass-card overflow-hidden"
                style={{ minHeight: "360px" }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.5!2d78.5573!3d17.3216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDE5JzE3LjgiTiA3OMKwMzMnMjYuMyJF!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    minHeight: "360px",
                    filter:
                      "brightness(1.05) contrast(1.05) saturate(0.8) sepia(0.05)",
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mana Katha Cafe Location"
                />
              </div>
            </TiltCard>
          </motion.div>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="md:col-span-2"
          >
            <TiltCard
              tiltMax={8}
              corners={true}
              scanLine={true}
              glowSpots={true}
            >
              <div className="glass-card p-8 md:p-10 flex flex-col justify-between h-full">
                {/* Address */}
                <div className="mb-6">
                  <div className="text-oasis-accent text-[10px] tracking-[0.15em] uppercase mb-2">
                    Address
                  </div>
                  <p className="text-oasis-text text-sm leading-relaxed">
                    5th & 6th floor, BNR Tower
                    <br />
                    Panama Godowns, Plot no 38&39
                    <br />
                    Above Mithaiwala
                    <br />
                    Telangana 500070
                  </p>
                </div>

                {/* Hours */}
                <div className="mb-6">
                  <div className="text-oasis-accent text-[10px] tracking-[0.15em] uppercase mb-2">
                    Hours
                  </div>
                  <p className="text-oasis-text text-sm">
                    12:00 PM &ndash; 12:30 AM
                  </p>
                  <p className="text-oasis-muted text-xs mt-1">
                    Open all days of the week
                  </p>
                </div>

                {/* Contact */}
                <div className="mb-8">
                  <div className="text-oasis-accent text-[10px] tracking-[0.15em] uppercase mb-2">
                    Contact
                  </div>
                  <a
                    href="tel:+918883031111"
                    className="text-oasis-text text-sm hover:text-oasis-accent transition-colors"
                  >
                    +91 88830 31111
                  </a>
                </div>

                {/* Get Directions */}
                <a
                  href="https://www.google.com/maps/search/Mana+Katha+Cafe+Vanasthalipuram+Hyderabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shimmer-btn w-full bg-oasis-accent text-oasis-bg text-sm tracking-wider uppercase font-medium py-4 rounded-xl text-center block"
                >
                  Get Directions
                </a>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
