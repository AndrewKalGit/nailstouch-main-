"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

interface SettingsFormProps {
  settings: Record<string, string>
}

const settingFields = [
  { key: "salon_name", label: "Salon Name", type: "text" },
  { key: "tagline", label: "Tagline", type: "text" },
  { key: "phone", label: "Phone Number", type: "text" },
  { key: "email", label: "Email Address", type: "email" },
  { key: "address", label: "Address", type: "textarea" },
  { key: "hours", label: "Business Hours", type: "textarea" },
  { key: "booking_url", label: "Booking URL", type: "url" },
  { key: "instagram_url", label: "Instagram URL", type: "url" },
  { key: "facebook_url", label: "Facebook URL", type: "url" },
]

export function SettingsForm({ settings }: SettingsFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(settings)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const supabase = createClient()

    for (const field of settingFields) {
      const value = formData[field.key] || ""
      
      await supabase
        .from("site_settings")
        .upsert({ key: field.key, value }, { onConflict: "key" })
    }

    setIsLoading(false)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            {settingFields.map((field) => (
              <Field key={field.key}>
                <FieldLabel>{field.label}</FieldLabel>
                {field.type === "textarea" ? (
                  <Textarea
                    value={formData[field.key] || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.key]: e.target.value })
                    }
                    rows={3}
                  />
                ) : (
                  <Input
                    type={field.type}
                    value={formData[field.key] || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.key]: e.target.value })
                    }
                  />
                )}
              </Field>
            ))}
          </FieldGroup>

          <div className="mt-6">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
