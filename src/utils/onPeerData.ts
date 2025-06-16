import type {
  WebRTCConnDataFromClient,
  WebRTCConnDataFromHost,
} from '@/types/webRTCConnData'
import type PixguPeer from 'simple-peer'
import { AES, enc } from 'crypto-js'

export const onPeerData = <T extends 'fromHost' | 'fromClient'>(
  peer: PixguPeer.Instance,
  secretKey: string,
  callback: (decodedData: OnPeerData<T>) => void,
) => {
  peer.on('data', (encryptedData) => {
    const decryptedDataBytes = AES.decrypt(encryptedData, secretKey)
    const decyptedData = decryptedDataBytes.toString(enc.Utf8)
    const JSONData = JSON.parse(decyptedData)

    callback(JSONData)
  })
}
type OnPeerData<T extends 'fromHost' | 'fromClient'> = T extends 'fromHost'
  ? WebRTCConnDataFromHost
  : WebRTCConnDataFromClient
