import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface HeroProps {
  salonName?: string
  tagline?: string
  bookingUrl?: string
}

export function Hero({
  salonName = 'Nails Touch',
  tagline = 'Where Beauty Meets Artistry',
  bookingUrl = '/booking',
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-secondary/20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-nails.jpg"
          alt="Luxury nail salon ambiance"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
            Welcome to
          </p>
          <h1 className="mb-6 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {salonName}
          </h1>
          <p className="mb-8 text-lg text-muted-foreground sm:text-xl lg:text-2xl">{tagline}</p>
          <p className="mx-auto mb-10 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
            Experience the art of luxury nail care. Our expert technicians create stunning manicures,
            pedicures, and nail art in a relaxing, elegant atmosphere designed for your comfort.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="min-w-[200px]">
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                Book Your Appointment
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="min-w-[200px]">
              <a href="#services">View Our Services</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
