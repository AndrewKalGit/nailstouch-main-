"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Service } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const categories = [
  "manicure",
  "pedicure",
  "enhancements",
  "nail art",
  "waxing",
  "additional",
]

interface ServiceFormProps {
  service?: Service
}

export function ServiceForm({ service }: ServiceFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: service?.name || "",
    description: service?.description || "",
    category: service?.category || "manicure",
    price: service?.price?.toString() || "",
    price_max: service?.price_max?.toString() || "",
    duration_minutes: service?.duration_minutes?.toString() || "",
    is_active: service?.is_active ?? true,
    sort_order: service?.sort_order?.toString() || "0",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const supabase = createClient()

    const data = {
      name: formData.name,
      description: formData.description || null,
      category: formData.category,
      price: parseFloat(formData.price),
      price_max: formData.price_max ? parseFloat(formData.price_max) : null,
      duration_minutes: formData.duration_minutes ? parseInt(formData.duration_minutes) : null,
      is_active: formData.is_active,
      sort_order: parseInt(formData.sort_order) || 0,
    }

    if (service) {
      await supabase.from("services").update(data).eq("id", service.id)
    } else {
      await supabase.from("services").insert(data)
    }

    setIsLoading(false)
    router.push("/admin/services")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{service ? "Edit Service" : "New Service"}</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel>Service Name</FieldLabel>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Classic Manicure"
                required
              />
            </Field>

            <Field>
              <FieldLabel>Description</FieldLabel>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe this service..."
                rows={3}
              />
            </Field>

            <Field>
              <FieldLabel>Category</FieldLabel>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat} className="capitalize">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <div className="grid gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel>Price ($)</FieldLabel>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="25.00"
                  required
                />
              </Field>

              <Field>
                <FieldLabel>Max Price ($ - optional)</FieldLabel>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.price_max}
                  onChange={(e) => setFormData({ ...formData, price_max: e.target.value })}
                  placeholder="35.00"
                />
              </Field>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel>Duration (minutes)</FieldLabel>
                <Input
                  type="number"
                  value={formData.duration_minutes}
                  onChange={(e) => setFormData({ ...formData, duration_minutes: e.target.value })}
                  placeholder="30"
                />
              </Field>

              <Field>
                <FieldLabel>Sort Order</FieldLabel>
                <Input
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData({ ...formData, sort_order: e.target.value })}
                  placeholder="0"
                />
              </Field>
            </div>

            <Field className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <FieldLabel className="mb-0">Active</FieldLabel>
                <p className="text-sm text-muted-foreground">
                  Show this service on the public website
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
              {isLoading ? "Saving..." : service ? "Update Service" : "Create Service"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/services")}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
