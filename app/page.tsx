import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/public/header'
import { Hero } from '@/components/public/hero'
import { ServicesSection } from '@/components/public/services-section'
import { SpecialsSection } from '@/components/public/specials-section'
import { GalleryPreview } from '@/components/public/gallery-preview'
import { ContactSection } from '@/components/public/contact-section'
import { Footer } from '@/components/public/footer'
import type { Service, Special, NailGalleryItem, SiteSetting } from '@/lib/types'

async function getSettings(): Promise<Record<string, string>> {
  const supabase = await createClient()
  const { data } = await supabase.from('site_settings').select('key, value')
  
  if (!data) return {}
  
  return data.reduce((acc, setting) => {
    if (setting.value) {
      acc[setting.key] = setting.value
    }
    return acc
  }, {} as Record<string, string>)
}

async function getServices(): Promise<Service[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
  
  return data || []
}

async function getSpecials(): Promise<Special[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('specials')
    .select('*')
    .eq('is_active', true)
  
  return data || []
}

async function getGalleryItems(): Promise<NailGalleryItem[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('nail_gallery')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(4)
  
  return data || []
}

export default async function HomePage() {
  const [settings, services, specials, galleryItems] = await Promise.all([
    getSettings(),
    getServices(),
    getSpecials(),
    getGalleryItems(),
  ])

  const businessHours = settings.business_hours 
    ? JSON.parse(settings.business_hours) 
    : undefined

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        salonName={settings.salon_name}
        bookingUrl={settings.booking_url}
        phone={settings.salon_phone}
      />
      <main className="flex-1">
        <Hero
          salonName={settings.salon_name}
          tagline={settings.salon_tagline}
          bookingUrl={settings.booking_url}
        />
        <ServicesSection services={services} bookingUrl={settings.booking_url} />
        <SpecialsSection specials={specials} />
        <GalleryPreview items={galleryItems} />
        <ContactSection
          phone={settings.salon_phone}
          email={settings.salon_email}
          address={settings.salon_address}
          instagramUrl={settings.instagram_url}
          businessHours={businessHours}
          bookingUrl={settings.booking_url}
        />
      </main>
      <Footer
        salonName={settings.salon_name}
        phone={settings.salon_phone}
        email={settings.salon_email}
        address={settings.salon_address}
        instagramUrl={settings.instagram_url}
        businessHours={businessHours}
      />
    </div>
  )
}
