import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, businessName, industry, solutions, features } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !businessName || !industry || !solutions || !features) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', email)
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing user:', checkError)
      return NextResponse.json(
        { error: 'Database error' },
        { status: 500 }
      )
    }

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered for waitlist' },
        { status: 409 }
      )
    }

    // Insert new waitlist entry
    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          business_name: businessName,
          industry: industry,
          solutions: solutions,
          features: features,
        }
      ])
      .select()

    if (error) {
      console.error('Error inserting waitlist entry:', error)
      return NextResponse.json(
        { error: 'Failed to save waitlist entry' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        message: 'Successfully added to waitlist',
        data: data[0]
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
