import { fillOnePixel } from '@/helpers/room';
import { storePixelHistory } from '@/store';
import type { PrevCanvas } from '@/types/webRTCConnData';
import { useCanvasesMainData } from '@/zustand/store';

export const getPrevCanvas = (data: PrevCanvas['data']) => {
    const { main, cellPixelLength } = useCanvasesMainData.getState()

    storePixelHistory.addRgbsData(data)

    for (const [key, value] of Object.entries(data)) {
        const [x, y] = key.split('_').map((s) => parseInt(s))
        if (x === undefined || y === undefined) continue
        fillOnePixel(main!.getContext('2d')!, x, y, cellPixelLength!, value)
    }
}