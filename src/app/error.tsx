"use client";

import { motion } from "framer-motion";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-oasis-bg flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="font-serif text-6xl text-oasis-accent mb-4">Oops</h1>
        <p className="text-oasis-muted text-sm mb-8">
          Something went wrong. The kitchen is working on it.
        </p>
        <button
          onClick={reset}
          className="shimmer-btn bg-oasis-accent text-oasis-bg text-sm tracking-wider uppercase px-8 py-4 rounded-full font-medium"
        >
          Try Again
        </button>
      </motion.div>
    </div>
  );
}
