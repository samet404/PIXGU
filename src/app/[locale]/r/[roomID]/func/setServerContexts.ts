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

export const setServerContexts = (
  locale: Locale,
  roomID: string,
  user: User,
) => {
  setIsLogged(true)
  setLocale(locale)
  setRoomID(roomID)
  setUser(user)
  setUserID(user.id)
}
