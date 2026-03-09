import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
})

const geistMono = Geist_Mono({ 
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: {
    default: 'Luxe Nail Studio | Premium Nail Salon & Spa',
    template: '%s | Luxe Nail Studio'
  },
  description: 'Luxe Nail Studio offers premium manicures, pedicures, gel nails, acrylics, and stunning nail art in Los Angeles. Expert technicians, luxurious atmosphere, and stunning results. Book your appointment today.',
  keywords: ['nail salon', 'manicure', 'pedicure', 'nail art', 'gel nails', 'acrylic nails', 'Los Angeles nail salon', 'luxury nail spa', 'chrome nails', 'nail extensions', 'spa pedicure'],
  authors: [{ name: 'Luxe Nail Studio' }],
  creator: 'Luxe Nail Studio',
  publisher: 'Luxe Nail Studio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://luxenailstudio.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Luxe Nail Studio | Premium Nail Salon & Spa',
    description: 'Experience luxury nail care at Luxe Nail Studio. Premium manicures, pedicures, and stunning nail art by expert technicians.',
    url: 'https://luxenailstudio.com',
    siteName: 'Luxe Nail Studio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxe Nail Studio - Premium Nail Salon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxe Nail Studio | Premium Nail Salon & Spa',
    description: 'Experience luxury nail care at Luxe Nail Studio. Premium manicures, pedicures, and stunning nail art.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf9f7' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${geistMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
