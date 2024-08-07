import type { MutableRefObject } from 'react'
import type SimplePeer from 'simple-peer'

export type PeersRef = MutableRefObject<Peers>
export type Peers = Record<UserID, PeerValue>

type PeerValue = {
  peer: SimplePeer.Instance
}

type UserID = string

export type HostPeer = {
  peer?: SimplePeer.Instance
}
