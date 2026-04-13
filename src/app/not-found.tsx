import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-oasis-bg flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-serif text-8xl text-oasis-accent mb-4">404</h1>
        <p className="font-serif text-2xl text-oasis-text mb-2">
          Lost in the Mana Katha
        </p>
        <p className="text-oasis-muted text-sm mb-8">
          This page doesn&apos;t exist, but our rooftop does.
        </p>
        <Link
          href="/"
          className="shimmer-btn inline-block bg-oasis-accent text-oasis-bg text-sm tracking-wider uppercase px-8 py-4 rounded-full font-medium"
        >
          Back to Mana Katha
        </Link>
      </div>
    </div>
  );
}
