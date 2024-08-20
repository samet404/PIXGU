import type SimplePeer from 'simple-peer'

export type Peers = Record<UserID, PeerValue>

type PeerValue = {
  peer: SimplePeer.Instance
}

type UserID = string
