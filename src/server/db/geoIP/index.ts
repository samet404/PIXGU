import 'server-only'
import type { MaxmindCity } from '@/types/maxmindCity'
import { pathFromRoot } from '@/utils/server/pathFromRoot'

export const lookupCity = async (IP: string): Promise<MaxmindCity> => {
  const maxmind = await import('maxmind')
  const filePath = pathFromRoot('src/server/db/geoIP/GeoLite2-City.mmdb')
  const city = await maxmind.open(filePath)
  const geoIP = city.get(IP) as MaxmindCity

  return geoIP
}
