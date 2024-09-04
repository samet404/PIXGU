import 'server-only'

import {
  setIsLogged,
  setLocale,
  setUser,
  setUserID,
  setRoomID,
} from '@/context/server'
import type { Locale } from '@/types'
import type { User } from 'lucia'

export const setServerContexts = async (
  locale: Locale,
  roomID: string,
  user: User,
  hostID?: string,
) => {
  setIsLogged(true)
  setLocale(locale)
  setUser(user)
  setRoomID(roomID)
  setUserID(user.id)
  if (hostID) await import('@/context/server').then((m) => m.setHostID(hostID))
}
