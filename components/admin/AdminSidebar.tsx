"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const NAV = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: "Articles",
    href: "/admin/articles",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path d="M4 6h16M4 10h16M4 14h10M4 18h7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "AI Tools",
    href: "/admin/tools",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.607L5 14.5m14.8.5l.399 2m-15.199-2L5 16.5m0 0l.4 2M12 12.75a.75.75 0 100-1.5.75.75 0 000 1.5z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  return (
    <aside className="admin-sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-mark">
          <span>SC</span>
        </div>
        <div className="logo-text">
          <span className="logo-name">SpeedConnect</span>
          <span className="logo-sub">Admin Panel</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        <span className="nav-section-label">Navigation</span>
        {NAV.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${active ? "active" : ""}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
              {active && <span className="nav-active-dot" />}
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="user-avatar">
            {user?.email?.[0]?.toUpperCase() ?? "A"}
          </div>
          <div className="user-info">
            <span className="user-email">{user?.email ?? "Admin"}</span>
            <span className="user-role">Administrator</span>
          </div>
        </div>
        <button onClick={signOut} className="logout-btn" title="Sign out">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <style jsx>{`
        .admin-sidebar {
          width: 240px;
          min-height: 100vh;
          background: #080d10;
          border-right: 1px solid rgba(0, 229, 255, 0.08);
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          z-index: 40;
        }
        .sidebar-logo {
          padding: 28px 20px 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid rgba(0, 229, 255, 0.06);
        }
        .logo-mark {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #00e5ff22, #7b2fff22);
          border: 1px solid rgba(0, 229, 255, 0.3);
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .logo-mark span {
          font-family: "Space Mono", monospace;
          font-size: 11px;
          font-weight: 700;
          color: #00e5ff;
          letter-spacing: 0.05em;
        }
        .logo-text {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .logo-name {
          font-family: "Syne", sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #e8f4f8;
          letter-spacing: 0.02em;
        }
        .logo-sub {
          font-family: "Space Mono", monospace;
          font-size: 9px;
          color: #00e5ff;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          opacity: 0.7;
        }
        .sidebar-nav {
          flex: 1;
          padding: 20px 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .nav-section-label {
          font-family: "Space Mono", monospace;
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #3a5566;
          padding: 0 8px 10px;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 6px;
          color: #6b8a99;
          text-decoration: none;
          font-family: "Syne", sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          transition: all 0.15s ease;
          position: relative;
        }
        .nav-item:hover {
          color: #e8f4f8;
          background: rgba(0, 229, 255, 0.05);
        }
        .nav-item.active {
          color: #00e5ff;
          background: rgba(0, 229, 255, 0.08);
        }
        .nav-icon {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        .nav-active-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #00e5ff;
          margin-left: auto;
          box-shadow: 0 0 6px #00e5ff;
        }
        .sidebar-footer {
          padding: 16px 12px;
          border-top: 1px solid rgba(0, 229, 255, 0.06);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .sidebar-user {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }
        .user-avatar {
          width: 30px;
          height: 30px;
          background: linear-gradient(135deg, #00e5ff33, #7b2fff33);
          border: 1px solid rgba(0, 229, 255, 0.25);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Space Mono", monospace;
          font-size: 12px;
          font-weight: 700;
          color: #00e5ff;
          flex-shrink: 0;
        }
        .user-info {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .user-email {
          font-family: "Syne", sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: #b0cdd8;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .user-role {
          font-family: "Space Mono", monospace;
          font-size: 9px;
          color: #3a5566;
          letter-spacing: 0.08em;
        }
        .logout-btn {
          width: 30px;
          height: 30px;
          border-radius: 6px;
          border: 1px solid rgba(255, 60, 172, 0.2);
          background: transparent;
          color: #6b8a99;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s ease;
          flex-shrink: 0;
        }
        .logout-btn:hover {
          color: #ff3cac;
          border-color: rgba(255, 60, 172, 0.5);
          background: rgba(255, 60, 172, 0.08);
        }
      `}</style>
    </aside>
  );
}
