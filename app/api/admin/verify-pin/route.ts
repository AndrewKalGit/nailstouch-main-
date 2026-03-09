import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const { pin } = await request.json()

    if (!pin) {
      return NextResponse.json({ error: 'PIN is required' }, { status: 400 })
    }

    const supabase = await createClient()
    
    // Get the current user from Google OAuth session
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: 'Not authenticated. Please sign in with Google first.' }, { status: 401 })
    }

    // Check if this user is an admin and verify PIN
    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', user.email)
      .eq('is_active', true)
      .single()

    if (adminError || !adminUser) {
      return NextResponse.json({ error: 'Unauthorized. Your account is not registered as an admin.' }, { status: 403 })
    }

    // Verify PIN
    if (adminUser.pin_code !== pin) {
      return NextResponse.json({ error: 'Invalid PIN. Please try again.' }, { status: 401 })
    }

    // Set admin verified cookie
    const cookieStore = await cookies()
    cookieStore.set('admin_verified', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8, // 8 hours
      path: '/',
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('PIN verification error:', error)
    return NextResponse.json({ error: 'An error occurred during verification' }, { status: 500 })
  }
}
