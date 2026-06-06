"use client";

import { usePathname } from "next/navigation";

const PAGE_TITLES: Record<string, { title: string; sub: string }> = {
  "/admin": { title: "Dashboard", sub: "Overview & statistics" },
  "/admin/articles": { title: "Articles", sub: "Manage your content" },
  "/admin/tools": { title: "AI Tools", sub: "Manage the directory" },
};

export default function AdminHeader() {
  const pathname = usePathname();
  const page = PAGE_TITLES[pathname] ?? { title: "Admin", sub: "" };
  const now = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="admin-header">
      <div className="header-left">
        <h1 className="page-title">{page.title}</h1>
        {page.sub && <p className="page-sub">{page.sub}</p>}
      </div>
      <div className="header-right">
        <span className="header-date">{now}</span>
        <div className="status-pill">
          <span className="status-dot" />
          Live
        </div>
      </div>

      <style jsx>{`
        .admin-header {
          height: 64px;
          background: #080d10;
          border-bottom: 1px solid rgba(0, 229, 255, 0.08);
          padding: 0 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 30;
        }
        .header-left {
          display: flex;
          align-items: baseline;
          gap: 12px;
        }
        .page-title {
          font-family: "Syne", sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #e8f4f8;
          margin: 0;
        }
        .page-sub {
          font-family: "Space Mono", monospace;
          font-size: 10px;
          color: #3a5566;
          margin: 0;
          letter-spacing: 0.06em;
        }
        .header-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .header-date {
          font-family: "Space Mono", monospace;
          font-size: 10px;
          color: #3a5566;
          letter-spacing: 0.04em;
        }
        .status-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          background: rgba(0, 229, 255, 0.06);
          border: 1px solid rgba(0, 229, 255, 0.15);
          border-radius: 20px;
          font-family: "Space Mono", monospace;
          font-size: 10px;
          color: #00e5ff;
          letter-spacing: 0.08em;
        }
        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00e5ff;
          box-shadow: 0 0 6px #00e5ff;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </header>
  );
}
