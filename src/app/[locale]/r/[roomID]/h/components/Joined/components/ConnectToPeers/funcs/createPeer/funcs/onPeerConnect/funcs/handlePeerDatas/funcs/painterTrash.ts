import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers'
import { useHostCanvasesData } from '@/zustand/store/useHostCanvasesData'
import { useWhoIsPainter } from '@/zustand/store/useWhoIsPainter'

const canvasWorker = getCanvasWorker()

export const painterTrash = (userID: string) => {
  if (!useWhoIsPainter.getState().isPainter(userID)) return

  const { mctx } = useHostCanvasesData.getState()

  mctx!.beginPath()
  mctx!.fillStyle = '#ffffff'
  mctx!.fillRect(0, 0, mctx!.canvas.width, mctx!.canvas.height)
  mctx!.closePath()

  canvasWorker.current.postMessage({
    e: 'reset'
  } as CanvasWorkerOnMsgData)

  sendToAllPeers({

    event: 'painterTrash',
  }, {
    except: [userID]
  })
}