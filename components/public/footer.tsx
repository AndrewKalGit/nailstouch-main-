import Link from 'next/link'
import { Instagram, Phone, Mail, MapPin, Clock } from 'lucide-react'

interface FooterProps {
  salonName?: string
  phone?: string
  email?: string
  address?: string
  instagramUrl?: string
  businessHours?: Record<string, string>
}

export function Footer({
  salonName = 'Luxe Nail Studio',
  phone,
  email,
  address,
  instagramUrl,
  businessHours,
}: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">{salonName}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Where beauty meets artistry. Experience luxury nail care with our expert technicians
              in a relaxing, elegant atmosphere.
            </p>
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
                <span>Follow us on Instagram</span>
              </a>
            )}
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/#services"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Our Services
              </Link>
              <Link
                href="/#specials"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Current Specials
              </Link>
              <Link
                href="/seo-nails-review"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Nail Gallery
              </Link>
              <Link
                href="/#contact"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Contact
            </h4>
            <div className="flex flex-col space-y-3">
              {phone && (
                <a
                  href={`tel:${phone.replace(/[^0-9]/g, '')}`}
                  className="flex items-start gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{phone}</span>
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-start gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{email}</span>
                </a>
              )}
              {address && (
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Hours
            </h4>
            {businessHours ? (
              <div className="flex flex-col space-y-1">
                {Object.entries(businessHours).map(([day, hours]) => (
                  <div key={day} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Clock className="mt-0.5 h-3 w-3 shrink-0 opacity-0 first:opacity-100" />
                    <span className="w-20 capitalize">{day}</span>
                    <span>{hours}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Contact us for hours</p>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {currentYear} {salonName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
