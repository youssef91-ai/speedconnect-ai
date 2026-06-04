import type { Metadata } from "next";
import { Zap, Brain, Globe, Shield, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About SpeedConnect AI",
  description: "Learn about SpeedConnect AI — the mission, the team, and the vision behind the leading AI tools directory.",
};

const team = [
  { name: "Alex Chen", role: "Founder & CEO", bio: "Former ML engineer at DeepMind. Obsessed with making AI accessible to everyone.", initials: "AC", color: "#00E5FF" },
  { name: "Maya Torres", role: "Head of Curation", bio: "Ex-Google product lead. Tested 800+ AI tools and knows what separates signal from noise.", initials: "MT", color: "#FF3CAC" },
  { name: "Jordan Kim", role: "Lead Engineer", bio: "Full-stack developer and open-source contributor. Built the indexing engine from scratch.", initials: "JK", color: "#7B2FFF" },
  { name: "Sam Okafor", role: "Research & Content", bio: "Former AI researcher turned journalist. Writes the deep dives you actually want to read.", initials: "SO", color: "#00FF87" },
];

const values = [
  { icon: Shield, title: "Radical Honesty", desc: "We don't accept paid placements or sponsored rankings. Every score is earned through real evaluation." },
  { icon: Zap, title: "Speed First", desc: "The AI space moves at light speed. We update our directory daily and publish analysis within hours of major releases." },
  { icon: Brain, title: "Depth Over Breadth", desc: "We'd rather give you 10 truly useful tools than 10,000 mediocre listings. Quality is the filter." },
  { icon: Globe, title: "Open Access", desc: "The core directory is free, forever. We believe everyone deserves access to AI intelligence, not just those who can afford it." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="section-label mb-3">About Us</div>
        <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight">
          We built the resource<br />
          <span style={{ color: "var(--accent)" }}>we wished existed.</span>
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
            SpeedConnect AI started as a personal spreadsheet in 2023. Alex Chen, tired of spending hours researching AI tools for different tasks, began cataloging them with honest notes, benchmarks, and real ratings.
          </p>
          <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
            That spreadsheet became a shared doc, then a website, then a platform trusted by 150,000+ professionals every month. The mission hasn't changed: cut through the noise so you can move faster.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: "var(--border)" }}>
            {[
              { value: "2,400+", label: "Tools Indexed", icon: Brain },
              { value: "150K+", label: "Monthly Users", icon: Users },
              { value: "Daily", label: "Update Frequency", icon: TrendingUp },
              { value: "100%", label: "Independent", icon: Shield },
            ].map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex flex-col items-center gap-2 py-10 px-6" style={{ background: "var(--surface)" }}>
                <Icon size={20} style={{ color: "var(--accent)" }} />
                <div className="text-3xl font-black">{value}</div>
                <div className="mono text-xs text-center" style={{ color: "var(--text-muted)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-label mb-3">Our Mission</div>
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
              Democratize access to<br />
              <span className="gradient-text">AI intelligence</span>
            </h2>
            <p className="leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
              The AI revolution is happening whether you're ready or not. The difference between those who thrive and those who fall behind often comes down to one thing: knowing which tools to use.
            </p>
            <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>
              SpeedConnect AI exists to level that playing field. We do the research, run the benchmarks, and surface what actually works — so you can focus on what matters: building, creating, and growing.
            </p>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 gap-4">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex gap-4 p-5"
                style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.2)" }}
                >
                  <Icon size={16} style={{ color: "var(--accent)" }} />
                </div>
                <div>
                  <div className="font-bold mb-1">{title}</div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24" style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-label mb-3">The Team</div>
          <h2 className="text-3xl md:text-4xl font-black mb-12">
            Small team. <span style={{ color: "var(--accent)" }}>Big impact.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="card relative overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${member.color}, transparent)` }}
                />
                <div
                  className="w-16 h-16 flex items-center justify-center text-xl font-black mb-5"
                  style={{
                    background: `${member.color}15`,
                    border: `1px solid ${member.color}30`,
                    color: member.color,
                  }}
                >
                  {member.initials}
                </div>
                <div className="font-bold text-lg mb-1">{member.name}</div>
                <div className="mono text-xs mb-4" style={{ color: member.color }}>{member.role}</div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div
          className="text-center p-12 relative overflow-hidden"
          style={{ border: "1px solid rgba(0,229,255,0.3)", background: "var(--surface)" }}
        >
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }} />
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Want to collaborate?
          </h2>
          <p className="mb-8 max-w-lg mx-auto" style={{ color: "var(--text-muted)" }}>
            We're always open to partnerships, tool submissions, and conversations with people building cool things in the AI space.
          </p>
          <Link href="/contact">
            <button className="btn-primary">Get in Touch</button>
          </Link>
        </div>
      </section>
    </div>
  );
}
