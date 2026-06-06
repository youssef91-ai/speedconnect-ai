"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth/utils";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params.get("redirectTo") ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  useEffect(() => { setError(""); }, [email, password]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) { setError("Email and password are required."); return; }
    setLoading(true);
    setError("");
    try {
      await signIn(email, password);
      router.push(redirectTo);
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Sign-in failed.");
      setLoading(false);
    }
  }

  const inputStyle = (hasError: boolean, extraPadding?: string) => ({
    width: "100%",
    background: "#080D10",
    border: `1px solid ${hasError ? "rgba(255,60,172,0.4)" : "rgba(0,229,255,0.15)"}`,
    borderRadius: "7px",
    padding: extraPadding ?? "11px 14px",
    color: "#E8F4F8",
    fontFamily: '"Syne", sans-serif',
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box" as const,
    transition: "border-color 0.15s ease",
    opacity: loading ? 0.6 : 1,
  });

  return (
    <div style={{
      minHeight: "100vh",
      background: "#050A0E",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      fontFamily: '"Syne", sans-serif',
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
        pointerEvents: "none",
      }} />

      {/* Glow orbs */}
      <div style={{ position: "absolute", top: "15%", left: "10%", width: "380px", height: "380px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "15%", right: "10%", width: "320px", height: "320px", borderRadius: "50%", background: "radial-gradient(circle, rgba(123,47,255,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: "400px", position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "52px",
            height: "52px",
            background: "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(123,47,255,0.15))",
            border: "1px solid rgba(0,229,255,0.3)",
            clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
            marginBottom: "16px",
          }}>
            <span style={{ fontFamily: '"Space Mono", monospace', fontSize: "15px", fontWeight: 700, color: "#00E5FF", letterSpacing: "0.05em" }}>SC</span>
          </div>
          <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#E8F4F8", margin: "0 0 6px", letterSpacing: "0.01em" }}>
            SpeedConnect<span style={{ color: "#00E5FF" }}>.</span>AI
          </h1>
          <p style={{ fontFamily: '"Space Mono", monospace', fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#3A5566", margin: 0 }}>
            Admin Panel — Restricted Access
          </p>
        </div>

        {/* Card */}
        <div style={{ background: "#0C1318", border: "1px solid rgba(0,229,255,0.1)", borderRadius: "12px", padding: "32px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, #00E5FF, #7B2FFF, transparent)" }} />

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontFamily: '"Space Mono", monospace', fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#3A5566", marginBottom: "8px" }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                autoComplete="email"
                autoFocus
                disabled={loading}
                style={inputStyle(!!error)}
                onFocus={(e) => { if (!error) e.target.style.borderColor = "rgba(0,229,255,0.4)"; }}
                onBlur={(e) => { if (!error) e.target.style.borderColor = "rgba(0,229,255,0.15)"; }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontFamily: '"Space Mono", monospace', fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#3A5566", marginBottom: "8px" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  disabled={loading}
                  style={inputStyle(!!error, "11px 44px 11px 14px")}
                  onFocus={(e) => { if (!error) e.target.style.borderColor = "rgba(0,229,255,0.4)"; }}
                  onBlur={(e) => { if (!error) e.target.style.borderColor = "rgba(0,229,255,0.15)"; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  tabIndex={-1}
                  style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#3A5566", padding: "2px", display: "flex", alignItems: "center" }}
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? (
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{ marginBottom: "18px", padding: "10px 14px", background: "rgba(255,60,172,0.08)", border: "1px solid rgba(255,60,172,0.25)", borderRadius: "6px", fontFamily: '"Space Mono", monospace', fontSize: "11px", color: "#FF3CAC", lineHeight: 1.5 }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px",
                background: loading ? "rgba(0,229,255,0.05)" : "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(123,47,255,0.15))",
                border: "1px solid rgba(0,229,255,0.35)",
                borderRadius: "7px",
                color: loading ? "#3A5566" : "#00E5FF",
                fontFamily: '"Syne", sans-serif',
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.04em",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.15s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {loading ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ animation: "spin 0.8s linear infinite" }}>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
                  </svg>
                  Authenticating…
                </>
              ) : (
                "Sign In to Admin"
              )}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", fontFamily: '"Space Mono", monospace', fontSize: "10px", color: "#1E3040", marginTop: "20px", letterSpacing: "0.06em" }}>
          Authorised personnel only · SpeedConnect AI
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input:-webkit-autofill,
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px #080D10 inset !important;
          -webkit-text-fill-color: #E8F4F8 !important;
          caret-color: #E8F4F8;
        }
      `}</style>
    </div>
  );
}
