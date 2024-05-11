import type SimplePeer from 'simple-peer'

/**
 * Just like default simple-peer `peer.on('data', callback)`, but the data is decoded from a buffer to a string.
 * @param peer The peer to listen to.
 */
export const decodedOnPeerData = (
  peer: SimplePeer.Instance,
  // eslint-disable-next-line no-unused-vars
  callback: (decodedData: any) => void,
) => {
  peer.on('data', (data) => {
    const newData = new TextDecoder('utf-8').decode(data)
    callback(newData)
  })
}
