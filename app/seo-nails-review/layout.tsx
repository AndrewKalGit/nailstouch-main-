import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/public/header'
import { Footer } from '@/components/public/footer'

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

export const metadata: Metadata = {
  title: 'Nail Art Gallery & Customer Reviews',
  description: 'Browse our stunning nail art gallery featuring customer reviews, nail designs, prices, and inspiration. See real results from our expert nail technicians.',
  keywords: ['nail art gallery', 'nail designs', 'customer reviews', 'manicure results', 'nail inspiration', 'before after nails'],
  openGraph: {
    title: 'Nail Art Gallery & Customer Reviews | Luxe Nail Studio',
    description: 'Browse our stunning nail art gallery featuring customer reviews and nail design inspiration.',
    type: 'website',
    images: ['/og-gallery.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nail Art Gallery & Customer Reviews | Luxe Nail Studio',
    description: 'Browse our stunning nail art gallery featuring customer reviews and nail design inspiration.',
  },
}

export default async function GalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSettings()
  
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
      <main className="flex-1">{children}</main>
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
