"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import TiltCard from "./TiltCard";

const GALLERY = [
  {
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=1000&q=80",
    title: "Rooftop Ambience",
    aspect: "aspect-[4/5]",
  },
  {
    url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=800&q=80",
    title: "Crafted Dishes",
    aspect: "aspect-square",
  },
  {
    url: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&h=1000&q=80",
    title: "Live Performances",
    aspect: "aspect-[4/5]",
  },
  {
    url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=800&q=80",
    title: "Evening Vibes",
    aspect: "aspect-square",
  },
  {
    url: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=1000&q=80",
    title: "Sky Dining",
    aspect: "aspect-[4/5]",
  },
  {
    url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=800&q=80",
    title: "Signature Drinks",
    aspect: "aspect-square",
  },
];

export default function GallerySection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-60px", once: true });

  return (
    <section ref={ref} id="gallery" className="relative z-10 py-20 px-6">
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
              Gallery
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-oasis-text tracking-tight">
            Visual Stories
          </h2>
          <p className="text-oasis-muted text-sm mt-3 max-w-lg mx-auto">
            A glimpse into the Mana Katha experience
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY.map((img, i) => (
            <motion.div
              key={img.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <TiltCard
                tiltMax={12}
                corners={true}
                scanLine={true}
                glowSpots={true}
                rounded="rounded-2xl"
              >
                <div
                  className={`relative overflow-hidden ${img.aspect} rounded-2xl`}
                >
                  <Image
                    src={img.url}
                    alt={img.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
                  {/* Glass overlay on hover */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-black/5 transition-colors duration-500" style={{ backdropFilter: 'blur(0px)', transition: 'backdrop-filter 0.5s ease, background-color 0.5s ease' }} />
                  {/* Glass title bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 rounded-lg px-3 py-2" style={{ background: 'rgba(51, 78, 172, 0.45)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
                      <p className="text-white text-sm font-medium">
                        {img.title}
                      </p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-10"
        >
          <a
            href="https://www.instagram.com/manakathacafe"
            target="_blank"
            rel="noopener noreferrer"
            className="text-oasis-accent text-sm hover:underline"
          >
            Follow @manakathacafe for more &rarr;
          </a>
        </motion.div>
      </div>
    </section>
  );
}
