"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Article } from "@/lib/types";

// ─── Helpers ────────────────────────────────────────────────────────────────

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function Toast({ msg, type, onClose }: { msg: string; type: "ok" | "err"; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3200);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        background: type === "ok" ? "rgba(0,255,153,0.12)" : "rgba(255,60,172,0.12)",
        border: `1px solid ${type === "ok" ? "#00ff9944" : "#ff3cac44"}`,
        borderRadius: "8px",
        padding: "12px 18px",
        fontFamily: '"Space Mono", monospace',
        fontSize: "12px",
        color: type === "ok" ? "#00ff99" : "#ff3cac",
        zIndex: 9999,
        maxWidth: "320px",
        backdropFilter: "blur(8px)",
      }}
    >
      {msg}
    </div>
  );
}

const EMPTY: Omit<Article, "id" | "created_at" | "updated_at"> = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "Analysis",
  status: "draft",
  read_time: "5 min",
  author: "Editorial Team",
};

const CATEGORIES = ["Analysis", "Research", "Tutorial", "News", "Opinion", "Interview"];

// ─── Modal ───────────────────────────────────────────────────────────────────

function ArticleModal({
  initial,
  onSave,
  onClose,
  saving,
}: {
  initial: Omit<Article, "id" | "created_at" | "updated_at">;
  onSave: (data: Omit<Article, "id" | "created_at" | "updated_at">) => void;
  onClose: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState(initial);

  function set(key: string, val: string) {
    setForm((f) => {
      const next = { ...f, [key]: val };
      if (key === "title" && !initial.slug) next.slug = slugify(val);
      return next;
    });
  }

  const inputStyle = {
    width: "100%",
    background: "#0a1218",
    border: "1px solid rgba(0,229,255,0.15)",
    borderRadius: "6px",
    padding: "9px 12px",
    color: "#e8f4f8",
    fontFamily: '"Syne", sans-serif',
    fontSize: "13px",
    outline: "none",
    boxSizing: "border-box" as const,
  };
  const labelStyle = {
    fontFamily: '"Space Mono", monospace',
    fontSize: "10px",
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "#3a5566",
    display: "block",
    marginBottom: "6px",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(5,10,14,0.85)",
        backdropFilter: "blur(6px)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#0C1318",
          border: "1px solid rgba(0,229,255,0.15)",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "620px",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "28px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ fontFamily: '"Syne", sans-serif', fontSize: "18px", fontWeight: 700, color: "#e8f4f8", margin: "0 0 24px" }}>
          {initial.title ? "Edit Article" : "New Article"}
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div style={{ gridColumn: "1/-1" }}>
            <label style={labelStyle}>Title</label>
            <input style={inputStyle} value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Article title…" />
          </div>
          <div style={{ gridColumn: "1/-1" }}>
            <label style={labelStyle}>Slug</label>
            <input style={inputStyle} value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="auto-generated-from-title" />
          </div>
          <div style={{ gridColumn: "1/-1" }}>
            <label style={labelStyle}>Excerpt</label>
            <textarea style={{ ...inputStyle, height: "70px", resize: "vertical" }} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} placeholder="Short description…" />
          </div>
          <div style={{ gridColumn: "1/-1" }}>
            <label style={labelStyle}>Content (Markdown)</label>
            <textarea style={{ ...inputStyle, height: "140px", resize: "vertical", fontFamily: '"Space Mono", monospace', fontSize: "12px" }} value={form.content} onChange={(e) => set("content", e.target.value)} placeholder="# Heading&#10;&#10;Write your article here…" />
          </div>
          <div>
            <label style={labelStyle}>Category</label>
            <select style={inputStyle} value={form.category} onChange={(e) => set("category", e.target.value)}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Status</label>
            <select style={inputStyle} value={form.status} onChange={(e) => set("status", e.target.value as Article["status"])}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Author</label>
            <input style={inputStyle} value={form.author} onChange={(e) => set("author", e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Read Time</label>
            <input style={inputStyle} value={form.read_time} onChange={(e) => set("read_time", e.target.value)} placeholder="5 min" />
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "24px", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: "9px 18px", background: "transparent", border: "1px solid rgba(0,229,255,0.15)", borderRadius: "6px", color: "#6b8a99", fontFamily: '"Syne", sans-serif', fontSize: "13px", cursor: "pointer" }}>
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            disabled={saving || !form.title}
            style={{ padding: "9px 20px", background: "rgba(0,229,255,0.12)", border: "1px solid rgba(0,229,255,0.4)", borderRadius: "6px", color: "#00e5ff", fontFamily: '"Syne", sans-serif', fontSize: "13px", fontWeight: 600, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.6 : 1 }}
          >
            {saving ? "Saving…" : "Save Article"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ArticlesPage() {
  const supabase = createClient();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const [modal, setModal] = useState<null | "create" | Article>(null);
  const [deleteTarget, setDeleteTarget] = useState<Article | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);

  const ok = (msg: string) => setToast({ msg, type: "ok" });
  const err = (msg: string) => setToast({ msg, type: "err" });

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) err(error.message);
    else setArticles(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = articles.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || a.status === filter;
    return matchSearch && matchFilter;
  });

  const counts = {
    all: articles.length,
    published: articles.filter((a) => a.status === "published").length,
    draft: articles.filter((a) => a.status === "draft").length,
  };

  async function handleSave(data: Omit<Article, "id" | "created_at" | "updated_at">) {
    setSaving(true);
    if (modal === "create") {
      const { error } = await supabase.from("articles").insert([data]);
      if (error) err(error.message);
      else { ok("Article created"); setModal(null); load(); }
    } else {
      const art = modal as Article;
      const { error } = await supabase.from("articles").update({ ...data, updated_at: new Date().toISOString() }).eq("id", art.id);
      if (error) err(error.message);
      else { ok("Article updated"); setModal(null); load(); }
    }
    setSaving(false);
  }

  async function toggleStatus(a: Article) {
    const next = a.status === "published" ? "draft" : "published";
    const { error } = await supabase.from("articles").update({ status: next, updated_at: new Date().toISOString() }).eq("id", a.id);
    if (error) err(error.message);
    else { ok(`Marked as ${next}`); load(); }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    const { error } = await supabase.from("articles").delete().eq("id", deleteTarget.id);
    if (error) err(error.message);
    else { ok("Article deleted"); setDeleteTarget(null); load(); }
  }

  const pill = (label: string, count: number, val: typeof filter) => (
    <button
      key={val}
      onClick={() => setFilter(val)}
      style={{
        padding: "6px 14px",
        borderRadius: "20px",
        border: `1px solid ${filter === val ? "rgba(0,229,255,0.4)" : "rgba(0,229,255,0.1)"}`,
        background: filter === val ? "rgba(0,229,255,0.1)" : "transparent",
        color: filter === val ? "#00e5ff" : "#6b8a99",
        fontFamily: '"Space Mono", monospace',
        fontSize: "11px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
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
          {pill("Published", counts.published, "published")}
          {pill("Drafts", counts.draft, "draft")}
        </div>
        <div style={{ display: "flex", gap: "10px", flex: 1, justifyContent: "flex-end" }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles…"
            style={{ background: "#0C1318", border: "1px solid rgba(0,229,255,0.12)", borderRadius: "6px", padding: "8px 14px", color: "#e8f4f8", fontFamily: '"Syne", sans-serif', fontSize: "13px", outline: "none", width: "220px" }}
          />
          <button
            onClick={() => setModal("create")}
            style={{ padding: "8px 18px", background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.35)", borderRadius: "6px", color: "#00e5ff", fontFamily: '"Syne", sans-serif', fontSize: "13px", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}
          >
            + New Article
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "#0C1318", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "10px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,229,255,0.08)" }}>
              {["Title", "Category", "Author", "Read Time", "Status", "Actions"].map((h) => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontFamily: '"Space Mono", monospace', fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#3a5566", fontWeight: 400 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ padding: "32px", textAlign: "center", fontFamily: '"Space Mono", monospace', fontSize: "11px", color: "#3a5566" }}>Loading…</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: "32px", textAlign: "center", fontFamily: '"Space Mono", monospace', fontSize: "11px", color: "#3a5566" }}>No articles found</td></tr>
            ) : filtered.map((a) => (
              <tr key={a.id} style={{ borderBottom: "1px solid rgba(0,229,255,0.04)" }}>
                <td style={{ padding: "14px 16px" }}>
                  <p style={{ fontFamily: '"Syne", sans-serif', fontSize: "13px", fontWeight: 600, color: "#b0cdd8", margin: "0 0 2px", maxWidth: "260px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.title}</p>
                  <p style={{ fontFamily: '"Space Mono", monospace', fontSize: "10px", color: "#3a5566", margin: 0 }}>{a.slug}</p>
                </td>
                <td style={{ padding: "14px 16px", fontFamily: '"Space Mono", monospace', fontSize: "11px", color: "#6b8a99" }}>{a.category}</td>
                <td style={{ padding: "14px 16px", fontFamily: '"Space Mono", monospace', fontSize: "11px", color: "#6b8a99" }}>{a.author}</td>
                <td style={{ padding: "14px 16px", fontFamily: '"Space Mono", monospace', fontSize: "11px", color: "#6b8a99" }}>{a.read_time}</td>
                <td style={{ padding: "14px 16px" }}>
                  <button
                    onClick={() => toggleStatus(a)}
                    style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: "9px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: a.status === "published" ? "#00ff99" : "#6b8a99",
                      background: a.status === "published" ? "rgba(0,255,153,0.1)" : "rgba(107,138,153,0.1)",
                      border: `1px solid ${a.status === "published" ? "#00ff9933" : "rgba(107,138,153,0.2)"}`,
                      borderRadius: "4px",
                      padding: "4px 10px",
                      cursor: "pointer",
                    }}
                  >
                    {a.status}
                  </button>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button onClick={() => setModal(a)} style={{ padding: "5px 10px", background: "transparent", border: "1px solid rgba(0,229,255,0.2)", borderRadius: "5px", color: "#00e5ff", fontSize: "11px", cursor: "pointer", fontFamily: '"Space Mono", monospace' }}>Edit</button>
                    <button onClick={() => setDeleteTarget(a)} style={{ padding: "5px 10px", background: "transparent", border: "1px solid rgba(255,60,172,0.2)", borderRadius: "5px", color: "#ff3cac", fontSize: "11px", cursor: "pointer", fontFamily: '"Space Mono", monospace' }}>Del</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create / Edit modal */}
      {modal !== null && (
        <ArticleModal
          initial={modal === "create" ? EMPTY : { title: (modal as Article).title, slug: (modal as Article).slug, excerpt: (modal as Article).excerpt, content: (modal as Article).content, category: (modal as Article).category, status: (modal as Article).status, read_time: (modal as Article).read_time, author: (modal as Article).author }}
          onSave={handleSave}
          onClose={() => setModal(null)}
          saving={saving}
        />
      )}

      {/* Delete confirm */}
      {deleteTarget && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(5,10,14,0.85)", backdropFilter: "blur(6px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}
          onClick={() => setDeleteTarget(null)}
        >
          <div style={{ background: "#0C1318", border: "1px solid rgba(255,60,172,0.2)", borderRadius: "10px", padding: "28px", maxWidth: "400px", width: "100%" }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontFamily: '"Syne", sans-serif', fontSize: "16px", fontWeight: 700, color: "#e8f4f8", margin: "0 0 10px" }}>Delete Article?</h3>
            <p style={{ fontFamily: '"Space Mono", monospace', fontSize: "11px", color: "#6b8a99", margin: "0 0 24px" }}>This will permanently delete "<strong style={{ color: "#e8f4f8" }}>{deleteTarget.title}</strong>". This action cannot be undone.</p>
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
