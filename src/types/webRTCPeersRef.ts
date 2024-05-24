import type { MutableRefObject } from 'react'
import type SimplePeer from 'simple-peer'

export type PeersRef = MutableRefObject<Peers>
export type Peers = Record<UserID, PeerInfo>

type PeerInfo = {
  mySecretKey: SecretKey
  themSecretKey: SecretKey
  peer: SimplePeer.Instance
}

type UserID = string

/**
 * The secret key is used to prevent players behave like other players
 */
type SecretKey = string
