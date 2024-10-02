import type { PainterDrawFromHostAndClient } from '@/types/webRTCConnData'
// import { usePixelHistory } from '@/zustand/store'

export const painterDraw = async (
  data: PainterDrawFromHostAndClient['data'],
  userID: string,
) => {
  const { sendToAllPeers } = await import('@/utils')
  // const { useWhoIsPainter } = await import('@/zustand/store')

  // if (!useWhoIsPainter.getState().isPainter(userID)) {
  //   // TODO
  // }

  const { x, y, rgba } = data
  const { r, g, b, a } = rgba
  // usePixelHistory.getState().add({ x, y, r, g, b, a })

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
