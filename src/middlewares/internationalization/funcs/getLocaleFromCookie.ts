import { type NextRequest } from 'next/server'

export const getLocaleFromCookie = (
  req: NextRequest,
  avaibleLocales: string[],
) => {
  const localeCookie = req.cookies.get('locale')?.value
  if (localeCookie && avaibleLocales.includes(localeCookie)) return localeCookie
}
