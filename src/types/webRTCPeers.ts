import type PixguPeer from '@/pixgu-peer/types'

export type Peers = Record<UserID, PeerValue>

type PeerValue = {
  peer: PixguPeer.Instance
  uniqueSocketID: string
}

type UserID = string
