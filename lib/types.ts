export interface Service {
  id: string
  name: string
  description: string | null
  price: number
  duration_minutes: number | null
  category: string
  is_active: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export interface Special {
  id: string
  title: string
  description: string | null
  original_price: number | null
  special_price: number
  discount_percentage: number | null
  valid_from: string | null
  valid_until: string | null
  is_active: boolean
  image_url: string | null
  created_at: string
  updated_at: string
}

export interface NailGalleryItem {
  id: string
  title: string
  slug: string
  description: string | null
  image_url: string
  customer_name: string | null
  customer_review: string | null
  rating: number | null
  service_name: string | null
  price: number | null
  tags: string[] | null
  meta_title: string | null
  meta_description: string | null
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface SiteSetting {
  id: string
  key: string
  value: string | null
  created_at: string
  updated_at: string
}

export interface AdminUser {
  id: string
  email: string
  pin_code: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export type ServicesByCategory = Record<string, Service[]>
