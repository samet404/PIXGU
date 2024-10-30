import { useCanvasesMainData, usePixelHistory } from '@/zustand/store'

export const addToHistory = (x: number, y: number) => {
    const { main, cellPixelLength } = useCanvasesMainData.getState()
    if (!main || !cellPixelLength) return

    const mctx = main.getContext('2d')!
    const newX = Math.floor(cellPixelLength * x)
    const newY = Math.floor(cellPixelLength * y)
    const pixel = mctx.getImageData(x, y, 1, 1)
    const data = pixel.data

    usePixelHistory.getState().add({
        x: newX,
        y: newY,
        rgba: [data[0]!, data[1]!, data[2]!, data[3]!],
        tool: 'pencil'
    })
}