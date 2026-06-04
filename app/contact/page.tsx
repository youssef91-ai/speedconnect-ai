import type { Metadata } from "next";
import { Mail, MessageSquare, Send, Globe, AtSign, Code } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact SpeedConnect AI",
  description: "Get in touch with the SpeedConnect AI team. Submit a tool, report an error, or partner with us.",
};

const reasons = [
  { icon: Send, title: "Submit a Tool", desc: "Know an AI tool we haven't listed? Submit it for review and get it in front of 150K+ users." },
  { icon: MessageSquare, title: "Report an Error", desc: "Found outdated info or a broken link? Help us keep the directory accurate." },
  { icon: Globe, title: "Partnership", desc: "Interested in integration, sponsorship, or media opportunities? Let's talk." },
  { icon: Mail, title: "General Inquiry", desc: "Anything else on your mind? Our team responds to every message within 24 hours." },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24">
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="section-label mb-3">Contact</div>
        <h1 className="text-4xl md:text-6xl font-black mb-6">
          Let's <span style={{ color: "var(--accent)" }}>Connect</span>
        </h1>
        <p className="text-lg max-w-xl" style={{ color: "var(--text-muted)" }}>
          We respond to every message. Whether you're submitting a tool, reporting a bug, or just saying hi — we want to hear from you.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div
            className="relative p-8 overflow-hidden"
            style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
          >
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent-3))" }} />

            <h2 className="text-xl font-black mb-6">Send a Message</h2>

            <div className="flex flex-col gap-4">
              <div>
                <label className="mono text-xs tracking-widest uppercase mb-2 block" style={{ color: "var(--text-muted)" }}>
                  Your Name
                </label>
                <input type="text" placeholder="Jane Smith" className="input-field" />
              </div>

              <div>
                <label className="mono text-xs tracking-widest uppercase mb-2 block" style={{ color: "var(--text-muted)" }}>
                  Email Address
                </label>
                <input type="email" placeholder="jane@company.com" className="input-field" />
              </div>

              <div>
                <label className="mono text-xs tracking-widest uppercase mb-2 block" style={{ color: "var(--text-muted)" }}>
                  Reason
                </label>
                <select className="input-field">
                  <option value="">Select a reason...</option>
                  <option>Submit a Tool</option>
                  <option>Report an Error</option>
                  <option>Partnership Inquiry</option>
                  <option>General Question</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="mono text-xs tracking-widest uppercase mb-2 block" style={{ color: "var(--text-muted)" }}>
                  Message
                </label>
                <textarea
                  className="input-field"
                  rows={5}
                  placeholder="Tell us what's on your mind..."
                  style={{ resize: "none" }}
                />
              </div>

              <button className="btn-primary flex items-center justify-center gap-2 mt-2">
                <Send size={14} />
                Send Message
              </button>

              <p className="mono text-xs text-center" style={{ color: "var(--text-muted)" }}>
                We respond within 24 hours. No spam, ever.
              </p>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6">
            {/* Reason cards */}
            <div className="grid grid-cols-1 gap-3">
              {reasons.map(({ icon: Icon, title, desc }) => (
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

            {/* Direct contact */}
            <div
              className="p-6 relative overflow-hidden"
              style={{ border: "1px solid rgba(0,229,255,0.3)", background: "var(--surface)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, var(--accent), transparent)" }} />
              <div className="mono text-xs mb-4" style={{ color: "var(--accent)" }}>// direct_contact</div>
              <div className="flex flex-col gap-4">
                <a href="mailto:hello@speedconnect.ai" className="flex items-center gap-3 group">
                  <Mail size={16} style={{ color: "var(--accent)" }} />
                  <span className="text-sm group-hover:underline" style={{ color: "var(--text-muted)" }}>
                    hello@speedconnect.ai
                  </span>
                </a>
                <a href="#" className="flex items-center gap-3 group">
                  <AtSign size={16} style={{ color: "var(--accent)" }} />
                  <span className="text-sm group-hover:underline" style={{ color: "var(--text-muted)" }}>
                    @speedconnectai
                  </span>
                </a>
                <a href="#" className="flex items-center gap-3 group">
                  <Code size={16} style={{ color: "var(--accent)" }} />
                  <span className="text-sm group-hover:underline" style={{ color: "var(--text-muted)" }}>
                    github.com/speedconnect-ai
                  </span>
                </a>
              </div>
            </div>

            {/* Response time */}
            <div
              className="p-6 flex items-center gap-4"
              style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
            >
              <div className="pulse-dot" style={{ flexShrink: 0 }} />
              <div>
                <div className="font-bold mb-1">Response Time</div>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Average response: <span style={{ color: "var(--accent)" }}>under 4 hours</span> during business hours. We read everything.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
