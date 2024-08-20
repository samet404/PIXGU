import { decodedOnPeerData, grayLog } from '@/utils'
import { chat } from './funcs/chat'
import { usePeers } from '@/zustand/store'
import { pong } from './funcs/pong'

export const handlePeerDatas = (userID: string) => {
  const peers = usePeers.getState().get()
  decodedOnPeerData(peers[userID]!.peer, (data) => {
    const { from, event } = data
    if (from !== 'client') return null
    grayLog(`RECEIVED ${event} DATA FROM ${userID}`, data)

    chat(data, userID)
    pong(data, userID)
  })
}
