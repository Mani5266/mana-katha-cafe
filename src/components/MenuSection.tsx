"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import TiltCard from "./TiltCard";

const CATEGORIES = [
  "All",
  "Starters",
  "Mains",
  "Pizzas",
  "Drinks",
  "Desserts",
];

const MENU_ITEMS = [
  { name: "Crispy Corn Pepper Salt", category: "Starters", price: "\u20B9249", tag: "Bestseller" },
  { name: "Paneer Tikka", category: "Starters", price: "\u20B9299", tag: "Chef's Pick" },
  { name: "Chicken Lollipop", category: "Starters", price: "\u20B9329", tag: "" },
  { name: "Veg Manchurian Dry", category: "Starters", price: "\u20B9229", tag: "" },
  { name: "Fish Finger Fry", category: "Starters", price: "\u20B9349", tag: "" },
  { name: "Loaded Nachos", category: "Starters", price: "\u20B9279", tag: "Popular" },
  { name: "Butter Chicken", category: "Mains", price: "\u20B9399", tag: "Bestseller" },
  { name: "Hyderabadi Chicken Biryani", category: "Mains", price: "\u20B9349", tag: "Chef's Pick" },
  { name: "Paneer Butter Masala", category: "Mains", price: "\u20B9329", tag: "" },
  { name: "Mushroom Stroganoff", category: "Mains", price: "\u20B9369", tag: "" },
  { name: "Grilled Chicken Steak", category: "Mains", price: "\u20B9449", tag: "Popular" },
  { name: "Dal Makhani", category: "Mains", price: "\u20B9279", tag: "" },
  { name: "Margherita Pizza", category: "Pizzas", price: "\u20B9299", tag: "" },
  { name: "BBQ Chicken Pizza", category: "Pizzas", price: "\u20B9399", tag: "Bestseller" },
  { name: "Farm Fresh Veggie Pizza", category: "Pizzas", price: "\u20B9329", tag: "" },
  { name: "Pepperoni Pizza", category: "Pizzas", price: "\u20B9449", tag: "" },
  { name: "Cold Coffee", category: "Drinks", price: "\u20B9179", tag: "Bestseller" },
  { name: "Blue Lagoon Mocktail", category: "Drinks", price: "\u20B9199", tag: "Popular" },
  { name: "Mango Mojito", category: "Drinks", price: "\u20B9199", tag: "" },
  { name: "Virgin Pina Colada", category: "Drinks", price: "\u20B9219", tag: "" },
  { name: "Oreo Shake", category: "Drinks", price: "\u20B9199", tag: "" },
  { name: "Brownie with Ice Cream", category: "Desserts", price: "\u20B9249", tag: "Bestseller" },
  { name: "Gulab Jamun", category: "Desserts", price: "\u20B9149", tag: "" },
  { name: "Death by Chocolate", category: "Desserts", price: "\u20B9279", tag: "Popular" },
];

export default function MenuSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-60px", once: true });

  const filtered =
    activeFilter === "All"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeFilter);

  // 3 rows visible: 3 cols on lg, 2 on sm, 1 on mobile
  // We use 9 as the cutoff (3 rows x 3 cols) — on smaller screens it still looks fine
  const VISIBLE_ROWS = 9;
  const shouldCollapse = filtered.length > VISIBLE_ROWS && !expanded;
  const visibleItems = shouldCollapse ? filtered.slice(0, VISIBLE_ROWS) : filtered;
  const hiddenCount = filtered.length - VISIBLE_ROWS;

  // Reset to collapsed when filter changes
  const handleFilterChange = (cat: string) => {
    setActiveFilter(cat);
    setExpanded(false);
  };

  return (
    <section ref={ref} id="menu" className="relative z-10 py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
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
              Our Menu
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-oasis-text tracking-tight">
            Flavors That Tell Stories
          </h2>
          <p className="text-oasis-muted text-sm mt-3 max-w-lg mx-auto">
            A culinary journey across cultures, crafted with passion
          </p>
        </motion.div>

        {/* Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              className={`text-xs tracking-wider uppercase px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-oasis-accent text-oasis-bg shadow-[0_2px_4px_rgba(0,0,0,0.12),0_6px_16px_rgba(51,78,172,0.22),inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-1px_0_rgba(0,0,0,0.12)]"
                  : "glass-pill text-oasis-muted hover:text-oasis-text"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Menu Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                >
                  <TiltCard
                    tiltMax={6}
                    corners={false}
                    scanLine={false}
                    glowSpots={false}
                  >
                    <div className="glass-card p-5 flex justify-between items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-oasis-text group-hover:text-oasis-accent transition-colors duration-300 truncate">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[10px] tracking-wider uppercase text-oasis-muted">
                            {item.category}
                          </span>
                          {item.tag && (
                            <>
                              <span className="w-1 h-1 rounded-full bg-oasis-border" />
                              <span className="text-[10px]" style={{ color: '#D4A373' }}>
                                {item.tag}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <span className="font-serif text-base font-semibold whitespace-nowrap" style={{ color: '#D4A373' }}>
                        {item.price}
                      </span>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>

            {/* Blur fade overlay when collapsed */}
            {shouldCollapse && (
              <div
                className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
                style={{
                  background: "linear-gradient(to bottom, transparent 0%, rgba(247,247,245,0.4) 30%, rgba(247,247,245,0.85) 65%, rgba(247,247,245,1) 100%)",
                  backdropFilter: "blur(2px)",
                  WebkitBackdropFilter: "blur(2px)",
                  maskImage: "linear-gradient(to bottom, transparent, black 40%)",
                  WebkitMaskImage: "linear-gradient(to bottom, transparent, black 40%)",
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Show More / Show Less Button */}
        {filtered.length > VISIBLE_ROWS && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-8"
          >
            <button
              onClick={() => setExpanded(!expanded)}
              className="glass-pill text-oasis-accent text-xs tracking-wider uppercase font-medium px-8 py-3 rounded-full flex items-center gap-2 hover:text-oasis-text transition-colors duration-300"
            >
              {expanded ? (
                <>
                  Show Less
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300">
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </>
              ) : (
                <>
                  Show Full Menu
                  <span className="text-oasis-muted font-normal">({hiddenCount} more)</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
