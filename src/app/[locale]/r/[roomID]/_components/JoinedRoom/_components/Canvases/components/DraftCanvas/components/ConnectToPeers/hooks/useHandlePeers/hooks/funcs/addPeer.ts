import type { Peers, WebRTCConnData } from '@/types'
import type SimplePeer from 'simple-peer'
import { decodedOnPeerData } from '@/utils/decodedOnPeerData'
import { createId } from '@paralleldrive/cuid2'

/**
 * Adds a peer to the peersRef object after a connection is established.
 */
export const addPeer = (
  userID: string,
  peers: Peers,
  peer: SimplePeer.Instance,
) => {
  const mySecretKey = createId()

  decodedOnPeerData(peer, (data) => {
    const connData: WebRTCConnData = JSON.parse(data)

    if (connData.event === 'secretKey') {
      peers[userID] = {
        peer,
        mySecretKey,
        themSecretKey: connData.secretKey,
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
