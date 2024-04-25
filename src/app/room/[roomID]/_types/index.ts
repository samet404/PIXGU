import type { DatabaseUser } from '@/auth/types'
export type { WebRTCConnData } from './webRTCConnData'

export type User = Omit<DatabaseUser, 'username' | 'usernameID'>
