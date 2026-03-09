"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { NailGalleryItem } from "@/lib/types"
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

const nailStyles = [
  "Classic",
  "French",
  "Gel",
  "Acrylic",
  "Dip Powder",
  "Nail Art",
  "Ombre",
  "Chrome",
  "Matte",
  "Glitter",
]

interface GalleryFormProps {
  item?: NailGalleryItem
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function GalleryForm({ item }: GalleryFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: item?.title || "",
    slug: item?.slug || "",
    description: item?.description || "",
    image_url: item?.image_url || "",
    nail_style: item?.nail_style || "",
    price: item?.price?.toString() || "",
    customer_name: item?.customer_name || "",
    customer_review: item?.customer_review || "",
    rating: item?.rating?.toString() || "5",
    seo_title: item?.seo_title || "",
    seo_description: item?.seo_description || "",
    is_published: item?.is_published ?? false,
    is_featured: item?.is_featured ?? false,
  })

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: item ? formData.slug : generateSlug(title),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const supabase = createClient()

    const data = {
      title: formData.title,
      slug: formData.slug || generateSlug(formData.title),
      description: formData.description || null,
      image_url: formData.image_url || null,
      nail_style: formData.nail_style || null,
      price: formData.price ? parseFloat(formData.price) : null,
      customer_name: formData.customer_name || null,
      customer_review: formData.customer_review || null,
      rating: formData.rating ? parseInt(formData.rating) : null,
      seo_title: formData.seo_title || formData.title,
      seo_description: formData.seo_description || formData.description,
      is_published: formData.is_published,
      is_featured: formData.is_featured,
    }

    if (item) {
      await supabase.from("nail_gallery").update(data).eq("id", item.id)
    } else {
      await supabase.from("nail_gallery").insert(data)
    }

    setIsLoading(false)
    router.push("/admin/gallery")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Elegant Rose Gold French Tips"
                required
              />
            </Field>

            <Field>
              <FieldLabel>URL Slug</FieldLabel>
              <Input
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="elegant-rose-gold-french-tips"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                This will appear in the URL: /seo-nails-review/{formData.slug || "..."}
              </p>
            </Field>

            <Field>
              <FieldLabel>Description</FieldLabel>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe this nail design..."
                rows={4}
              />
            </Field>

            <Field>
              <FieldLabel>Image URL</FieldLabel>
              <Input
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </Field>

            <div className="grid gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel>Nail Style</FieldLabel>
                <Select
                  value={formData.nail_style}
                  onValueChange={(value) => setFormData({ ...formData, nail_style: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    {nailStyles.map((style) => (
                      <SelectItem key={style} value={style.toLowerCase()}>
                        {style}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel>Price ($)</FieldLabel>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="45.00"
                />
              </Field>
            </div>
          </FieldGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customer Review</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel>Customer Name</FieldLabel>
              <Input
                value={formData.customer_name}
                onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                placeholder="e.g. Sarah M."
              />
            </Field>

            <Field>
              <FieldLabel>Customer Review</FieldLabel>
              <Textarea
                value={formData.customer_review}
                onChange={(e) => setFormData({ ...formData, customer_review: e.target.value })}
                placeholder="What did the customer say about this design?"
                rows={3}
              />
            </Field>

            <Field>
              <FieldLabel>Rating (1-5)</FieldLabel>
              <Select
                value={formData.rating}
                onValueChange={(value) => setFormData({ ...formData, rating: value })}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[5, 4, 3, 2, 1].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} Star{num > 1 ? "s" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SEO Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel>SEO Title</FieldLabel>
              <Input
                value={formData.seo_title}
                onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                placeholder="Leave empty to use title"
              />
            </Field>

            <Field>
              <FieldLabel>SEO Description</FieldLabel>
              <Textarea
                value={formData.seo_description}
                onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                placeholder="Leave empty to use description"
                rows={2}
              />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Publishing Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <FieldLabel className="mb-0">Published</FieldLabel>
              <p className="text-sm text-muted-foreground">
                Make this visible on the public gallery
              </p>
            </div>
            <Switch
              checked={formData.is_published}
              onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
            />
          </Field>

          <Field className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <FieldLabel className="mb-0">Featured</FieldLabel>
              <p className="text-sm text-muted-foreground">
                Show on homepage gallery preview
              </p>
            </div>
            <Switch
              checked={formData.is_featured}
              onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
            />
          </Field>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : item ? "Update Gallery Item" : "Create Gallery Item"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/gallery")}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
