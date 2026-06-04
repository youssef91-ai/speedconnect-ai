"use client";
import Link from "next/link";

const categories = [
  { label: "Text & Writing", emoji: "✍️", count: 412 },
  { label: "Image Gen", emoji: "🎨", count: 298 },
  { label: "Code & Dev", emoji: "💻", count: 356 },
  { label: "Audio & Voice", emoji: "🎙️", count: 187 },
  { label: "Research", emoji: "🔬", count: 234 },
  { label: "Video", emoji: "🎬", count: 143 },
];

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {categories.map((cat) => (
        <Link href={`/tools?cat=${cat.label}`} key={cat.label}>
          <div
            className="p-5 text-center transition-all duration-300 cursor-pointer"
            style={{ border: "1px solid var(--border)", background: "var(--bg)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,229,255,0.4)";
              (e.currentTarget as HTMLElement).style.background = "rgba(0,229,255,0.04)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.background = "var(--bg)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            <div className="text-2xl mb-3">{cat.emoji}</div>
            <div className="font-bold text-sm mb-1">{cat.label}</div>
            <div className="mono text-xs" style={{ color: "var(--text-muted)" }}>{cat.count} tools</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
