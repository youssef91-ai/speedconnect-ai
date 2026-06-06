import { createClient } from "@/lib/supabase/server";
import type { DashboardStats } from "@/lib/types";

async function getStats(): Promise<DashboardStats> {
  const supabase = await createClient();

  const [
    { count: totalArticles },
    { count: publishedArticles },
    { count: draftArticles },
    { count: totalTools },
    { count: activeTools },
    { count: pendingTools },
  ] = await Promise.all([
    supabase.from("articles").select("*", { count: "exact", head: true }),
    supabase.from("articles").select("*", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("articles").select("*", { count: "exact", head: true }).eq("status", "draft"),
    supabase.from("ai_tools").select("*", { count: "exact", head: true }),
    supabase.from("ai_tools").select("*", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("ai_tools").select("*", { count: "exact", head: true }).eq("status", "pending"),
  ]);

  return {
    totalArticles: totalArticles ?? 0,
    publishedArticles: publishedArticles ?? 0,
    draftArticles: draftArticles ?? 0,
    totalTools: totalTools ?? 0,
    activeTools: activeTools ?? 0,
    pendingTools: pendingTools ?? 0,
  };
}

async function getRecentArticles() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select("id, title, status, category, created_at")
    .order("created_at", { ascending: false })
    .limit(5);
  return data ?? [];
}

async function getRecentTools() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("ai_tools")
    .select("id, name, status, category, created_at")
    .order("created_at", { ascending: false })
    .limit(5);
  return data ?? [];
}

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: number;
  sub: string;
  accent: string;
}) {
  return (
    <div
      style={{
        background: "#0C1318",
        border: `1px solid ${accent}22`,
        borderRadius: "10px",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, ${accent}, transparent)`,
        }}
      />
      <p
        style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: "10px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#3a5566",
          margin: "0 0 12px",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: '"Syne", sans-serif',
          fontSize: "42px",
          fontWeight: 800,
          color: accent,
          margin: "0 0 4px",
          lineHeight: 1,
        }}
      >
        {value}
      </p>
      <p
        style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: "11px",
          color: "#6b8a99",
          margin: 0,
        }}
      >
        {sub}
      </p>
    </div>
  );
}

export default async function DashboardPage() {
  const [stats, recentArticles, recentTools] = await Promise.all([
    getStats(),
    getRecentArticles(),
    getRecentTools(),
  ]);

  const statCards = [
    { label: "Total Articles", value: stats.totalArticles, sub: `${stats.publishedArticles} published · ${stats.draftArticles} drafts`, accent: "#00E5FF" },
    { label: "Published", value: stats.publishedArticles, sub: "Live on the site", accent: "#00ff99" },
    { label: "Total AI Tools", value: stats.totalTools, sub: `${stats.activeTools} active · ${stats.pendingTools} pending`, accent: "#7B2FFF" },
    { label: "Active Tools", value: stats.activeTools, sub: "Visible in directory", accent: "#FF3CAC" },
  ];

  return (
    <div style={{ maxWidth: "1100px" }}>
      {/* Stats grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        {statCards.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Recent activity */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {/* Recent Articles */}
        <RecentTable
          title="Recent Articles"
          href="/admin/articles"
          rows={recentArticles.map((a) => ({
            id: a.id,
            primary: a.title,
            secondary: a.category,
            status: a.status,
            accent: a.status === "published" ? "#00ff99" : "#6b8a99",
            date: a.created_at,
          }))}
        />
        {/* Recent Tools */}
        <RecentTable
          title="Recent AI Tools"
          href="/admin/tools"
          rows={recentTools.map((t) => ({
            id: t.id,
            primary: t.name,
            secondary: t.category,
            status: t.status,
            accent:
              t.status === "active"
                ? "#00ff99"
                : t.status === "pending"
                ? "#ffb800"
                : "#6b8a99",
            date: t.created_at,
          }))}
        />
      </div>
    </div>
  );
}

function RecentTable({
  title,
  href,
  rows,
}: {
  title: string;
  href: string;
  rows: {
    id: string;
    primary: string;
    secondary: string;
    status: string;
    accent: string;
    date: string;
  }[];
}) {
  return (
    <div
      style={{
        background: "#0C1318",
        border: "1px solid rgba(0,229,255,0.08)",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid rgba(0,229,255,0.06)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: '"Syne", sans-serif',
            fontSize: "14px",
            fontWeight: 700,
            color: "#e8f4f8",
          }}
        >
          {title}
        </span>
        <a
          href={href}
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: "10px",
            color: "#00e5ff",
            textDecoration: "none",
            letterSpacing: "0.08em",
          }}
        >
          View all →
        </a>
      </div>
      <div>
        {rows.length === 0 ? (
          <p
            style={{
              padding: "20px",
              fontFamily: '"Space Mono", monospace',
              fontSize: "11px",
              color: "#3a5566",
              textAlign: "center",
              margin: 0,
            }}
          >
            No entries yet
          </p>
        ) : (
          rows.map((row) => (
            <div
              key={row.id}
              style={{
                padding: "12px 20px",
                borderBottom: "1px solid rgba(0,229,255,0.04)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >
              <div style={{ minWidth: 0 }}>
                <p
                  style={{
                    fontFamily: '"Syne", sans-serif',
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#b0cdd8",
                    margin: "0 0 2px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {row.primary}
                </p>
                <p
                  style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: "10px",
                    color: "#3a5566",
                    margin: 0,
                  }}
                >
                  {row.secondary}
                </p>
              </div>
              <span
                style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: "9px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: row.accent,
                  background: `${row.accent}18`,
                  border: `1px solid ${row.accent}33`,
                  borderRadius: "4px",
                  padding: "3px 8px",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {row.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
