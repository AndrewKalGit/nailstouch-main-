import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Admin Dashboard',
    template: '%s | Admin - Luxe Nail Studio',
  },
  description: 'Admin dashboard for managing Luxe Nail Studio content',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
