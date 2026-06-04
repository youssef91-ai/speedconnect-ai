import type { Metadata } from "next";
import Link from "next/link";
import CategoryGrid from "@/components/CategoryGrid";
import { ArrowRight, Zap, Brain, Cpu, Globe, ChevronRight, Star, TrendingUp, Shield, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "SpeedConnect AI — Next-Gen AI Tools Directory",
  description: "Discover the most powerful AI tools shaping the future. Your command center for the AI revolution.",
};

const featuredTools = [
  {
    name: "Claude",
    category: "Text & Writing",
    desc: "Anthropic's frontier AI assistant for analysis, writing, and complex reasoning tasks.",
    badge: "Trending",
    rating: 4.9,
    color: "#FF3CAC",
  },
  {
    name: "Midjourney",
    category: "Image Generation",
    desc: "Create stunning, photorealistic images and artwork from natural language prompts.",
    badge: "Popular",
    rating: 4.8,
    color: "#7B2FFF",
  },
  {
    name: "GitHub Copilot",
    category: "Code & Dev",
    desc: "AI pair programmer that helps you write better code, faster, directly in your editor.",
    badge: "Editor's Pick",
    rating: 4.7,
    color: "#00E5FF",
  },
  {
    name: "Perplexity",
    category: "Research",
    desc: "AI-powered search and research engine that synthesizes information from the web in real time.",
    badge: "New",
    rating: 4.6,
    color: "#00FF87",
  },
  {
    name: "ElevenLabs",
    category: "Audio & Voice",
    desc: "Ultra-realistic AI voice synthesis and cloning with natural emotion and inflection.",
    badge: "Hot",
    rating: 4.8,
    color: "#FFB800",
  },
  {
    name: "Runway ML",
    category: "Video",
    desc: "AI-powered video generation and editing tools for creators and production studios.",
    badge: "Featured",
    rating: 4.5,
    color: "#FF3CAC",
  },
];

const stats = [
  { value: "2,400+", label: "AI Tools Indexed", icon: Cpu },
  { value: "98%", label: "Accuracy Rate", icon: Shield },
  { value: "Daily", label: "Updates", icon: Clock },
  { value: "150K+", label: "Monthly Users", icon: Globe },
];

