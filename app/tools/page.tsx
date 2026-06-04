import type { Metadata } from "next";
import { Search, Star, ExternalLink, TrendingUp, Zap, Filter } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Tools Directory",
  description: "Browse 2,400+ AI tools across every category. Find the perfect tool for writing, coding, design, research, and more.",
};

const tools = [
  { name: "Claude", category: "Text & Writing", rating: 4.9, users: "50M+", free: true, badge: "Top Rated", color: "#FF3CAC", desc: "Anthropic's most capable AI assistant for analysis, coding, and long-context tasks." },
  { name: "ChatGPT", category: "Text & Writing", rating: 4.8, users: "100M+", free: true, badge: "Most Used", color: "#00E5FF", desc: "OpenAI's flagship conversational AI powering millions of workflows worldwide." },
  { name: "Midjourney", category: "Image Gen", rating: 4.8, users: "20M+", free: false, badge: "Best Art", color: "#7B2FFF", desc: "Industry-leading AI image generation with stunning photorealistic and artistic outputs." },
  { name: "GitHub Copilot", category: "Code & Dev", rating: 4.7, users: "10M+", free: false, badge: "Editor's Pick", color: "#00E5FF", desc: "AI pair programmer integrated into VS Code, JetBrains, and more." },
  { name: "Perplexity", category: "Research", rating: 4.6, users: "15M+", free: true, badge: "Trending", color: "#00FF87", desc: "AI search engine that synthesizes real-time web information with citations." },
  { name: "ElevenLabs", category: "Audio & Voice", rating: 4.8, users: "5M+", free: true, badge: "Best Voice", color: "#FFB800", desc: "Ultra-realistic AI voice cloning and speech synthesis platform." },
  { name: "Runway ML", category: "Video", rating: 4.5, users: "3M+", free: true, badge: "Hot", color: "#FF3CAC", desc: "AI-powered video creation and editing for next-generation content." },
  { name: "Notion AI", category: "Productivity", rating: 4.5, users: "30M+", free: false, badge: "Popular", color: "#7B2FFF", desc: "AI-powered workspace for notes, docs, wikis and project management." },
  { name: "Stable Diffusion", category: "Image Gen", rating: 4.6, users: "10M+", free: true, badge: "Open Source", color: "#00E5FF", desc: "Open-source image generation model you can run locally or via API." },
  { name: "Gemini", category: "Text & Writing", rating: 4.7, users: "40M+", free: true, badge: "New", color: "#00FF87", desc: "Google's multimodal AI with deep integration across Google Workspace." },
  { name: "Whisper", category: "Audio & Voice", rating: 4.7, users: "8M+", free: true, badge: "Open Source", color: "#FFB800", desc: "OpenAI's state-of-the-art speech recognition model with multilingual support." },
  { name: "Cursor", category: "Code & Dev", rating: 4.8, users: "2M+", free: true, badge: "Rising", color: "#FF3CAC", desc: "AI-first code editor built on VS Code with in-editor chat and agentic coding." },
];

const categories = ["All", "Text & Writing", "Image Gen", "Code & Dev", "Audio & Voice", "Research", "Video", "Productivity"];

export default function ToolsPage() {
  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="section-label mb-3">AI Tools Directory</div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              Find the Right<br />
              <span style={{ color: "var(--accent)" }}>AI Tool</span>
            </h1>
          </div>
          <p className="text-lg max-w-md leading-relaxed" style={{ color: "var(--text-muted)" }}>
            2,400+ tools across every category. Benchmarked, reviewed, and updated daily.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative max-w-2xl">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: "var(--text-muted)" }}
          />
          <input
            type="text"
            placeholder="Search AI tools, categories, use cases..."
            className="input-field pl-11"
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary"
            style={{ padding: "6px 16px", fontSize: "0.7rem" }}
          >
            Search
          </button>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className="whitespace-nowrap px-4 py-2 mono text-xs tracking-widest uppercase transition-all duration-200"
              style={{
                border: "1px solid",
                borderColor: i === 0 ? "var(--accent)" : "var(--border)",
                color: i === 0 ? "var(--accent)" : "var(--text-muted)",
                background: i === 0 ? "rgba(0,229,255,0.08)" : "transparent",
                flexShrink: 0,
              }}
            >
              {cat}
            </button>
          ))}
          <button
            className="whitespace-nowrap px-4 py-2 mono text-xs tracking-widest uppercase flex items-center gap-2"
            style={{ border: "1px solid var(--border)", color: "var(--text-muted)", flexShrink: 0 }}
          >
            <Filter size={12} /> Filters
          </button>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="mono text-xs" style={{ color: "var(--text-muted)" }}>Showing <span style={{ color: "var(--accent)" }}>12</span> of 2,400+ tools</span>
            <div className="pulse-dot" />
          </div>
          <select
            className="input-field text-xs"
            style={{ width: "auto", padding: "6px 12px" }}
          >
            <option>Sort: Trending</option>
            <option>Sort: Highest Rated</option>
            <option>Sort: Most Users</option>
            <option>Sort: Newest</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <div key={tool.name} className="card corner-tl corner-br relative overflow-hidden">
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${tool.color}, transparent)` }}
              />

              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center text-base font-black flex-shrink-0"
                    style={{
                      background: `${tool.color}15`,
                      border: `1px solid ${tool.color}30`,
                      color: tool.color,
                    }}
                  >
                    {tool.name[0]}
                  </div>
                  <div>
                    <h3 className="font-bold">{tool.name}</h3>
                    <span className="tag">{tool.category}</span>
                  </div>
                </div>
                <span
                  className="tag flex-shrink-0"
                  style={{ borderColor: `${tool.color}40`, color: tool.color, background: `${tool.color}10` }}
                >
                  {tool.badge}
                </span>
              </div>

              <p className="text-sm mb-5 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {tool.desc}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star size={12} fill="#FFB800" style={{ color: "#FFB800" }} />
                    <span className="mono text-xs">{tool.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp size={12} style={{ color: "var(--text-muted)" }} />
                    <span className="mono text-xs" style={{ color: "var(--text-muted)" }}>{tool.users}</span>
                  </div>
                  {tool.free && (
                    <span className="tag tag-accent">Free</span>
                  )}
                </div>
                <button
                  className="flex items-center gap-1 mono text-xs transition-colors duration-200"
                  style={{ color: "var(--accent)" }}
                >
                  Visit <ExternalLink size={10} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load more */}
        <div className="text-center mt-12">
          <button className="btn-outline flex items-center gap-2 mx-auto">
            <Zap size={14} />
            Load More Tools
          </button>
        </div>
      </section>
    </div>
  );
}
