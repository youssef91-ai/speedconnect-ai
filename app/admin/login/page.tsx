// app/admin/login/page.tsx
//
// Next.js App Router requires any Client Component that calls useSearchParams()
// to be wrapped in a <Suspense> boundary — otherwise the build fails during
// static prerendering.
//
// Pattern used here:
//   page.tsx          → Server Component (no "use client")
//                       Renders <Suspense> wrapping <LoginForm>
//   <LoginForm>       → "use client" inner component
//                       Calls useSearchParams() safely inside the boundary

import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<LoginShell />}>
      <LoginForm />
    </Suspense>
  );
}

// Shown during SSR / before hydration — matches the card shell so there's
// no layout shift. No interactive elements needed at this stage.
function LoginShell() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#050A0E",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{
        width: "400px",
        height: "420px",
        background: "#0C1318",
        border: "1px solid rgba(0,229,255,0.1)",
        borderRadius: "12px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "2px",
          background: "linear-gradient(90deg, #00E5FF, #7B2FFF, transparent)",
        }} />
      </div>
    </div>
  );
}
