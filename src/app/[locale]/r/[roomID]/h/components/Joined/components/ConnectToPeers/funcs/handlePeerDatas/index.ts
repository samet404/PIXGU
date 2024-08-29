import { decodedOnPeerData, grayLog } from '@/utils'
import { chat } from './funcs/chat'
import { usePeers } from '@/zustand/store'
import { pong } from './funcs/pong'
import { painterDraw } from './funcs/painterDraw'
import { getSelectedTheme } from './funcs/getSelectedTheme'

export const handlePeerDatas = (userID: string) => {
  const peers = usePeers.getState().get()
  decodedOnPeerData(peers[userID]!.peer, (data) => {
    const { from, event } = data
    if (from !== 'client') return null
    grayLog(`RECEIVED ${event} DATA FROM ${userID}`, data)

    getSelectedTheme(data, userID)
    painterDraw(data, userID)
    chat(data, userID)
    pong(data, userID)
  })
}
