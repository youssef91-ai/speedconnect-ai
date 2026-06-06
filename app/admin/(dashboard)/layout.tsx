import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AuthProvider } from "@/context/AuthContext";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  return (
    <AuthProvider>
      <div style={{ display: "flex", minHeight: "100vh", background: "#050A0E" }}>
        <AdminSidebar />
        <div style={{ marginLeft: "240px", flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <AdminHeader />
          <main style={{ flex: 1, padding: "28px", overflowY: "auto" }}>
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
