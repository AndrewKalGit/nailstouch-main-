import { createClient } from "@/lib/supabase/server"
import { GalleryList } from "@/components/admin/gallery-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default async function GalleryAdminPage() {
  const supabase = await createClient()
  
  const { data: gallery } = await supabase
    .from("nail_gallery")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Nail Gallery</h1>
          <p className="text-muted-foreground mt-1">
            Manage gallery items with customer reviews for SEO
          </p>
        </div>
        <Link href="/admin/gallery/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Gallery Item
          </Button>
        </Link>
      </div>

      <GalleryList items={gallery || []} />
    </div>
  )
}
