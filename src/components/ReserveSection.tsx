"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import TiltCard from "./TiltCard";

export default function ReserveSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-60px", once: true });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section ref={ref} id="reserve" className="relative z-10 py-20 px-6">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-oasis-accent/[0.03] blur-[120px] pointer-events-none" />

      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-oasis-accent glow-dot" />
            <span className="text-oasis-accent text-xs font-medium tracking-wider uppercase">
              Reservations
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-oasis-text tracking-tight">
            Reserve Your Spot
          </h2>
          <p className="text-oasis-muted text-sm mt-3 max-w-lg mx-auto">
            Book your table under the stars
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <TiltCard
            tiltMax={8}
            corners={true}
            scanLine={true}
            glowSpots={true}
          >
            <div className="glass-card-strong p-8 md:p-10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full glass-circle flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-oasis-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-2" style={{ color: '#D4A373' }}>
                    Table Reserved!
                  </h3>
                  <p className="text-oasis-muted text-sm">
                    We&apos;ll confirm your reservation shortly. See you under
                    the stars!
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-oasis-accent text-xs tracking-wider uppercase hover:underline"
                  >
                    Make Another Reservation
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-oasis-muted text-[10px] tracking-wider uppercase block mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        className="w-full glass-input rounded-xl px-4 py-3 text-oasis-text text-sm placeholder:text-oasis-muted/50 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-oasis-muted text-[10px] tracking-wider uppercase block mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full glass-input rounded-xl px-4 py-3 text-oasis-text text-sm placeholder:text-oasis-muted/50 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-5">
                    <div>
                      <label className="text-oasis-muted text-[10px] tracking-wider uppercase block mb-2">
                        Date
                      </label>
                      <input
                        type="date"
                        required
                        className="w-full glass-input rounded-xl px-4 py-3 text-oasis-text text-sm focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-oasis-muted text-[10px] tracking-wider uppercase block mb-2">
                        Time
                      </label>
                      <select
                        required
                        className="w-full glass-input rounded-xl px-4 py-3 text-oasis-text text-sm focus:outline-none"
                      >
                        <option value="">Select</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="13:00">1:00 PM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="18:00">6:00 PM</option>
                        <option value="19:00">7:00 PM</option>
                        <option value="19:30">7:30 PM</option>
                        <option value="20:00">8:00 PM</option>
                        <option value="20:30">8:30 PM</option>
                        <option value="21:00">9:00 PM</option>
                        <option value="21:30">9:30 PM</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-oasis-muted text-[10px] tracking-wider uppercase block mb-2">
                        Guests
                      </label>
                      <select
                        required
                        className="w-full glass-input rounded-xl px-4 py-3 text-oasis-text text-sm focus:outline-none"
                      >
                        <option value="">Select</option>
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="5">5 Guests</option>
                        <option value="6">6 Guests</option>
                        <option value="7">7 Guests</option>
                        <option value="8+">8+ Guests</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-oasis-muted text-[10px] tracking-wider uppercase block mb-2">
                      Special Requests
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Birthday, anniversary, dietary needs..."
                      className="w-full glass-input rounded-xl px-4 py-3 text-oasis-text text-sm placeholder:text-oasis-muted/50 focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="shimmer-btn w-full bg-oasis-accent text-oasis-bg text-sm tracking-wider uppercase font-medium py-4 rounded-xl"
                  >
                    Reserve Table
                  </button>
                </form>
              )}

              {/* Quick Contact */}
              <div className="mt-6 text-center">
                <p className="text-oasis-muted text-xs">
                  Or call us directly:{" "}
                  <a
                    href="tel:+918883031111"
                    className="text-oasis-accent hover:underline"
                  >
                    +91 88830 31111
                  </a>
                </p>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
