export const isPublicPath = (pathname: string): boolean => {
  const publicPaths = [
    '/ads.txt',
    '/image/',
    '/sound',
    '/favicon',
    '/robots.txt',
    '/_next',
    '/api',
  ]
  return publicPaths.some((path) => pathname.startsWith(path))
}