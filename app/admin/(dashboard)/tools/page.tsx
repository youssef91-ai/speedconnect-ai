"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { AiTool } from "@/lib/types";

function Toast({ msg, type, onClose }: { msg: string; type: "ok" | "err"; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3200);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", background: type === "ok" ? "rgba(0,255,153,0.12)" : "rgba(255,60,172,0.12)", border: `1px solid ${type === "ok" ? "#00ff9944" : "#ff3cac44"}`, borderRadius: "8px", padding: "12px 18px", fontFamily: '"Space Mono", monospace', fontSize: "12px", color: type === "ok" ? "#00ff99" : "#ff3cac", zIndex: 9999, maxWidth: "320px", backdropFilter: "blur(8px)" }}>
      {msg}
    </div>
  );
}

const ACCENT_PRESETS = ["#00E5FF", "#FF3CAC", "#7B2FFF", "#00FF99", "#FFB800", "#FF6B35", "#00D4AA"];
const TOOL_CATEGORIES = ["Writing", "Image", "Code", "Analytics", "Automation", "Video", "Audio", "Research", "Productivity", "Other"];
const BADGES = ["New", "Hot", "Popular", "Beta", "Pro", "Free", "Trending"];
const STATUS_CYCLE: AiTool["status"][] = ["pending", "active", "archived"];

const EMPTY: Omit<AiTool, "id" | "created_at" | "updated_at"> = {
  name: "",
  category: "Writing",
  description: "",
  url: "",
  rating: 4.5,
  badge: "New",
  color: "#00E5FF",
  is_free: true,
  user_count: "10K+",
  status: "pending",
};

