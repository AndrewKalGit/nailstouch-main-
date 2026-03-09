import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { GalleryForm } from "@/components/admin/gallery-form"

export default async function EditGalleryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: item } = await supabase
    .from("nail_gallery")
    .select("*")
    .eq("id", id)
    .single()

  if (!item) {
    notFound()
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-serif font-bold text-foreground">Edit Gallery Item</h1>
        <p className="text-muted-foreground mt-1">
          Update gallery item and customer review
        </p>
      </div>
      <GalleryForm item={item} />
    </div>
  )
}
