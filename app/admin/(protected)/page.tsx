import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Scissors, Tag, Image, TrendingUp } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [servicesResult, specialsResult, galleryResult] = await Promise.all([
    supabase.from("services").select("id", { count: "exact" }),
    supabase.from("specials").select("id", { count: "exact" }).eq("is_active", true),
    supabase.from("nail_gallery").select("id", { count: "exact" }).eq("is_published", true),
  ])

  const stats = [
    {
      title: "Total Services",
      value: servicesResult.count || 0,
      icon: Scissors,
      href: "/admin/services",
      color: "text-primary",
    },
    {
      title: "Active Specials",
      value: specialsResult.count || 0,
      icon: Tag,
      href: "/admin/specials",
      color: "text-accent",
    },
    {
      title: "Gallery Items",
      value: galleryResult.count || 0,
      icon: Image,
      href: "/admin/gallery",
      color: "text-secondary-foreground",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome to your nail salon admin panel
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="transition-all hover:shadow-lg hover:border-primary/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link
              href="/admin/services"
              className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted"
            >
              <span className="font-medium">Manage Services & Pricing</span>
              <Scissors className="h-5 w-5 text-muted-foreground" />
            </Link>
            <Link
              href="/admin/specials"
              className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted"
            >
              <span className="font-medium">Update Specials</span>
              <Tag className="h-5 w-5 text-muted-foreground" />
            </Link>
            <Link
              href="/admin/gallery"
              className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted"
            >
              <span className="font-medium">Add Gallery Item</span>
              <Image className="h-5 w-5 text-muted-foreground" />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Public Site Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted"
            >
              <span className="font-medium">View Homepage</span>
              <span className="text-xs text-muted-foreground">Opens in new tab</span>
            </Link>
            <Link
              href="/seo-nails-review"
              target="_blank"
              className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted"
            >
              <span className="font-medium">View Nail Gallery</span>
              <span className="text-xs text-muted-foreground">Opens in new tab</span>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