function ToolModal({ initial, onSave, onClose, saving }: {
  initial: Omit<AiTool, "id" | "created_at" | "updated_at">;
  onSave: (d: Omit<AiTool, "id" | "created_at" | "updated_at">) => void;
  onClose: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState(initial);
  const set = (key: string, val: unknown) => setForm((f) => ({ ...f, [key]: val }));

  const inputStyle = { width: "100%", background: "#0a1218", border: "1px solid rgba(0,229,255,0.15)", borderRadius: "6px", padding: "9px 12px", color: "#e8f4f8", fontFamily: '"Syne", sans-serif', fontSize: "13px", outline: "none", boxSizing: "border-box" as const };
  const labelStyle = { fontFamily: '"Space Mono", monospace', fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#3a5566", display: "block", marginBottom: "6px" };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(5,10,14,0.85)", backdropFilter: "blur(6px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }} onClick={onClose}>
      <div style={{ background: "#0C1318", border: "1px solid rgba(0,229,255,0.15)", borderRadius: "12px", width: "100%", maxWidth: "640px", maxHeight: "90vh", overflowY: "auto", padding: "28px" }} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ fontFamily: '"Syne", sans-serif', fontSize: "18px", fontWeight: 700, color: "#e8f4f8", margin: "0 0 24px" }}>
          {initial.name ? "Edit Tool" : "New AI Tool"}
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={labelStyle}>Name</label>
            <input style={inputStyle} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Tool name…" />
          </div>
          <div>
            <label style={labelStyle}>Category</label>
            <select style={inputStyle} value={form.category} onChange={(e) => set("category", e.target.value)}>
              {TOOL_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ gridColumn: "1/-1" }}>
            <label style={labelStyle}>Description</label>
            <textarea style={{ ...inputStyle, height: "80px", resize: "vertical" }} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Short description…" />
          </div>
          <div style={{ gridColumn: "1/-1" }}>
            <label style={labelStyle}>URL</label>
            <input style={inputStyle} value={form.url} onChange={(e) => set("url", e.target.value)} placeholder="https://…" />
          </div>
          <div>
            <label style={labelStyle}>Badge</label>
            <select style={inputStyle} value={form.badge} onChange={(e) => set("badge", e.target.value)}>
              {BADGES.map((b) => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Rating (0–5)</label>
            <input style={inputStyle} type="number" min="0" max="5" step="0.1" value={form.rating} onChange={(e) => set("rating", parseFloat(e.target.value))} />
          </div>
          <div>
            <label style={labelStyle}>User Count</label>
            <input style={inputStyle} value={form.user_count} onChange={(e) => set("user_count", e.target.value)} placeholder="10K+" />
          </div>
          <div>
            <label style={labelStyle}>Status</label>
            <select style={inputStyle} value={form.status} onChange={(e) => set("status", e.target.value as AiTool["status"])}>
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div style={{ gridColumn: "1/-1" }}>
            <label style={labelStyle}>Accent Color</label>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
              {ACCENT_PRESETS.map((c) => (
                <button key={c} onClick={() => set("color", c)} style={{ width: "26px", height: "26px", borderRadius: "50%", background: c, border: form.color === c ? "2px solid #fff" : "2px solid transparent", cursor: "pointer", flexShrink: 0, boxShadow: form.color === c ? `0 0 8px ${c}` : "none" }} />
              ))}
              <input type="color" value={form.color} onChange={(e) => set("color", e.target.value)} style={{ width: "36px", height: "26px", borderRadius: "4px", border: "1px solid rgba(0,229,255,0.2)", background: "transparent", cursor: "pointer" }} />
              <span style={{ fontFamily: '"Space Mono", monospace', fontSize: "11px", color: "#6b8a99" }}>{form.color}</span>
            </div>
          </div>
          <div>
            <label style={labelStyle}>Free Tier</label>
            <button
              onClick={() => set("is_free", !form.is_free)}
              style={{ padding: "8px 16px", background: form.is_free ? "rgba(0,255,153,0.1)" : "rgba(107,138,153,0.1)", border: `1px solid ${form.is_free ? "#00ff9933" : "rgba(107,138,153,0.2)"}`, borderRadius: "6px", color: form.is_free ? "#00ff99" : "#6b8a99", fontFamily: '"Space Mono", monospace', fontSize: "11px", cursor: "pointer" }}
            >
              {form.is_free ? "✓ Free tier" : "✗ Paid only"}
            </button>
          </div>
        </div>

        {/* Preview chip */}
        <div style={{ marginTop: "20px", padding: "14px", background: "#0a1218", borderRadius: "8px", border: `1px solid ${form.color}22` }}>
          <p style={{ fontFamily: '"Space Mono", monospace', fontSize: "9px", color: "#3a5566", margin: "0 0 8px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Preview</p>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: `${form.color}22`, border: `1px solid ${form.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: '"Syne", sans-serif', fontSize: "16px", fontWeight: 700, color: form.color }}>
              {form.name?.[0]?.toUpperCase() || "?"}
            </div>
            <div>
              <p style={{ fontFamily: '"Syne", sans-serif', fontSize: "13px", fontWeight: 700, color: "#e8f4f8", margin: "0 0 2px" }}>{form.name || "Tool Name"}</p>
              <p style={{ fontFamily: '"Space Mono", monospace', fontSize: "10px", color: "#6b8a99", margin: 0 }}>{form.category} · {form.badge}</p>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "24px", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: "9px 18px", background: "transparent", border: "1px solid rgba(0,229,255,0.15)", borderRadius: "6px", color: "#6b8a99", fontFamily: '"Syne", sans-serif', fontSize: "13px", cursor: "pointer" }}>Cancel</button>
          <button onClick={() => onSave(form)} disabled={saving || !form.name} style={{ padding: "9px 20px", background: "rgba(0,229,255,0.12)", border: "1px solid rgba(0,229,255,0.4)", borderRadius: "6px", color: "#00e5ff", fontFamily: '"Syne", sans-serif', fontSize: "13px", fontWeight: 600, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.6 : 1 }}>
            {saving ? "Saving…" : "Save Tool"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ToolsPage() {
  const supabase = createClient();
  const [tools, setTools] = useState<AiTool[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | AiTool["status"]>("all");
  const [modal, setModal] = useState<null | "create" | AiTool>(null);
  const [deleteTarget, setDeleteTarget] = useState<AiTool | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);

  const ok = (msg: string) => setToast({ msg, type: "ok" });
  const err = (msg: string) => setToast({ msg, type: "err" });

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from("ai_tools").select("*").order("created_at", { ascending: false });
    if (error) err(error.message);
    else setTools(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = tools.filter((t) => {
    const ms = t.name.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase());
    const mf = filter === "all" || t.status === filter;
    return ms && mf;
  });

  const counts = {
    all: tools.length,
    active: tools.filter((t) => t.status === "active").length,
    pending: tools.filter((t) => t.status === "pending").length,
    archived: tools.filter((t) => t.status === "archived").length,
  };

  async function handleSave(data: Omit<AiTool, "id" | "created_at" | "updated_at">) {
    setSaving(true);
    if (modal === "create") {
      const { error } = await supabase.from("ai_tools").insert([data]);
      if (error) err(error.message);
      else { ok("Tool created"); setModal(null); load(); }
    } else {
      const tool = modal as AiTool;
      const { error } = await supabase.from("ai_tools").update({ ...data, updated_at: new Date().toISOString() }).eq("id", tool.id);
      if (error) err(error.message);
      else { ok("Tool updated"); setModal(null); load(); }
    }
    setSaving(false);
  }

  async function cycleStatus(t: AiTool) {
    const idx = STATUS_CYCLE.indexOf(t.status);
    const next = STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
    const { error } = await supabase.from("ai_tools").update({ status: next, updated_at: new Date().toISOString() }).eq("id", t.id);
    if (error) err(error.message);
    else { ok(`Status → ${next}`); load(); }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    const { error } = await supabase.from("ai_tools").delete().eq("id", deleteTarget.id);
    if (error) err(error.message);
    else { ok("Tool deleted"); setDeleteTarget(null); load(); }
  }

  const statusColor = (s: AiTool["status"]) =>
    s === "active" ? "#00ff99" : s === "pending" ? "#ffb800" : "#6b8a99";

  const pill = (label: string, count: number, val: typeof filter) => (
    <button key={val} onClick={() => setFilter(val)} style={{ padding: "6px 14px", borderRadius: "20px", border: `1px solid ${filter === val ? "rgba(0,229,255,0.4)" : "rgba(0,229,255,0.1)"}`, background: filter === val ? "rgba(0,229,255,0.1)" : "transparent", color: filter === val ? "#00e5ff" : "#6b8a99", fontFamily: '"Space Mono", monospace', fontSize: "11px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
      {label}
      <span style={{ background: "rgba(0,229,255,0.15)", borderRadius: "10px", padding: "1px 6px", fontSize: "9px" }}>{count}</span>
    </button>
  );

  return (
    <div style={{ maxWidth: "1100px" }}>
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", gap: "16px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {pill("All", counts.all, "all")}
          {pill("Active", counts.active, "active")}
          {pill("Pending", counts.pending, "pending")}
          {pill("Archived", counts.archived, "archived")}
        </div>
        <div style={{ display: "flex", gap: "10px", flex: 1, justifyContent: "flex-end" }}>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tools…" style={{ background: "#0C1318", border: "1px solid rgba(0,229,255,0.12)", borderRadius: "6px", padding: "8px 14px", color: "#e8f4f8", fontFamily: '"Syne", sans-serif', fontSize: "13px", outline: "none", width: "220px" }} />
          <button onClick={() => setModal("create")} style={{ padding: "8px 18px", background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.35)", borderRadius: "6px", color: "#00e5ff", fontFamily: '"Syne", sans-serif', fontSize: "13px", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
            + New Tool
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "#0C1318", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "10px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,229,255,0.08)" }}>
              {["Tool", "Category", "Badge", "Rating", "Free", "Status", "Actions"].map((h) => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontFamily: '"Space Mono", monospace', fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#3a5566", fontWeight: 400 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={{ padding: "32px", textAlign: "center", fontFamily: '"Space Mono", monospace', fontSize: "11px", color: "#3a5566" }}>Loading…</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={7} style={{ padding: "32px", textAlign: "center", fontFamily: '"Space Mono", monospace', fontSize: "11px", color: "#3a5566" }}>No tools found</td></tr>
            ) : filtered.map((t) => (
              <tr key={t.id} style={{ borderBottom: "1px solid rgba(0,229,255,0.04)" }}>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "7px", background: `${t.color}20`, border: `1px solid ${t.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: '"Syne", sans-serif', fontSize: "13px", fontWeight: 700, color: t.color, flexShrink: 0 }}>
                      {t.name[0]?.toUpperCase()}
                    </div>
                    <div>
                      <p style={{ fontFamily: '"Syne", sans-serif', fontSize: "13px", fontWeight: 600, color: "#b0cdd8", margin: "0 0 1px", maxWidth: "180px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.name}</p>
                      {t.url && (
                        <a href={t.url} target="_blank" rel="noreferrer" style={{ fontFamily: '"Space Mono", monospace', fontSize: "10px", color: "#3a5566", textDecoration: "none" }}>
                          ↗ link
                        </a>
                      )}
                    </div>
                  </div>
                </td>
                <td style={{ padding: "12px 16px", fontFamily: '"Space Mono", monospace', fontSize: "11px", color: "#6b8a99" }}>{t.category}</td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ fontFamily: '"Space Mono", monospace', fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase", color: t.color, background: `${t.color}15`, border: `1px solid ${t.color}30`, borderRadius: "4px", padding: "3px 8px" }}>{t.badge}</span>
                </td>
                <td style={{ padding: "12px 16px", fontFamily: '"Space Mono", monospace', fontSize: "11px", color: "#ffb800" }}>★ {t.rating}</td>
                <td style={{ padding: "12px 16px", fontFamily: '"Space Mono", monospace', fontSize: "11px", color: t.is_free ? "#00ff99" : "#6b8a99" }}>{t.is_free ? "Free" : "Paid"}</td>
                <td style={{ padding: "12px 16px" }}>
                  <button onClick={() => cycleStatus(t)} style={{ fontFamily: '"Space Mono", monospace', fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: statusColor(t.status), background: `${statusColor(t.status)}15`, border: `1px solid ${statusColor(t.status)}33`, borderRadius: "4px", padding: "4px 10px", cursor: "pointer" }}>
                    {t.status}
                  </button>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button onClick={() => setModal(t)} style={{ padding: "5px 10px", background: "transparent", border: "1px solid rgba(0,229,255,0.2)", borderRadius: "5px", color: "#00e5ff", fontSize: "11px", cursor: "pointer", fontFamily: '"Space Mono", monospace' }}>Edit</button>
                    <button onClick={() => setDeleteTarget(t)} style={{ padding: "5px 10px", background: "transparent", border: "1px solid rgba(255,60,172,0.2)", borderRadius: "5px", color: "#ff3cac", fontSize: "11px", cursor: "pointer", fontFamily: '"Space Mono", monospace' }}>Del</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal !== null && (
        <ToolModal
          initial={modal === "create" ? EMPTY : { name: (modal as AiTool).name, category: (modal as AiTool).category, description: (modal as AiTool).description, url: (modal as AiTool).url, rating: (modal as AiTool).rating, badge: (modal as AiTool).badge, color: (modal as AiTool).color, is_free: (modal as AiTool).is_free, user_count: (modal as AiTool).user_count, status: (modal as AiTool).status }}
          onSave={handleSave}
          onClose={() => setModal(null)}
          saving={saving}
        />
      )}

      {deleteTarget && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(5,10,14,0.85)", backdropFilter: "blur(6px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setDeleteTarget(null)}>
          <div style={{ background: "#0C1318", border: "1px solid rgba(255,60,172,0.2)", borderRadius: "10px", padding: "28px", maxWidth: "400px", width: "100%" }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontFamily: '"Syne", sans-serif', fontSize: "16px", fontWeight: 700, color: "#e8f4f8", margin: "0 0 10px" }}>Delete Tool?</h3>
            <p style={{ fontFamily: '"Space Mono", monospace', fontSize: "11px", color: "#6b8a99", margin: "0 0 24px" }}>This will permanently delete "<strong style={{ color: "#e8f4f8" }}>{deleteTarget.name}</strong>". This cannot be undone.</p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button onClick={() => setDeleteTarget(null)} style={{ padding: "8px 16px", background: "transparent", border: "1px solid rgba(0,229,255,0.15)", borderRadius: "6px", color: "#6b8a99", fontFamily: '"Syne", sans-serif', fontSize: "13px", cursor: "pointer" }}>Cancel</button>
              <button onClick={handleDelete} style={{ padding: "8px 16px", background: "rgba(255,60,172,0.12)", border: "1px solid rgba(255,60,172,0.4)", borderRadius: "6px", color: "#ff3cac", fontFamily: '"Syne", sans-serif', fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
