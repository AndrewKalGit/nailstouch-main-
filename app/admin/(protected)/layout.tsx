import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"
import { AdminSidebar } from "@/components/admin/sidebar"

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/admin/login")
  }

  const cookieStore = await cookies()
  const adminVerified = cookieStore.get("admin_verified")?.value

  if (adminVerified !== "true") {
    redirect("/admin/login?step=pin")
  }

  // Verify user is in admin_users table
  const { data: adminUser } = await supabase
    .from("admin_users")
    .select("id")
    .eq("email", user.email)
    .eq("is_active", true)
    .single()

  if (!adminUser) {
    redirect("/admin/login?error=unauthorized")
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  )
}
