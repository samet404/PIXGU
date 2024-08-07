import { decodedOnPeerData, grayLog } from '@/utils'
import type SimplePeer from 'simple-peer'
import { chat } from './funcs/chat'
import type { Peers } from '@/types'

export const handlePeerDatas = (
  peer: SimplePeer.Instance,
  peers: Peers,
  userID: string,
) => {
  decodedOnPeerData(peer, (data) => {
    const { from, event } = data
    if (from !== 'client') return null
    grayLog(`RECEIVED ${event} DATA FROM ${userID}`, data)

    chat(data, peers, userID)
  })
}
