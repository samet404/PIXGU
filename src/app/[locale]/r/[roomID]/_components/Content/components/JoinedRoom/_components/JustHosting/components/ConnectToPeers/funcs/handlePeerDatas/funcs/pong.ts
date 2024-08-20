import type { WebRTCConnData } from '@/types/webRTCConnData'

export const pong = (rtcData: WebRTCConnData, userID: string) => {
  const { from, event, data } = rtcData
  if (event !== 'ping') return

  import('@/utils/sendToPeerWithID').then((m) =>
    m.sendToPeerWithID(userID, { event: 'pong', from: 'host', data }),
  )
}
