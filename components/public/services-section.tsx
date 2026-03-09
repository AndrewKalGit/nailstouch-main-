import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Service, ServicesByCategory } from '@/lib/types'
import { Clock } from 'lucide-react'

interface ServicesSectionProps {
  services: Service[]
  bookingUrl?: string
}

export function ServicesSection({ services, bookingUrl = '#' }: ServicesSectionProps) {
  // Group services by category
  const servicesByCategory = services.reduce<ServicesByCategory>((acc, service) => {
    const category = service.category
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(service)
    return acc
  }, {})

  const categories = Object.keys(servicesByCategory).sort((a, b) => {
    const orderA = servicesByCategory[a][0]?.display_order || 0
    const orderB = servicesByCategory[b][0]?.display_order || 0
    return orderA - orderB
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  if (services.length === 0) {
    return null
  }

  return (
    <section id="services" className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
            Our Services
          </p>
          <h2 className="mb-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Premium Nail Care Services
          </h2>
          <p className="text-pretty text-muted-foreground">
            From classic manicures to intricate nail art, we offer a full range of services to
            pamper your hands and feet.
          </p>
        </div>

        <div className="mt-12">
          <Tabs defaultValue={categories[0]} className="w-full">
            <TabsList className="mx-auto mb-8 flex h-auto w-full max-w-2xl flex-wrap justify-center gap-2 bg-transparent">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="rounded-full border border-border bg-background px-6 py-2 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {servicesByCategory[category]
                    .sort((a, b) => a.display_order - b.display_order)
                    .map((service) => (
                      <Card
                        key={service.id}
                        className="group transition-shadow hover:shadow-md"
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-lg font-medium">{service.name}</CardTitle>
                            <span className="text-lg font-semibold text-primary">
                              {formatPrice(service.price)}
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {service.description && (
                            <CardDescription className="mb-3 line-clamp-2">
                              {service.description}
                            </CardDescription>
                          )}
                          {service.duration_minutes && (
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>{service.duration_minutes} min</span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
              Book a Service
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
