import type { Metadata } from "next";
import { ArrowRight, Clock, Tag } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — AI Insights & Analysis",
  description: "Deep dives, comparisons, and frontier intelligence on the AI tools shaping tomorrow. Updated weekly by the SpeedConnect AI team.",
};

const featured = {
  date: "December 18, 2025",
  category: "Deep Dive",
  title: "The Multimodal Shift: Why Every AI Tool Will Process Images, Audio, and Video by 2026",
  excerpt: "The era of single-modality AI is ending. We analyzed 200 AI tools launched in Q4 2025 — and 78% now include some form of multimodal capability. Here's what that means for builders and creators.",
  read: "12 min read",
  author: "Editorial Team",
  tags: ["Multimodal", "Trends", "2026 Predictions"],
};

const posts = [
  {
    date: "Dec 15, 2025", category: "Comparison", title: "Claude vs GPT-4o vs Gemini Ultra: The Definitive 2025 Benchmark", read: "15 min", tags: ["LLM", "Benchmark"],
    excerpt: "We ran 500 prompts across 8 categories to find the real winner. The results might surprise you.",
  },
  {
    date: "Dec 12, 2025", category: "Analysis", title: "How AI Agents Are Replacing Traditional Software Workflows", read: "8 min", tags: ["Agents", "Automation"],
    excerpt: "Agentic AI isn't a buzzword anymore — it's eating SaaS. We map the disruption category by category.",
  },
  {
    date: "Dec 9, 2025", category: "Tutorial", title: "Building a Custom AI Research Pipeline with 5 Free Tools", read: "10 min", tags: ["Tutorial", "Research"],
    excerpt: "Step-by-step guide to automating research using Perplexity, Claude, Notion AI, and more.",
  },
  {
    date: "Dec 5, 2025", category: "Spotlight", title: "ElevenLabs Just Changed Voice AI Forever. Here's How.", read: "6 min", tags: ["Voice AI", "Audio"],
    excerpt: "Their latest model passes the human detection test in 94% of cases. The implications are massive.",
  },
  {
    date: "Dec 2, 2025", category: "Opinion", title: "The Open Source AI Renaissance: Why 2025 Was Different", read: "7 min", tags: ["Open Source", "LLM"],
    excerpt: "Llama 3.1, Mistral, and Falcon changed the game. We reflect on why the open ecosystem finally won.",
  },
  {
    date: "Nov 28, 2025", category: "Guide", title: "AI Code Editors Ranked: Cursor vs GitHub Copilot vs Codeium", read: "11 min", tags: ["Code", "Developer Tools"],
    excerpt: "Three months, three tools, one developer. An honest review from real production usage.",
  },
];

const categoryColors: Record<string, string> = {
  "Deep Dive": "#00E5FF",
  "Comparison": "#7B2FFF",
  "Analysis": "#FF3CAC",
  "Tutorial": "#00FF87",
  "Spotlight": "#FFB800",
  "Opinion": "#FF3CAC",
  "Guide": "#00E5FF",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-24">
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="section-label mb-3">Blog</div>
        <h1 className="text-4xl md:text-6xl font-black mb-4">
          Signals from the <span style={{ color: "var(--accent)" }}>Frontier</span>
        </h1>
        <p className="text-lg max-w-xl" style={{ color: "var(--text-muted)" }}>
          Deep analysis, honest comparisons, and forward-looking coverage of the AI tools ecosystem.
        </p>
      </section>

      {/* Featured post */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div
          className="relative overflow-hidden p-8 md:p-12"
          style={{ border: "1px solid rgba(0,229,255,0.3)", background: "var(--surface)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at top left, rgba(0,229,255,0.05) 0%, transparent 60%)" }}
          />
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, var(--accent), transparent)" }} />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="tag"
                  style={{ borderColor: `${categoryColors[featured.category]}40`, color: categoryColors[featured.category], background: `${categoryColors[featured.category]}10` }}
                >
                  ★ Featured
                </span>
                <span className="tag">{featured.category}</span>
                <span className="mono text-xs" style={{ color: "var(--text-muted)" }}>{featured.date}</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-black mb-4 leading-tight">{featured.title}</h2>
              <p className="leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>{featured.excerpt}</p>
              <Link href="/blog/post">
                <button className="btn-primary flex items-center gap-2">
                  Read Article <ArrowRight size={14} />
                </button>
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              <div className="p-4" style={{ border: "1px solid var(--border)", background: "var(--bg)" }}>
                <div className="mono text-xs mb-2" style={{ color: "var(--text-muted)" }}>Read Time</div>
                <div className="flex items-center gap-2">
                  <Clock size={16} style={{ color: "var(--accent)" }} />
                  <span className="font-bold">{featured.read}</span>
                </div>
              </div>
              <div className="p-4" style={{ border: "1px solid var(--border)", background: "var(--bg)" }}>
                <div className="mono text-xs mb-2" style={{ color: "var(--text-muted)" }}>Author</div>
                <span className="font-bold">{featured.author}</span>
              </div>
              <div className="p-4" style={{ border: "1px solid var(--border)", background: "var(--bg)" }}>
                <div className="mono text-xs mb-2" style={{ color: "var(--text-muted)" }}>Topics</div>
                <div className="flex flex-wrap gap-2">
                  {featured.tags.map((tag) => (
                    <span key={tag} className="tag tag-accent">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All posts grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="section-label mb-8">All Posts</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post, i) => (
            <Link href="/blog/post" key={i}>
              <div
                className="card h-full flex flex-col"
                style={{ position: "relative", overflow: "hidden" }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${categoryColors[post.category] || "var(--accent)"}, transparent)` }}
                />
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="tag"
                    style={{
                      borderColor: `${(categoryColors[post.category] || "#00E5FF")}40`,
                      color: categoryColors[post.category] || "var(--accent)",
                      background: `${(categoryColors[post.category] || "#00E5FF")}10`,
                    }}
                  >
                    {post.category}
                  </span>
                  <span className="mono text-xs ml-auto" style={{ color: "var(--text-muted)" }}>{post.date}</span>
                </div>

                <h3 className="font-bold text-lg leading-snug mb-3">{post.title}</h3>
                <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "var(--text-muted)" }}>{post.excerpt}</p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex gap-1">
                    {post.tags.slice(0, 1).map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                    <Clock size={11} />
                    <span className="mono text-xs">{post.read}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter */}
        <div
          className="mt-16 p-8 text-center relative overflow-hidden"
          style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
        >
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--accent-2), transparent)" }} />
          <div className="section-label justify-center mb-3">Newsletter</div>
          <h3 className="text-2xl md:text-3xl font-black mb-3">
            Stay on the <span style={{ color: "var(--accent)" }}>Frontier</span>
          </h3>
          <p className="mb-6" style={{ color: "var(--text-muted)" }}>
            Weekly digest of the most important AI tool releases, analyses, and insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="your@email.com" className="input-field flex-1" />
            <button className="btn-primary whitespace-nowrap">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
}
