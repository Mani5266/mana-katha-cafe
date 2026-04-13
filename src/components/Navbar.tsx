"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Menu", href: "#menu" },
  { label: "Events", href: "#events" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Location", href: "#location" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none"
      >
        <nav
          className={`pointer-events-auto relative liquid-glass-capsule ${
            scrolled ? "liquid-glass-capsule--scrolled" : ""
          } transition-all duration-500`}
        >
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center px-8 h-14 relative z-10">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 shrink-0 group/logo">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover/logo:scale-110"
                style={{
                  background: "rgba(var(--oasis-accent-rgb), 0.12)",
                  border: "1px solid rgba(var(--oasis-accent-rgb), 0.2)",
                  boxShadow:
                    "0 0 12px rgba(var(--oasis-accent-rgb), 0.08), inset 0 1px 2px rgba(255,255,255,0.4)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span className="text-oasis-accent font-serif text-sm font-bold">
                  M
                </span>
              </div>
              <span className="font-serif text-sm font-medium text-oasis-text tracking-wide">
                Mana Katha
              </span>
            </a>

            <div
              className="w-px h-5 mx-6"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, rgba(var(--oasis-accent-rgb), 0.15), transparent)",
              }}
            />

            {/* Links */}
            <div className="flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative text-[11px] tracking-[0.1em] uppercase text-oasis-muted hover:text-oasis-accent transition-colors duration-300 group/link"
                >
                  {link.label}
                  {/* Hover glow underline */}
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-[1px] opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(var(--oasis-accent-rgb), 0.4), transparent)",
                    }}
                  />
                </a>
              ))}
            </div>

            <div
              className="w-px h-5 mx-6"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, rgba(var(--oasis-accent-rgb), 0.15), transparent)",
              }}
            />

            {/* CTA */}
            <a
              href="#reserve"
              className="shimmer-btn bg-oasis-accent text-oasis-bg text-[11px] tracking-[0.1em] uppercase font-medium px-5 py-2 rounded-full"
            >
              Reserve
            </a>
          </div>

          {/* Mobile Nav — centered capsule */}
          <div className="flex md:hidden items-center justify-between px-4 h-11 w-auto max-w-[280px] mx-auto relative z-10">
            <a href="#" className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(var(--oasis-accent-rgb), 0.12)",
                  border: "1px solid rgba(var(--oasis-accent-rgb), 0.2)",
                  boxShadow:
                    "0 0 10px rgba(var(--oasis-accent-rgb), 0.06), inset 0 1px 2px rgba(255,255,255,0.4)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span className="text-oasis-accent font-serif text-xs font-bold">
                  M
                </span>
              </div>
              <span className="font-serif text-sm font-medium text-oasis-text">
                Mana Katha
              </span>
            </a>

            <div
              className="w-px h-4 mx-3"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, rgba(var(--oasis-accent-rgb), 0.15), transparent)",
              }}
            />

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-8 h-8 flex flex-col items-center justify-center gap-1.5"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <motion.span
                animate={
                  mobileOpen
                    ? { rotate: 45, y: 5 }
                    : { rotate: 0, y: 0 }
                }
                className="block w-4 h-[1.5px] bg-oasis-text origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-4 h-[1.5px] bg-oasis-text"
              />
              <motion.span
                animate={
                  mobileOpen
                    ? { rotate: -45, y: -5 }
                    : { rotate: 0, y: 0 }
                }
                className="block w-4 h-[1.5px] bg-oasis-text origin-center"
              />
            </button>
          </div>
        </nav>
      </motion.div>

      {/* Mobile Overlay — also liquid glass */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{
              background: "rgba(255, 255, 255, 0.82)",
              backdropFilter: "blur(60px) saturate(1.8)",
              WebkitBackdropFilter: "blur(60px) saturate(1.8)",
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="text-2xl font-serif text-oasis-text hover:text-oasis-accent transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#reserve"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.05 }}
              className="shimmer-btn bg-oasis-accent text-oasis-bg text-sm tracking-wider uppercase font-medium px-8 py-4 rounded-full mt-4"
            >
              Reserve a Table
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
