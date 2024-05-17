import 'server-only'

import type { Locale } from '@/types'
import serverContext from 'server-only-context'
import type { User } from 'lucia'

export const [getLocale, setLocale] = serverContext<Locale>('en')
export const [getRoomID, setRoomID] = serverContext<string | null>(null)
export const [getUser, setUser] = serverContext<User | null>(null)
export const [getIsLogged, setIsLogged] = serverContext<boolean>(false)
export const [getUserID, setUserID] = serverContext<string>('')
