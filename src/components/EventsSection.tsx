"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TiltCard from "./TiltCard";

const EVENTS = [
  {
    title: "Live Band Night",
    date: "Every Friday & Saturday",
    time: "8:00 PM",
    description:
      "Experience electrifying live performances by the city's best bands. Feel the music under the open sky.",
    tag: "Weekly",
  },
  {
    title: "Acoustic Sundays",
    date: "Every Sunday",
    time: "7:00 PM",
    description:
      "Unwind with soulful acoustic sessions, perfectly paired with our signature beverages and rooftop views.",
    tag: "Weekly",
  },
  {
    title: "DJ Night",
    date: "Select Saturdays",
    time: "9:00 PM",
    description:
      "Dance the night away with our resident DJs spinning the best mixes. Premium vibes, rooftop energy.",
    tag: "Bi-Weekly",
  },
  {
    title: "Private Events & Parties",
    date: "By Reservation",
    time: "Flexible",
    description:
      "Celebrate birthdays, anniversaries, and corporate events at the city\u2019s most stunning rooftop venue.",
    tag: "Book Now",
  },
];

export default function EventsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-60px", once: true });

  return (
    <section ref={ref} id="events" className="relative z-10 py-20 px-6">
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
              What&apos;s Happening
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-oasis-text tracking-tight">
            Events & Nights
          </h2>
          <p className="text-oasis-muted text-sm mt-3 max-w-lg mx-auto">
            Every visit is a celebration under the stars
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {EVENTS.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <TiltCard
                tiltMax={8}
                corners={true}
                scanLine={true}
                glowSpots={true}
              >
                <div className="glass-card p-6 md:p-8 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] tracking-wider uppercase px-3 py-1 rounded-full glass-pill text-oasis-accent">
                      {event.tag}
                    </span>
                    <span className="text-oasis-muted text-xs">
                      {event.date}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-oasis-text mb-3 group-hover:text-oasis-accent transition-colors duration-300">
                    {event.title}
                  </h3>
                  <p className="text-oasis-muted text-sm leading-relaxed mb-4">
                    {event.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-oasis-muted text-xs">
                      {event.time}
                    </span>
                    <span className="text-xs group-hover:underline" style={{ color: '#D4A373' }}>
                      Learn more &rarr;
                    </span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
