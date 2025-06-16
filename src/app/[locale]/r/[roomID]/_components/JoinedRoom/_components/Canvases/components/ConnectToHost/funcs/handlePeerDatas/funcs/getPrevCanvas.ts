import { fillOnePixel } from '@/helpers/room';
import type { PrevCanvas } from '@/types/webRTCConnData';
import { useCanvasesMainData } from '@/zustand/store/useCanvasesMainData';

export const getPrevCanvas = (data: PrevCanvas['data']) => {
    const { main, cellPixelLength } = useCanvasesMainData.getState()

    for (let x = 0; x < data.length; x++) {
        for (let y = 0; y < data[x]!.length; y++) {
            fillOnePixel(main!.getContext('2d')!, x, y, cellPixelLength!, data[x]![y]!)
        }
    }
}