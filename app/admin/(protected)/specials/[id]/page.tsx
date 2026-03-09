import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { SpecialForm } from "@/components/admin/special-form"

export default async function EditSpecialPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: special } = await supabase
    .from("specials")
    .select("*")
    .eq("id", id)
    .single()

  if (!special) {
    notFound()
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-3xl font-serif font-bold text-foreground">Edit Special</h1>
        <p className="text-muted-foreground mt-1">
          Update promotional offer details
        </p>
      </div>
      <SpecialForm special={special} />
    </div>
  )
}
