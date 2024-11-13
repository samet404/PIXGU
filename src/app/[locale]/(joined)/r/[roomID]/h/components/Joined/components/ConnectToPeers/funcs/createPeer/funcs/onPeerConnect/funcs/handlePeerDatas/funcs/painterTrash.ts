import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { useHostCanvasesData, useWhoIsPainter } from '@/zustand/store'

export const painterTrash = (userID: string) => {
  if (!useWhoIsPainter.getState().isPainter(userID)) return

  const { mctx, main } = useHostCanvasesData.getState()

  mctx!.beginPath()
  mctx!.fillStyle = '#ffffff'
  mctx!.fillRect(0, 0, main!.width, main!.height)
  mctx!.closePath()

  sendToAllPeers({
    from: 'host',
    event: 'painterTrash',
  }, {
    except: [userID]
  })
}