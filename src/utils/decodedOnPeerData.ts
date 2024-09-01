import type {
  WebRTCConnDataFromClient,
  WebRTCConnDataFromHost,
} from '@/types/webRTCConnData'
import type SimplePeer from 'simple-peer'

/**
 * Just like default simple-peer `peer.on('data', callback)`, but the data is decoded from a buffer to a string then parsed to json.
 * @param peer The peer to listen to.
 */
export const decodedOnPeerData = <T extends 'fromHost' | 'fromClient'>(
  peer: SimplePeer.Instance,
  callback: (decodedData: DecodedOnPeerData<T>) => void,
) =>
  peer.on('data', (data) =>
    callback(JSON.parse(new TextDecoder('utf-8').decode(data))),
  )

type DecodedOnPeerData<T extends 'fromHost' | 'fromClient'> =
  T extends 'fromHost' ? WebRTCConnDataFromHost : WebRTCConnDataFromClient
