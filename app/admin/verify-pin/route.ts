import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { pin } = await request.json()

    if (!pin) {
      return NextResponse.json({ error: 'PIN is required' }, { status: 400 })
    }

    // Check PIN against env variable
    if (pin !== process.env.ADMIN_PIN) {
      return NextResponse.json({ error: 'Invalid PIN' }, { status: 401 })
    }

    // Double-check the user is still authenticated and is an admin
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', user.email)
      .eq('is_active', true)
      .single()

    if (adminError || !adminUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    return NextResponse.json({ success: true })

  } catch {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }
}