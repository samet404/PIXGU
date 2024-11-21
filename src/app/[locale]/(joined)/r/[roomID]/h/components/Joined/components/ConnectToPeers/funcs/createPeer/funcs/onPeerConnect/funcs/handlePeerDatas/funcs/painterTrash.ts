import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers'
import { useHostCanvasesData, useWhoIsPainter } from '@/zustand/store'

const canvasWorker = getCanvasWorker()

export const painterTrash = (userID: string) => {
  if (!useWhoIsPainter.getState().isPainter(userID)) return

  const { mctx, main, dbctx, dpctx } = useHostCanvasesData.getState()

  mctx!.beginPath()
  mctx!.fillStyle = '#ffffff'
  mctx!.fillRect(0, 0, main!.width, main!.height)
  mctx!.closePath()
  dpctx!.clearRect(0, 0, dpctx!.canvas.width, dpctx!.canvas.height)
  dbctx!.clearRect(0, 0, dbctx!.canvas.width, dbctx!.canvas.height)

  canvasWorker.current.postMessage({
    e: 3
  } as CanvasWorkerOnMsgData)

  sendToAllPeers({

    event: 'painterTrash',
  }, {
    except: [userID]
  })
}