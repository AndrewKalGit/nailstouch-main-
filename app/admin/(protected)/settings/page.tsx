import { createClient } from "@/lib/supabase/server"
import { SettingsForm } from "@/components/admin/settings-form"

export default async function SettingsPage() {
  const supabase = await createClient()
  
  const { data: settings } = await supabase
    .from("site_settings")
    .select("*")

  const settingsMap = settings?.reduce((acc, s) => {
    acc[s.key] = s.value
    return acc
  }, {} as Record<string, string>) || {}

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Site Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your salon information and contact details
        </p>
      </div>

      <SettingsForm settings={settingsMap} />
    </div>
  )
}
