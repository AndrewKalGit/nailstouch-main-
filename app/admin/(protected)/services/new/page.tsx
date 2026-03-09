import { ServiceForm } from "@/components/admin/service-form"

export default function NewServicePage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-3xl font-serif font-bold text-foreground">Add New Service</h1>
        <p className="text-muted-foreground mt-1">
          Create a new service for your nail salon
        </p>
      </div>
      <ServiceForm />
    </div>
  )
}
