import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isAdminLoginRoute = request.nextUrl.pathname.startsWith('/admin/login')
  const adminVerified = request.cookies.get('admin_verified')?.value === 'true'

  // Protect admin routes (except login)
  if (isAdminRoute && !isAdminLoginRoute) {
    if (!user) {
      // Not logged in - redirect to admin login
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      return NextResponse.redirect(url)
    }

    if (!adminVerified) {
      // Logged in but PIN not verified - redirect to login with PIN step
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      url.searchParams.set('step', 'pin')
      return NextResponse.redirect(url)
    }
  }

  // If already logged in and verified, redirect away from login page
  if (isAdminLoginRoute && user && adminVerified) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
