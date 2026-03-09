import { createClient } from "@/lib/supabase/server"
import { ServicesList } from "@/components/admin/services-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default async function ServicesPage() {
  const supabase = await createClient()
  
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .order("category")
    .order("sort_order")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Services & Pricing</h1>
          <p className="text-muted-foreground mt-1">
            Manage your nail salon services and pricing
          </p>
        </div>
        <Link href="/admin/services/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        </Link>
      </div>

      <ServicesList services={services || []} />
    </div>
  )
}
