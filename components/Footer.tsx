"use client";
import Link from "next/link";
import { Zap, Code, AtSign, Network, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
      <div className="ticker-line" />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 flex items-center justify-center"
                style={{
                  background: "var(--accent)",
                  clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                }}
              >
                <Zap size={16} style={{ color: "var(--bg)" }} fill="currentColor" />
              </div>
              <span className="font-bold text-base" style={{ fontFamily: "'Space Mono', monospace" }}>
                Speed<span style={{ color: "var(--accent)" }}>Connect</span>
                <span className="text-xs ml-1" style={{ color: "var(--accent-2)" }}>AI</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
              Your command center for the AI revolution. Discover and connect with tools that move at the speed of thought.
            </p>
            <div className="flex gap-4">
              {[AtSign, Code, Network, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex items-center justify-center w-8 h-8 transition-all duration-200"
                  style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                    (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: "Navigate",
              links: [
                { label: "Home", href: "/" },
                { label: "AI Tools Directory", href: "/tools" },
                { label: "Blog", href: "/blog" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
              ],
            },
            {
              title: "Categories",
              links: [
                { label: "Text & Writing", href: "/tools?cat=text" },
                { label: "Image Generation", href: "/tools?cat=image" },
                { label: "Code & Dev", href: "/tools?cat=code" },
                { label: "Audio & Voice", href: "/tools?cat=audio" },
                { label: "Research", href: "/tools?cat=research" },
              ],
            },
            {
              title: "Company",
              links: [
                { label: "About Us", href: "/about" },
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
                { label: "Sitemap", href: "#" },
                { label: "RSS Feed", href: "#" },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h3
                className="mono text-xs tracking-widest uppercase mb-5"
                style={{ color: "var(--accent)" }}
              >
                {col.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm transition-colors duration-200"
                      style={{ color: "var(--text-muted)" }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--text)")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text-muted)")}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="ticker-line mt-12 mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="mono text-xs" style={{ color: "var(--text-muted)" }}>
            © 2025 SpeedConnect AI. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="pulse-dot" style={{ width: "6px", height: "6px" }} />
            <span className="mono text-xs" style={{ color: "var(--text-muted)" }}>
              All systems operational
            </span>
          </div>
          <p className="mono text-xs" style={{ color: "var(--text-muted)" }}>
            Built for the AI-native generation
          </p>
        </div>
      </div>
    </footer>
  );
}
