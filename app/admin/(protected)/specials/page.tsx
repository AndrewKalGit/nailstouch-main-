import { createClient } from "@/lib/supabase/server"
import { SpecialsList } from "@/components/admin/specials-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default async function SpecialsPage() {
  const supabase = await createClient()
  
  const { data: specials } = await supabase
    .from("specials")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Specials & Promotions</h1>
          <p className="text-muted-foreground mt-1">
            Manage promotional offers and discounts
          </p>
        </div>
        <Link href="/admin/specials/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Special
          </Button>
        </Link>
      </div>

      <SpecialsList specials={specials || []} />
    </div>
  )
}
