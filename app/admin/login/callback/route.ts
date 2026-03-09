import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      return NextResponse.redirect(`${origin}/admin/login?error=${encodeURIComponent(error.message)}`)
    }

    // Check if this email is in the allowed admin list
    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', data.user?.email)
      .eq('is_active', true)
      .single()

    if (adminError || !adminUser) {
      // Sign out the user if not an admin
      await supabase.auth.signOut()
      return NextResponse.redirect(`${origin}/admin/login?error=${encodeURIComponent('Unauthorized email address. Only designated admin accounts can access this area.')}`)
    }

    // Google auth successful, redirect to PIN entry
    return NextResponse.redirect(`${origin}/admin/login?step=pin`)
  }

  return NextResponse.redirect(`${origin}/admin/login?error=${encodeURIComponent('No code provided')}`)
}
