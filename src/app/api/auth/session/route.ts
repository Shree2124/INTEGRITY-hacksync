import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'auth_session';
const MAX_AGE = 60 * 60 * 24 * 14; // 14 days

/**
 * POST /api/auth/session
 * Set authentication session cookie
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    // Verify token is a valid JWT format (basic check)
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      return NextResponse.json(
        { error: 'Invalid token format' },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();

    // Set the session cookie
    cookieStore.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: MAX_AGE,
      path: '/',
    });

    return NextResponse.json(
      { message: 'Session created successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error creating session:', error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/auth/session
 * Clear authentication session cookie
 */
export async function DELETE() {
  try {
    const cookieStore = await cookies();

    // Delete the session cookie
    cookieStore.delete(SESSION_COOKIE_NAME);

    return NextResponse.json(
      { message: 'Session cleared successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error clearing session:', error);
    return NextResponse.json(
      { error: 'Failed to clear session' },
      { status: 500 }
    );
  }
}
