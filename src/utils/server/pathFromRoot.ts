import 'server-only'
import { env } from '@/env/server'
/**
 * This is a helper function to get the path from the root folder without absolute path.
 *
 * @path - The path starts inside from repo root folder.
 * @example
 * pathFromRoot('src/server/db/geoIP/GeoLite2-City.mmdb')
 * returns:
 * '...rootfolders/src/server/db/geoIP/GeoLite2-City.mmdb'
 */
export const pathFromRoot = (path: string) => {
  const rootFolderName = env.ROOT_FOLDER_NAME
  return `${__dirname.split(rootFolderName)[0] + rootFolderName}/${path}`
}
