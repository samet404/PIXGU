export const isPublicPage = (path: string): boolean => (
    path === '/' ||
    path.startsWith('/login') ||
    path.startsWith('/privacy') ||
    path.startsWith('/r')
)
