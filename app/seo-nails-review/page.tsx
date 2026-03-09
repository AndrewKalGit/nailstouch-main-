import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { NailGalleryItem } from '@/lib/types'
import { Star, DollarSign } from 'lucide-react'

async function getGalleryItems(): Promise<NailGalleryItem[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('nail_gallery')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
  
  return data || []
}

export default async function GalleryPage() {
  const items = await getGalleryItems()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Generate JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Nail Art Gallery',
    description: 'Browse our stunning nail art designs with customer reviews',
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: item.title,
        description: item.description,
        image: item.image_url,
        url: `/seo-nails-review/${item.slug}`,
        ...(item.price && {
          offers: {
            '@type': 'Offer',
            price: item.price,
            priceCurrency: 'USD',
          },
        }),
        ...(item.rating && {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: item.rating,
            ratingCount: 1,
            bestRating: 5,
          },
        }),
        ...(item.customer_review && {
          review: {
            '@type': 'Review',
            reviewBody: item.customer_review,
            author: {
              '@type': 'Person',
              name: item.customer_name || 'Anonymous',
            },
            reviewRating: {
              '@type': 'Rating',
              ratingValue: item.rating || 5,
            },
          },
        }),
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <section className="bg-secondary/20 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
              Our Portfolio
            </p>
            <h1 className="mb-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Nail Art Gallery & Reviews
            </h1>
            <p className="text-pretty text-lg text-muted-foreground">
              Explore our collection of stunning nail designs. Each creation comes with a customer
              review and pricing information to help inspire your next look.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                No gallery items available yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <Link key={item.id} href={`/seo-nails-review/${item.slug}`}>
                  <Card className="group h-full cursor-pointer overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <Image
                        src={item.image_url}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {item.tags && item.tags.length > 0 && (
                        <div className="absolute left-3 top-3 flex flex-wrap gap-1">
                          {item.tags.slice(0, 2).map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="bg-background/90 text-xs backdrop-blur"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <CardContent className="p-5">
                      <h2 className="mb-2 text-lg font-medium text-foreground group-hover:text-primary">
                        {item.title}
                      </h2>
                      
                      <div className="mb-3 flex items-center justify-between">
                        {item.rating && (
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < item.rating! ? 'fill-primary text-primary' : 'text-muted'
                                }`}
                              />
                            ))}
                          </div>
                        )}
                        {item.price && (
                          <div className="flex items-center gap-1 text-sm font-medium text-primary">
                            <DollarSign className="h-4 w-4" />
                            {formatPrice(item.price)}
                          </div>
                        )}
                      </div>

                      {item.customer_review && (
                        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                          &quot;{item.customer_review}&quot;
                        </p>
                      )}

                      <div className="flex items-center justify-between text-sm">
                        {item.customer_name && (
                          <span className="text-muted-foreground">- {item.customer_name}</span>
                        )}
                        {item.service_name && (
                          <Badge variant="outline" className="text-xs">
                            {item.service_name}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
