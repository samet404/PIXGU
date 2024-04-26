import type { DatabaseUser } from '@/auth/types'
import type { DataConnection } from 'peerjs'
export type { WebRTCConnData } from './webRTCConnData'

export type User = Omit<DatabaseUser, 'username' | 'usernameID'>

export type Players = Player[]

export type Player = User & {
  peerConn: DataConnection
}
