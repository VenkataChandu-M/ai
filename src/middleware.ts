import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Only run Supabase session logic if credentials are configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (supabaseUrl && supabaseKey) {
    const { updateSession } = await import('@/lib/supabase/middleware')
    return await updateSession(request)
  }

  // No Supabase configured — passthrough for demo/hackathon mode
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
