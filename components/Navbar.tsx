"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Zap } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "AI Tools" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      style={{
        background: scrolled ? "rgba(5,10,14,0.95)" : "transparent",
        borderBottom: scrolled ? "1px solid #1A2D3A" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        transition: "all 0.3s ease",
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div
              className="w-8 h-8 flex items-center justify-center"
              style={{
                background: "var(--accent)",
                clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
              }}
            >
              <Zap size={16} style={{ color: "var(--bg)" }} fill="currentColor" />
            </div>
          </div>
          <span className="font-bold text-base tracking-tight" style={{ fontFamily: "'Space Mono', monospace" }}>
            Speed<span style={{ color: "var(--accent)" }}>Connect</span>
            <span className="text-xs ml-1" style={{ color: "var(--accent-2)" }}>AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="mono text-xs tracking-widest uppercase transition-colors duration-200"
              style={{
                color: pathname === l.href ? "var(--accent)" : "var(--text-muted)",
              }}
              onMouseEnter={(e) => { if (pathname !== l.href) (e.target as HTMLElement).style.color = "var(--text)"; }}
              onMouseLeave={(e) => { if (pathname !== l.href) (e.target as HTMLElement).style.color = "var(--text-muted)"; }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="pulse-dot" />
            <span className="mono text-xs" style={{ color: "var(--text-muted)" }}>Live</span>
          </div>
          <Link href="/tools">
            <button className="btn-primary text-xs">Explore Tools</button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          style={{ color: "var(--text)" }}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-6 py-4 flex flex-col gap-4"
          style={{ background: "rgba(5,10,14,0.98)", borderTop: "1px solid var(--border)" }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="mono text-sm"
              style={{ color: pathname === l.href ? "var(--accent)" : "var(--text-muted)" }}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/tools" onClick={() => setOpen(false)}>
            <button className="btn-primary w-full mt-2">Explore Tools</button>
          </Link>
        </div>
      )}
    </header>
  );
}
