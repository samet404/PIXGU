import { internationalization } from '@/middlewares'

export default internationalization

export const config = {
  matcher: [
    // match all routes except static files and APIs
    '/((?!api|_next/static|_next/image).*)',
  ],
}
