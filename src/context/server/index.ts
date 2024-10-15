import 'server-only'

import serverContext from 'server-only-context'
import type { Locale } from '@/types'
import type { User } from 'lucia'

export const [getLocale, setLocale] = serverContext<Locale>('en')
export const [getRoomID, setRoomID] = serverContext<string>('')
export const [getUser, setUser] = serverContext<User | null>(null)
export const [getIsLogged, setIsLogged] = serverContext<boolean>(false)
export const [getIsJoined, setIsJoined] = serverContext<boolean>(false)
export const [getUserID, setUserID] = serverContext<string>('')
export const [getHostID, setHostID] = serverContext<string>('')
