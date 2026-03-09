import { GalleryForm } from "@/components/admin/gallery-form"

export default function NewGalleryPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-serif font-bold text-foreground">Add Gallery Item</h1>
        <p className="text-muted-foreground mt-1">
          Create a new nail gallery entry with customer review
        </p>
      </div>
      <GalleryForm />
    </div>
  )
}
