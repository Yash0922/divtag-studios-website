import { NextResponse } from 'next/server';
import { z } from 'zod';
import { contactFormSchema } from '@/lib/validations';

/**
 * POST /api/contact
 * 
 * Handles contact form submissions
 * Validates: Requirements 5.2, 5.3
 */
export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate with Zod schema
    const validatedData = contactFormSchema.parse(body);
    
    // Log form submission in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log('Contact form submission:', validatedData);
    }
    
    // In production: Send email via service (SendGrid, Resend, etc.) or save to database
    // For now, we just log and return success
    
    // Return success response (200)
    return NextResponse.json({
      success: true,
      message: "Thank you for contacting us. We'll get back to you soon."
    }, { status: 200 });
    
  } catch (error) {
    // Handle Zod validation errors (400)
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid form data',
        details: error.issues
      }, { status: 400 });
    }
    
    // Handle unexpected server errors (500)
    console.error('Contact form error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to process request. Please try again.'
    }, { status: 500 });
  }
}

/**
 * Handle non-POST requests
 * Returns 405 Method Not Allowed
 * Validates: Requirements 5.2
 */
export async function GET() {
  return NextResponse.json({
    error: 'Method not allowed'
  }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({
    error: 'Method not allowed'
  }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({
    error: 'Method not allowed'
  }, { status: 405 });
}

export async function PATCH() {
  return NextResponse.json({
    error: 'Method not allowed'
  }, { status: 405 });
}
