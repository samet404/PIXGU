import {
    useAmIPainting,
    useCanvasesMainData,
    usePainterTool,
} from '@/zustand/store'
import { eraser as runEraser } from '@/helpers/room'

export const eraser = (
    smoothX: number,
    smoothY: number,
) => {
    if (!useAmIPainting.getState().amIPainting) return

    const { draft_pencil, cellPixelLength, cellSideCount } = useCanvasesMainData.getState().get()
    const dpctx = draft_pencil!.getContext('2d')!
    const size = usePainterTool.getState().options.pencil.size

    runEraser(dpctx, smoothX, smoothY, cellPixelLength!, cellSideCount, size)
}