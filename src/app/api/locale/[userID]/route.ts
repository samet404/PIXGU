import type { Locale } from '@/types/locale'

export async function GET(req: Request) {
  const userID = req.url.split('/locale/')[1]
  console.log('locale route userID ', userID)
  if (!userID) return new Response(JSON.stringify(null))

  const redisDb = (await import('@/redis')).redisDb
  const redisLocale = (await redisDb.get(`user:${userID}:locale`)) as Locale

  return new Response(JSON.stringify(redisLocale))
}
