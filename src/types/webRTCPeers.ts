import type SimplePeer from 'simple-peer'

export type Peers = Record<UserID, PeerValue>

type PeerValue = {
  peer: SimplePeer.Instance
  uniqueSocketID: string
}

type UserID = string
