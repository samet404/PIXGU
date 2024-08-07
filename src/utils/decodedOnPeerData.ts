import type { WebRTCConnData } from '@/types/webRTCConnData'
import type SimplePeer from 'simple-peer'

/**
 * Just like default simple-peer `peer.on('data', callback)`, but the data is decoded from a buffer to a string then parsed to json.
 * @param peer The peer to listen to.
 */
export const decodedOnPeerData = (
  peer: SimplePeer.Instance,
  callback: (decodedData: WebRTCConnData) => void,
) =>
  peer.on('data', (data) =>
    callback(JSON.parse(new TextDecoder('utf-8').decode(data))),
  )
