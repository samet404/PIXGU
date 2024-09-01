import type { PainterDrawFromHostAndClient } from '@/types/webRTCConnData'

export const painterDraw = async (
  data: PainterDrawFromHostAndClient['data'],
  userID: string,
) => {
  const { sendToAllPeers, sendToPeerWithID } = await import('@/utils')
  const { useWhoIsPainter } = await import('@/zustand/store')

  if (!useWhoIsPainter.getState().isPainter(userID)) {
    sendToPeerWithID(userID, {
      from: 'host',
      event: 'eventBlocked',
      data: {
        event: 'painterDraw',
      },
    })
  }

  const { x, y, rgba } = data

  sendToAllPeers(
    {
      from: 'host',
      event: 'painterDraw',
      data: {
        painterID: userID,
        x,
        y,
        rgba,
      },
    },
    {
      except: [userID],
    },
  )
}
