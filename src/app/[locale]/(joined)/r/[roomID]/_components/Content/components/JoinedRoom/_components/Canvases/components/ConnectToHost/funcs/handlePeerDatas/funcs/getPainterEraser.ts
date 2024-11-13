import { eraser } from '@/helpers/room'
import type { PainterEraser } from '@/types/webRTCConnData'
import { useCanvasesMainData } from '@/zustand/store'

export const getPainterEraser = (data: PainterEraser['data']) => {
    const { x, y, size } = data
    const { dpctx, cellPixelLength, cellSideCount } = useCanvasesMainData.getState()

    eraser(dpctx!, x, y, cellPixelLength!, cellSideCount, size)
}