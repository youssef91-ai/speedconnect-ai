// app/admin/layout.tsx
//
// Root layout for all /admin/* routes.
// Intentionally minimal — it does NOT enforce auth here.
// Auth is enforced per-segment:
//   - /admin/login      → public (no guard)
//   - /admin/(dashboard)/* → guarded inside (dashboard)/layout.tsx
//
// This layout exists so that app/admin/login/page.tsx has a valid
// ancestor layout and renders correctly in the App Router.

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
