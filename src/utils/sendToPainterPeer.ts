import type { WebRTCConnData } from '@/types/webRTCConnData'
import { sendToPeerWithID } from './sendToPeerWithID'
import { useWhoIsPainter } from '@/zustand/store/useWhoIsPainter'

export const sendToPainterPeer = (rtcData: WebRTCConnData) => {
  const whoIsPainter = useWhoIsPainter.getState().value

  if (whoIsPainter.status === 'thereIsNoPainter') {
    import('@/utils').then(({ negativeLog }) =>
      negativeLog('Painter ID not found when sending to painter peer'),
    )
    return
  }

  sendToPeerWithID(whoIsPainter.painterID!, rtcData)
}
