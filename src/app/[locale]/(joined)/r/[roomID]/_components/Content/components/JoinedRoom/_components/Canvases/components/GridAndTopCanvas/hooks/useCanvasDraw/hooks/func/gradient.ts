import { storeMouseDownStartAt } from '@/store'
import { useAmIPainting, useCanvasesMainData, usePainterTool } from '@/zustand/store'
import { createGradient } from 'src/helpers/room/createGradient'

export const gradient = (exactX: number, exactY: number) => {
    if (!useAmIPainting.getState().amIPainting) return


    const { dgctx } = useCanvasesMainData.getState()
    const button = useAmIPainting.getState().button
    const color1 = usePainterTool.getState().with[button === 0 ? 'color1' : 'color2']
    const color2 = usePainterTool.getState().with[button === 0 ? 'color2' : 'color1']
    const [startX, startY] = storeMouseDownStartAt.value!.exact

    const gradient = createGradient(dgctx!, startX, startY, color1, exactX, exactY, color2)

    dgctx!.beginPath()
    dgctx!.clearRect(0, 0, dgctx!.canvas.width, dgctx!.canvas.height)
    dgctx!.fillStyle = gradient
    dgctx!.fillRect(
        Math.min(startX, exactX),
        Math.min(startY, exactY),
        Math.abs(exactX - startX),
        Math.abs(exactY - startY)
    )
    dgctx!.closePath()

}