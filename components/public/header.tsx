'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#services', label: 'Services' },
  { href: '/#specials', label: 'Specials' },
  { href: '/seo-nails-review', label: 'Gallery' },
  { href: '/#contact', label: 'Contact' },
]

interface HeaderProps {
  salonName?: string
  bookingUrl?: string
  phone?: string
}

export function Header({ salonName = 'Luxe Nail Studio', bookingUrl = '#', phone }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-semibold tracking-wide text-foreground sm:text-2xl">
            {salonName}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {phone && (
            <a
              href={`tel:${phone.replace(/[^0-9]/g, '')}`}
              className="hidden items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary lg:flex"
            >
              <Phone className="h-4 w-4" />
              {phone}
            </a>
          )}
          <Button asChild className="hidden sm:inline-flex">
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
              Book Now
            </a>
          </Button>

          {/* Mobile Menu Button */}
          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'border-t border-border/40 bg-background md:hidden',
          isMenuOpen ? 'block' : 'hidden'
        )}
      >
        <nav className="flex flex-col space-y-1 px-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Button asChild className="w-full">
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                Book Now
              </a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
