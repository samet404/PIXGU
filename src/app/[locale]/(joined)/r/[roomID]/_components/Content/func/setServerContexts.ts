import 'server-only'

import {
  setIsLogged,
  setLocale,
  setUser,
  setUserID,
  setRoomID,
  setGuestID,
  setIsGuest,
  setGuest,
} from '@/context/server'
import type { Guest, Locale } from '@/types'
import type { User } from 'lucia'

export const setServerContexts = async (
  locale: Locale,
  roomID: string,
  user: User | null,
  guest: Guest | null,
  isGuest: boolean,
) => {
  setIsLogged(true)
  setLocale(locale)
  setUser(user)
  setRoomID(roomID)
  setUserID(user?.id ?? '')
  setGuest(guest)
  setGuestID(guest?.ID ?? '')
  isGuest ? setIsGuest(true) : setIsGuest(false)
}
