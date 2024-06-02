import type { MutableRefObject } from 'react'
import type SimplePeer from 'simple-peer'

export type PeersRef = MutableRefObject<Peers>
export type Peers = Record<UserID, PeerValue>

type PeerValue = {
  mySecretKey?: SecretKey
  themSecretKey?: SecretKey
  peer?: SimplePeer.Instance
  isPainter?: boolean
}

type UserID = string

/**
 * The secret key is used to prevent players behave like other players
 */
type SecretKey = string
