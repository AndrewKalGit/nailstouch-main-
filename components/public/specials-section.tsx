import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Special } from '@/lib/types'
import { Sparkles, Tag, Calendar } from 'lucide-react'

interface SpecialsSectionProps {
  specials: Special[]
}

export function SpecialsSection({ specials }: SpecialsSectionProps) {
  if (specials.length === 0) {
    return null
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <section id="specials" className="bg-secondary/30 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary/10 px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Limited Time Offers</span>
          </div>
          <h2 className="mb-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Current Specials
          </h2>
          <p className="text-pretty text-muted-foreground">
            Take advantage of our exclusive offers and treat yourself to premium nail care at
            special prices.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {specials.map((special) => (
            <Card
              key={special.id}
              className="group relative overflow-hidden transition-shadow hover:shadow-lg"
            >
              {special.discount_percentage && (
                <Badge className="absolute right-4 top-4 bg-primary text-primary-foreground">
                  {special.discount_percentage}% OFF
                </Badge>
              )}
              <CardHeader className="pb-2">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Tag className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg font-medium">{special.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {special.description && (
                  <CardDescription className="line-clamp-3">{special.description}</CardDescription>
                )}
                <div className="flex items-baseline gap-2">
                  {special.original_price && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(special.original_price)}
                    </span>
                  )}
                  <span className="text-xl font-semibold text-primary">
                    {formatPrice(special.special_price)}
                  </span>
                </div>
                {special.valid_until && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Valid until {formatDate(special.valid_until)}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
