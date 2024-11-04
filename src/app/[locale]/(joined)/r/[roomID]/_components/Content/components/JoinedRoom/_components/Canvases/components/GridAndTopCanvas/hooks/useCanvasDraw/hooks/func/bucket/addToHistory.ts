import { storePixelHistory } from '@/store'
import { useCanvasesMainData } from '@/zustand/store'

export const addToHistory = (pixel: ImageData, x: number, y: number) => {
    const { main, cellPixelLength } = useCanvasesMainData.getState()
    if (!main || !cellPixelLength) return

    const data = pixel.data

    storePixelHistory.add({
        x,
        y,
        rgba: data,
        tool: 'bucket'
    })
}