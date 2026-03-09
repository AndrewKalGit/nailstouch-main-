import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { NailGalleryItem } from '@/lib/types'
import { Star, ArrowLeft, DollarSign, Quote, Calendar } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getGalleryItem(slug: string): Promise<NailGalleryItem | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('nail_gallery')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()
  
  return data
}

async function getRelatedItems(currentId: string, tags: string[] | null): Promise<NailGalleryItem[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('nail_gallery')
    .select('*')
    .eq('is_published', true)
    .neq('id', currentId)
    .limit(3)
  
  return data || []
}

async function getBookingUrl(): Promise<string> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'booking_url')
    .single()
  
  return data?.value || '#'
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const item = await getGalleryItem(slug)
  
  if (!item) {
    return {
      title: 'Not Found',
      description: 'The requested nail design could not be found.',
    }
  }

  return {
    title: item.meta_title || item.title,
    description: item.meta_description || item.description || `View ${item.title} nail design with customer review and pricing at Luxe Nail Studio.`,
    keywords: item.tags?.join(', ') || 'nail art, nail design',
    openGraph: {
      title: item.meta_title || item.title,
      description: item.meta_description || item.description || undefined,
      type: 'article',
      images: [item.image_url],
    },
    twitter: {
      card: 'summary_large_image',
      title: item.meta_title || item.title,
      description: item.meta_description || item.description || undefined,
      images: [item.image_url],
    },
  }
}

export default async function GalleryItemPage({ params }: PageProps) {
  const { slug } = await params
  const [item, bookingUrl] = await Promise.all([
    getGalleryItem(slug),
    getBookingUrl(),
  ])

  if (!item) {
    notFound()
  }

  const relatedItems = await getRelatedItems(item.id, item.tags)

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
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Generate JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: item.title,
    description: item.description,
    image: item.image_url,
    ...(item.price && {
      offers: {
        '@type': 'Offer',
        price: item.price,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    }),
    ...(item.rating && item.customer_review && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: item.rating,
        ratingCount: 1,
        bestRating: 5,
      },
      review: {
        '@type': 'Review',
        reviewBody: item.customer_review,
        author: {
          '@type': 'Person',
          name: item.customer_name || 'Anonymous',
        },
        datePublished: item.created_at,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: item.rating,
          bestRating: 5,
        },
      },
    }),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/seo-nails-review"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Gallery
          </Link>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Image */}
            <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
              <Image
                src={item.image_url}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Content */}
            <div className="flex flex-col">
              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <h1 className="mb-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {item.title}
              </h1>

              {/* Rating & Price */}
              <div className="mb-6 flex flex-wrap items-center gap-4">
                {item.rating && (
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < item.rating! ? 'fill-primary text-primary' : 'text-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">({item.rating}/5)</span>
                  </div>
                )}
                {item.price && (
                  <div className="flex items-center gap-1 text-lg font-semibold text-primary">
                    <DollarSign className="h-5 w-5" />
                    {formatPrice(item.price)}
                  </div>
                )}
              </div>

              {/* Service Type */}
              {item.service_name && (
                <div className="mb-6">
                  <span className="text-sm text-muted-foreground">Service: </span>
                  <span className="font-medium text-foreground">{item.service_name}</span>
                </div>
              )}

              {/* Description */}
              {item.description && (
                <p className="mb-8 text-pretty leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              )}

              {/* Customer Review */}
              {item.customer_review && (
                <Card className="mb-8 border-primary/20 bg-primary/5">
                  <CardContent className="p-6">
                    <Quote className="mb-4 h-8 w-8 text-primary/40" />
                    <blockquote className="mb-4 text-lg italic text-foreground">
                      &quot;{item.customer_review}&quot;
                    </blockquote>
                    <div className="flex items-center justify-between">
                      {item.customer_name && (
                        <cite className="not-italic text-muted-foreground">
                          - {item.customer_name}
                        </cite>
                      )}
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {formatDate(item.created_at)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* CTA */}
              <div className="mt-auto space-y-4">
                <Button size="lg" className="w-full" asChild>
                  <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                    Book This Look
                  </a>
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Show this design to your technician during your appointment
                </p>
              </div>
            </div>
          </div>

          {/* Related Items */}
          {relatedItems.length > 0 && (
            <section className="mt-16">
              <h2 className="mb-8 text-2xl font-semibold text-foreground">More Designs You May Like</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedItems.map((related) => (
                  <Link key={related.id} href={`/seo-nails-review/${related.slug}`}>
                    <Card className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg">
                      <div className="relative aspect-square overflow-hidden bg-muted">
                        <Image
                          src={related.image_url}
                          alt={related.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium text-foreground group-hover:text-primary">
                          {related.title}
                        </h3>
                        {related.rating && (
                          <div className="mt-2 flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3.5 w-3.5 ${
                                  i < related.rating! ? 'fill-primary text-primary' : 'text-muted'
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  )
}
