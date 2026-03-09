import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { NailGalleryItem } from '@/lib/types'
import { Star, ArrowRight } from 'lucide-react'

interface GalleryPreviewProps {
  items: NailGalleryItem[]
}

export function GalleryPreview({ items }: GalleryPreviewProps) {
  if (items.length === 0) {
    return null
  }

  const featuredItems = items.slice(0, 4)

  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
            Our Work
          </p>
          <h2 className="mb-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Nail Art Gallery
          </h2>
          <p className="text-pretty text-muted-foreground">
            Browse our collection of stunning nail designs and read what our happy customers have to
            say about their experience.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredItems.map((item) => (
            <Link key={item.id} href={`/seo-nails-review/${item.slug}`}>
              <Card className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="mb-1 font-medium text-foreground group-hover:text-primary">
                    {item.title}
                  </h3>
                  {item.rating && (
                    <div className="mb-2 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${
                            i < item.rating! ? 'fill-primary text-primary' : 'text-muted'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  {item.customer_name && (
                    <p className="text-sm text-muted-foreground">by {item.customer_name}</p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/seo-nails-review">
              View Full Gallery
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
