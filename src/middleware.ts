export { default } from 'next-auth/middleware'

// https://nextjs.org/docs/app/building-your-application/routing/middleware
export const config = {
  matcher: '/room/:path*',
}
