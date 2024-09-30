import type {
  WebRTCConnDataFromClient,
  WebRTCConnDataFromHost,
} from '@/types/webRTCConnData'
import type SimplePeer from 'simple-peer'

export const onPeerData = <T extends 'fromHost' | 'fromClient'>(
  peer: SimplePeer.Instance,
  callback: (decodedData: OnPeerData<T>) => void,
) =>
  peer.on('data', (data) => {
    callback(JSON.parse(data))
  })

type OnPeerData<T extends 'fromHost' | 'fromClient'> = T extends 'fromHost'
  ? WebRTCConnDataFromHost
  : WebRTCConnDataFromClient
