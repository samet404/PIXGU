import type { Ping } from '@/types/webRTCConnData'
import { sendToPeerWithID } from '@/utils/sendToPeerWithID'
import { usePlayersPing } from '@/zustand/store'

export const pong = (data: Ping['data'], userID: string) => {
  const ping = data.ping
  usePlayersPing.getState().set(ping, userID)
  sendToPeerWithID(userID, { event: 'pong', data })
}
