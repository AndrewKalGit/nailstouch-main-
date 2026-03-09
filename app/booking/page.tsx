import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/public/header'
import { Footer } from '@/components/public/footer'
import { createClient } from '@/lib/supabase/server'
import { Calendar, Clock, Phone, Mail, MapPin, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Book Your Appointment | Nails Touch',
  description:
    'Schedule your nail appointment at Nails Touch. Easy online booking for manicures, pedicures, nail art, and more.',
  openGraph: {
    title: 'Book Your Appointment | Nails Touch',
    description:
      'Schedule your nail appointment at Nails Touch. Easy online booking for manicures, pedicures, nail art, and more.',
  },
}

export default async function BookingPage() {
  const supabase = await createClient()

  const { data: settings } = await supabase
    .from('site_settings')
    .select('*')
    .eq('key', 'booking_url')
    .single()

  const { data: contactSettings } = await supabase
    .from('site_settings')
    .select('*')
    .in('key', ['phone', 'email', 'address', 'salon_name'])

  const getSettingValue = (key: string) => {
    const setting = contactSettings?.find((s) => s.key === key)
    return setting?.value || ''
  }

  const bookingUrl = settings?.value || '#'
  const phone = getSettingValue('phone') || '(555) 123-4567'
  const email = getSettingValue('email') || 'hello@luxenailstudio.com'
  const address = getSettingValue('address') || '123 Beauty Lane, Suite 100, Los Angeles, CA 90001'
  const salonName = getSettingValue('salon_name') || 'Nails Touch'

  return (
    <>
      <Header bookingUrl="/booking" />
      <main className="min-h-screen bg-background">
        <section className="bg-secondary/20 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
                Book Now
              </p>
              <h1 className="mb-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Schedule Your Appointment
              </h1>
              <p className="text-pretty text-lg text-muted-foreground">
                Ready to treat yourself? Book your next nail service online or contact us directly.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Online Booking */}
              <Card className="overflow-hidden border-primary/20">
                <CardHeader className="bg-primary/5">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Online Booking
                  </CardTitle>
                  <CardDescription>Book your appointment instantly online</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Use our easy online booking system to schedule your appointment at your
                      convenience. Choose your preferred service, date, and time.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Available 24/7</span>
                    </div>
                    <Button size="lg" className="w-full" asChild>
                      <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                        Book Online Now
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Options */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Us Directly</CardTitle>
                  <CardDescription>
                    Prefer to speak with someone? Reach out to us directly.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Call Us</p>
                      <a
                        href={`tel:${phone.replace(/\D/g, '')}`}
                        className="text-muted-foreground hover:text-primary"
                      >
                        {phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Email Us</p>
                      <a
                        href={`mailto:${email}`}
                        className="text-muted-foreground hover:text-primary"
                      >
                        {email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Visit Us</p>
                      <p className="text-muted-foreground">{address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Tips */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Booking Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                      1
                    </span>
                    <span className="text-muted-foreground">
                      Book at least 24 hours in advance for the best availability
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                      2
                    </span>
                    <span className="text-muted-foreground">
                      Arrive 5-10 minutes early to relax before your service
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                      3
                    </span>
                    <span className="text-muted-foreground">
                      Bring inspiration photos for custom nail art designs
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Back to Home */}
            <div className="mt-12 text-center">
              <Button variant="outline" asChild>
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
