import { postMsgToCanvasWorker } from '@/workers'
import { useCanvasesMainData } from '@/zustand/store/useCanvasesMainData'

export const trash = () => {
    const { mctx } = useCanvasesMainData.getState().get()
    postMsgToCanvasWorker({ e: 'reset' })

    mctx!.beginPath()
    mctx!.fillStyle = '#ffffff'
    mctx!.fillRect(0, 0, mctx!.canvas.width, mctx!.canvas.height)
    mctx!.closePath()

}