const blogPreviews = [
  {
    date: "DEC 18",
    title: "The Rise of Multimodal AI: What it Means for Developers",
    category: "Analysis",
    read: "6 min",
  },
  {
    date: "DEC 15",
    title: "Comparing the Top 5 Code Generation Tools in 2025",
    category: "Comparison",
    read: "10 min",
  },
  {
    date: "DEC 12",
    title: "How Agents Are Replacing Traditional Workflows",
    category: "Deep Dive",
    read: "8 min",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,60,172,0.06) 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(123,47,255,0.06) 0%, transparent 70%)" }}
        />

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          {/* Pre-headline */}
          <div
            className="inline-flex items-center gap-3 mb-8 px-4 py-2"
            style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
          >
            <div className="pulse-dot" />
            <span className="mono text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
              2,400+ AI tools indexed and growing
            </span>
            <ChevronRight size={12} style={{ color: "var(--accent)" }} />
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-none tracking-tight">
            The AI Tools
            <br />
            <span className="gradient-text">Command Center</span>
          </h1>

          <p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            Discover, compare, and connect with the most powerful AI tools shaping the future.
            Cut through the noise. Move at the speed of intelligence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/tools">
              <button className="btn-primary flex items-center gap-2">
                Explore All Tools
                <ArrowRight size={14} />
              </button>
            </Link>
            <Link href="/blog">
              <button className="btn-outline">Read the Blog</button>
            </Link>
          </div>

          {/* Stats bar */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-px max-w-3xl mx-auto"
            style={{ background: "var(--border)" }}
          >
            {stats.map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 py-6 px-4"
                style={{ background: "var(--surface)" }}
              >
                <Icon size={16} style={{ color: "var(--accent)" }} />
                <div className="text-2xl font-black" style={{ color: "var(--text)" }}>{value}</div>
                <div className="mono text-xs" style={{ color: "var(--text-muted)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="section-label mb-3">Featured This Week</div>
            <h2 className="text-3xl md:text-4xl font-black">
              Top AI Tools <span style={{ color: "var(--accent)" }}>Right Now</span>
            </h2>
          </div>
          <Link href="/tools">
            <button className="btn-outline flex items-center gap-2">
              View All <ArrowRight size={14} />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredTools.map((tool) => (
            <div key={tool.name} className="card corner-tl corner-br relative overflow-hidden">
              {/* Accent line at top */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${tool.color}, transparent)` }}
              />

              <div className="flex items-start justify-between mb-4">
                <div>
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center mb-3 text-base font-black"
                    style={{
                      background: `${tool.color}15`,
                      border: `1px solid ${tool.color}30`,
                      color: tool.color,
                    }}
                  >
                    {tool.name[0]}
                  </div>
                  <h3 className="font-bold text-lg">{tool.name}</h3>
                </div>
                <span
                  className="tag"
                  style={{
                    borderColor: `${tool.color}40`,
                    color: tool.color,
                    background: `${tool.color}10`,
                  }}
                >
                  {tool.badge}
                </span>
              </div>

              <p className="text-sm mb-5 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {tool.desc}
              </p>

              <div className="flex items-center justify-between">
                <span className="tag">{tool.category}</span>
                <div className="flex items-center gap-1">
                  <Star size={12} fill="#FFB800" style={{ color: "#FFB800" }} />
                  <span className="mono text-xs" style={{ color: "var(--text-muted)" }}>{tool.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-24" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-label mb-3">Browse by Category</div>
          <h2 className="text-3xl md:text-4xl font-black mb-12">
            Every Dimension of <span style={{ color: "var(--accent)" }}>AI</span>
          </h2>
          <CategoryGrid />
        </div>
      </section>

      {/* Why SpeedConnect */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-label mb-3">Why SpeedConnect</div>
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
              Built for the<br />
              <span className="gradient-text">AI-Native</span><br />
              Generation
            </h2>
            <p className="mb-8 leading-relaxed" style={{ color: "var(--text-muted)" }}>
              We don't just list tools — we analyze them, benchmark them, and surface what actually matters. Whether you're building the next startup or just trying to save time, SpeedConnect gets you there faster.
            </p>
            <div className="flex flex-col gap-4">
              {[
                { icon: TrendingUp, text: "Real-time trending data from 150K+ monthly users" },
                { icon: Brain, text: "AI-curated recommendations based on your use case" },
                { icon: Shield, text: "Verified reviews from verified professionals" },
                { icon: Zap, text: "Instant compare mode for side-by-side analysis" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.2)" }}
                  >
                    <Icon size={14} style={{ color: "var(--accent)" }} />
                  </div>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual panel */}
          <div
            className="relative p-8"
            style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
          >
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }} />
            <div className="mono text-xs mb-6" style={{ color: "var(--accent)" }}>// live_feed.ai</div>
            <div className="flex flex-col gap-3">
              {[
                { tool: "GPT-4o", action: "Added to compare", time: "2s ago", color: "#00E5FF" },
                { tool: "Gemini Ultra", action: "New review posted", time: "1m ago", color: "#7B2FFF" },
                { tool: "Stable Diffusion 3", action: "Version updated", time: "5m ago", color: "#FF3CAC" },
                { tool: "Claude 3.5", action: "Featured this week", time: "12m ago", color: "#00FF87" },
                { tool: "Sora", action: "Category: Video AI", time: "18m ago", color: "#FFB800" },
                { tool: "Llama 3.1", action: "New benchmarks live", time: "32m ago", color: "#00E5FF" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3 px-4"
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderLeft: `3px solid ${item.color}`,
                  }}
                >
                  <div>
                    <div className="text-sm font-semibold">{item.tool}</div>
                    <div className="mono text-xs" style={{ color: "var(--text-muted)" }}>{item.action}</div>
                  </div>
                  <div className="mono text-xs" style={{ color: "var(--text-muted)" }}>{item.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog preview */}
      <section className="py-24" style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="section-label mb-3">From the Blog</div>
              <h2 className="text-3xl md:text-4xl font-black">
                Signals from the <span style={{ color: "var(--accent)" }}>Frontier</span>
              </h2>
            </div>
            <Link href="/blog">
              <button className="btn-outline flex items-center gap-2">
                All Posts <ArrowRight size={14} />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {blogPreviews.map((post, i) => (
              <Link href="/blog" key={i}>
                <div className="card h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="mono text-xs" style={{ color: "var(--accent)" }}>{post.date}</span>
                    <span className="tag">{post.category}</span>
                    <span className="tag ml-auto">{post.read}</span>
                  </div>
                  <h3 className="font-bold text-lg leading-snug mb-4">{post.title}</h3>
                  <div className="flex items-center gap-1 mt-auto" style={{ color: "var(--accent)" }}>
                    <span className="mono text-xs">Read more</span>
                    <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div
          className="relative text-center py-20 px-8 overflow-hidden"
          style={{ border: "1px solid rgba(0,229,255,0.3)", background: "var(--surface)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, rgba(0,229,255,0.05) 0%, transparent 70%)" }}
          />
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--accent-2), transparent)" }} />

          <div className="section-label justify-center mb-4">Get Started</div>
          <h2 className="text-3xl md:text-5xl font-black mb-4 relative z-10">
            Ready to move at the<br />
            <span className="gradient-text">speed of AI?</span>
          </h2>
          <p className="text-lg mb-8 relative z-10" style={{ color: "var(--text-muted)" }}>
            Join 150,000+ professionals using SpeedConnect AI to stay ahead.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link href="/tools">
              <button className="btn-primary flex items-center gap-2">
                Browse AI Tools <ArrowRight size={14} />
              </button>
            </Link>
            <Link href="/contact">
              <button className="btn-outline">Submit a Tool</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
