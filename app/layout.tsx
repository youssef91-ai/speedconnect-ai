import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "SpeedConnect AI — Next-Gen AI Tools Directory",
    template: "%s | SpeedConnect AI",
  },
  description: "Discover, compare, and connect with the most powerful AI tools shaping the future. SpeedConnect AI is your command center for the AI revolution.",
  keywords: ["AI tools", "artificial intelligence", "machine learning", "AI directory", "productivity tools", "AI software"],
  authors: [{ name: "SpeedConnect AI" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://speedconnect.ai",
    siteName: "SpeedConnect AI",
    title: "SpeedConnect AI — Next-Gen AI Tools Directory",
    description: "Discover, compare, and connect with the most powerful AI tools shaping the future.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SpeedConnect AI",
    description: "Your command center for the AI revolution.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="noise scanlines grid-bg min-h-screen">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
