import type { PeersRef, WebRTCConnData } from '@/types'
import { decodedOnPeerData } from '@/utils/decodedOnPeerData'
import { createId } from '@paralleldrive/cuid2'
import type SimplePeer from 'simple-peer'

/**
 * Adds a peer to the peersRef object after a connection is established.
 *
 * @param userID - The user ID of the peer
 * @param peer - The peer connection
 * @param peersRef - The ref object containing the peer connections
 */
export const addPeer = (
  userID: string,
  peer: SimplePeer.Instance,
  peersRef: PeersRef,
) => {
  const mySecretKey = createId()

  decodedOnPeerData(peer, (data) => {
    const connData: WebRTCConnData = JSON.parse(data)

    if (connData.event === 'secretKey') {
      peersRef.current = {
        [userID]: {
          peer,
          mySecretKey,
          themSecretKey: connData.secretKey,
        },
      }
    }
  })

  peer.on('connect', () => {
    const secretKeyData: WebRTCConnData = {
      event: 'secretKey',
      secretKey: mySecretKey,
    }

    peer.send(JSON.stringify(secretKeyData))
  })
}
