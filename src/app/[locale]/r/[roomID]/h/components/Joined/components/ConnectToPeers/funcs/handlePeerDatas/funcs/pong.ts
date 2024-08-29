import type { WebRTCConnData } from '@/types/webRTCConnData'

export const pong = (rtcData: WebRTCConnData, userID: string) => {
  const { from, event } = rtcData
  if (event !== 'ping') return

  const { data } = rtcData

  import('@/utils/sendToPeerWithID').then((m) =>
    m.sendToPeerWithID(userID, { event: 'pong', from: 'host', data }),
  )
}
