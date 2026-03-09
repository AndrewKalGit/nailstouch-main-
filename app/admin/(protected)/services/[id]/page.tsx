import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { ServiceForm } from "@/components/admin/service-form"

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: service } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .single()

  if (!service) {
    notFound()
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-3xl font-serif font-bold text-foreground">Edit Service</h1>
        <p className="text-muted-foreground mt-1">
          Update service details and pricing
        </p>
      </div>
      <ServiceForm service={service} />
    </div>
  )
}
