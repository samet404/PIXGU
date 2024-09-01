import type { Ping } from '@/types/webRTCConnData'

export const pong = (data: Ping['data'], userID: string) => {
  import('@/utils/sendToPeerWithID').then((m) =>
    m.sendToPeerWithID(userID, { event: 'pong', from: 'host', data }),
  )
}
