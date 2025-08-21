import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory store for demo purposes
const contacts = []

export async function GET(request) {
  const { pathname } = new URL(request.url)
  
  // Handle root API route
  if (pathname === '/api' || pathname === '/api/') {
    return NextResponse.json({ 
      message: 'Sanjay Portfolio API is running!',
      endpoints: {
        'GET /api': 'API status',
        'GET /api/contacts': 'Get all contacts',
        'POST /api/contacts': 'Create new contact'
      }
    })
  }

  // Handle contacts route
  if (pathname === '/api/contacts') {
    return NextResponse.json({ 
      success: true,
      data: contacts,
      count: contacts.length 
    })
  }

  // Handle 404 for unknown routes
  return NextResponse.json(
    { error: 'Route not found' },
    { status: 404 }
  )
}

export async function POST(request) {
  const { pathname } = new URL(request.url)
  
  // Handle contact form submission
  if (pathname === '/api/contacts') {
    try {
      const body = await request.json()
      const { firstName, lastName, email, subject, message } = body

      // Basic validation
      if (!firstName || !lastName || !email || !message) {
        return NextResponse.json(
          { error: 'Missing required fields' },
          { status: 400 }
        )
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Invalid email format' },
          { status: 400 }
        )
      }

      // Create contact entry
      const contact = {
        id: Date.now().toString(),
        firstName,
        lastName,
        email,
        subject: subject || 'No subject',
        message,
        createdAt: new Date().toISOString()
      }

      // Store contact (in a real app, this would go to a database)
      contacts.push(contact)

      return NextResponse.json({
        success: true,
        message: 'Contact form submitted successfully!',
        data: contact
      })
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON data' },
        { status: 400 }
      )
    }
  }

  return NextResponse.json(
    { error: 'Route not found' },
    { status: 404 }
  )
}

export async function PUT(request) {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function DELETE(request) {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}