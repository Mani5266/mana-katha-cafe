import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const SITE_URL = "https://manakathacafe.in";

export const viewport: Viewport = {
  themeColor: "#334EAC",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Mana Katha Cafe & Restaurant - Hyderabad's Largest Rooftop Cafe",
  description:
    "Where our story begins. Live music, handcrafted dishes, and unforgettable moments at Hyderabad's largest multistoried rooftop cafe in Vanasthalipuram.",
  keywords: [
    "mana katha cafe",
    "mana katha",
    "hyderabad cafe",
    "rooftop cafe",
    "rooftop cafe hyderabad",
    "vanasthalipuram cafe",
    "live music cafe hyderabad",
    "best cafes in hyderabad",
    "outdoor dining hyderabad",
    "largest rooftop cafe hyderabad",
  ],
  authors: [{ name: "Mana Katha Cafe & Restaurant" }],
  creator: "Mana Katha Cafe & Restaurant",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Mana Katha Cafe & Restaurant",
    title: "Mana Katha Cafe & Restaurant - Hyderabad's Largest Rooftop Cafe",
    description:
      "Where our story begins. Live music, handcrafted dishes, and unforgettable moments under the stars.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mana Katha Cafe - Rooftop dining in Hyderabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mana Katha Cafe & Restaurant - Hyderabad's Largest Rooftop Cafe",
    description:
      "Where our story begins. Live music, handcrafted dishes, and unforgettable moments under the stars.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Mana Katha Cafe & Restaurant",
    image: `${SITE_URL}/og-image.jpg`,
    url: SITE_URL,
    telephone: "+918883031111",
    priceRange: "$$",
    servesCuisine: ["South Indian", "Continental", "Italian", "Chinese"],
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "5th & 6th floor, BNR Tower, Panama Godowns, H.no:5-581/1A, Plot no 38&39",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500070",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 17.3216,
      longitude: 78.5573,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "12:00",
      closes: "00:30",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      reviewCount: "418",
      bestRating: "5",
    },
    description:
      "Hyderabad's largest multistoried rooftop cafe. Live music, handcrafted dishes, and unforgettable moments.",
    hasMenu: `${SITE_URL}/#menu`,
    acceptsReservations: "True",
  };

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-oasis-bg text-oasis-text font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
