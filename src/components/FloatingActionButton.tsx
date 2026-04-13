"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ACTIONS = [
  {
    label: "Call Us",
    href: "tel:+918883031111",
    external: false,
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    label: "Swiggy",
    href: "https://www.swiggy.com/restaurants/mana-katha-cafe-and-restaurant-vanasthalipuram-hyderabad-1217845",
    external: true,
    icon: <span className="font-bold text-sm">S</span>,
  },
  {
    label: "Reserve",
    href: "#reserve",
    external: false,
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function FloatingActionButton() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3"
        >
          {/* Action Items */}
          <AnimatePresence>
            {open &&
              ACTIONS.map((action, i) => (
                <motion.a
                  key={action.label}
                  href={action.href}
                  target={action.external ? "_blank" : undefined}
                  rel={action.external ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: 20 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3"
                  onClick={() => !action.external && setOpen(false)}
                >
                  <span className="text-oasis-muted text-xs tracking-wider uppercase glass-pill rounded-full px-3 py-1.5">
                    {action.label}
                  </span>
                  <div className="w-10 h-10 rounded-full glass-circle flex items-center justify-center text-oasis-accent">
                    {action.icon}
                  </div>
                </motion.a>
              ))}
          </AnimatePresence>

          {/* Main FAB */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close quick actions" : "Open quick actions"}
            className="w-14 h-14 rounded-full bg-oasis-accent text-oasis-bg flex items-center justify-center ring-2 ring-white/30 ring-offset-2 ring-offset-transparent transition-all duration-200"
            style={{
              backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.20) 0%, transparent 50%, rgba(0,0,0,0.10) 100%)",
              boxShadow: "0 2px 4px rgba(0,0,0,0.12), 0 6px 16px rgba(51,78,172,0.25), 0 12px 32px rgba(51,78,172,0.12), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.12)",
            }}
          >
            <motion.span
              animate={{ rotate: open ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-2xl leading-none font-light"
            >
              +
            </motion.span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
