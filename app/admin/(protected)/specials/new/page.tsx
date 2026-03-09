import { SpecialForm } from "@/components/admin/special-form"

export default function NewSpecialPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-3xl font-serif font-bold text-foreground">Add New Special</h1>
        <p className="text-muted-foreground mt-1">
          Create a new promotional offer
        </p>
      </div>
      <SpecialForm />
    </div>
  )
}
