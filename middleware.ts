// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define which routes should be public
const isPublicRoute = createRouteMatcher([
  '/', 
  '/sign-in(.*)', 
  '/sign-up(.*)',
  '/features',
  '/about', 
  '/contact',
  '/product',
  '/api/webhooks/clerk',
  '/api/razorpay(.*)',
  '/order-success',
  '/api/admin(.*)'  // Add API routes too
])

export default clerkMiddleware(async (auth, request) => {
  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    await auth.protect()
    return
  }
  
  // Protect all other non-public routes
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}