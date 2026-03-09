"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Special } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

interface SpecialFormProps {
  special?: Special
}

export function SpecialForm({ special }: SpecialFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: special?.title || "",
    description: special?.description || "",
    discount_text: special?.discount_text || "",
    valid_from: special?.valid_from?.split("T")[0] || "",
    valid_until: special?.valid_until?.split("T")[0] || "",
    is_active: special?.is_active ?? true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const supabase = createClient()

    const data = {
      title: formData.title,
      description: formData.description || null,
      discount_text: formData.discount_text,
      valid_from: formData.valid_from || null,
      valid_until: formData.valid_until || null,
      is_active: formData.is_active,
    }

    if (special) {
      await supabase.from("specials").update(data).eq("id", special.id)
    } else {
      await supabase.from("specials").insert(data)
    }

    setIsLoading(false)
    router.push("/admin/specials")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{special ? "Edit Special" : "New Special"}</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Summer Special"
                required
              />
            </Field>

            <Field>
              <FieldLabel>Description</FieldLabel>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe this special offer..."
                rows={3}
              />
            </Field>

            <Field>
              <FieldLabel>Discount Text</FieldLabel>
              <Input
                value={formData.discount_text}
                onChange={(e) => setFormData({ ...formData, discount_text: e.target.value })}
                placeholder="e.g. 20% OFF or $10 OFF"
                required
              />
            </Field>

            <div className="grid gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel>Valid From</FieldLabel>
                <Input
                  type="date"
                  value={formData.valid_from}
                  onChange={(e) => setFormData({ ...formData, valid_from: e.target.value })}
                />
              </Field>

              <Field>
                <FieldLabel>Valid Until</FieldLabel>
                <Input
                  type="date"
                  value={formData.valid_until}
                  onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
                />
              </Field>
            </div>

            <Field className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <FieldLabel className="mb-0">Active</FieldLabel>
                <p className="text-sm text-muted-foreground">
                  Show this special on the public website
                </p>
              </div>
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
            </Field>
          </FieldGroup>

          <div className="mt-6 flex gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : special ? "Update Special" : "Create Special"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/specials")}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
