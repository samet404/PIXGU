import { pencil } from '@/helpers/room';
import type { PainterPencil } from '@/types/webRTCConnData';
import { useCanvasesMainData } from '@/zustand/store';

export const getPainterPencil = (data: PainterPencil['data']) => {
    const { x, y, color, size } = data
    const { dpctx, cellPixelLength, cellSideCount } = useCanvasesMainData.getState()

    pencil(dpctx!, x, y, color, cellPixelLength!, cellSideCount, size)
}