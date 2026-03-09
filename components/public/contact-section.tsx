import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Phone, Mail, MapPin, Clock, Instagram } from 'lucide-react'

interface ContactSectionProps {
  phone?: string
  email?: string
  address?: string
  instagramUrl?: string
  businessHours?: Record<string, string>
  bookingUrl?: string
}

export function ContactSection({
  phone,
  email,
  address,
  instagramUrl,
  businessHours,
  bookingUrl = '#',
}: ContactSectionProps) {
  return (
    <section id="contact" className="bg-secondary/30 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
            Get in Touch
          </p>
          <h2 className="mb-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Visit Us Today
          </h2>
          <p className="text-pretty text-muted-foreground">
            We would love to welcome you to our studio. Book an appointment or stop by to say hello.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Contact Info Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {phone && (
              <Card className="transition-shadow hover:shadow-md">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-medium text-foreground">Phone</h3>
                    <a
                      href={`tel:${phone.replace(/[^0-9]/g, '')}`}
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      {phone}
                    </a>
                  </div>
                </CardContent>
              </Card>
            )}

            {email && (
              <Card className="transition-shadow hover:shadow-md">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-medium text-foreground">Email</h3>
                    <a
                      href={`mailto:${email}`}
                      className="break-all text-muted-foreground transition-colors hover:text-primary"
                    >
                      {email}
                    </a>
                  </div>
                </CardContent>
              </Card>
            )}

            {address && (
              <Card className="transition-shadow hover:shadow-md">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-medium text-foreground">Address</h3>
                    <p className="text-muted-foreground">{address}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {instagramUrl && (
              <Card className="transition-shadow hover:shadow-md">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Instagram className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-medium text-foreground">Instagram</h3>
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      Follow us
                    </a>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Business Hours */}
          <Card className="h-fit">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-foreground">Business Hours</h3>
              </div>
              {businessHours ? (
                <div className="space-y-2">
                  {Object.entries(businessHours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between border-b border-border/50 pb-2 last:border-0">
                      <span className="capitalize text-foreground">{day}</span>
                      <span className="text-muted-foreground">{hours}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">Contact us for hours</p>
              )}
              <div className="mt-6">
                <Button className="w-full" size="lg" asChild>
                  <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                    Book Your Appointment
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
