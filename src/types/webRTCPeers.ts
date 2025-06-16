import type PixguPeer from 'simple-peer'

export type Peers = Record<UserID, PeerValue>

type PeerValue = {
  peer: PixguPeer.Instance
  uniqueSocketID: string
}

type UserID = string
