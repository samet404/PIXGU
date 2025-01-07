import { usePainterTool, useWhoIsPainterClient } from '@/zustand/store'

export const colorChaos = () => {
    const amIPainter = useWhoIsPainterClient.getState().value.amIPainter
    if (!amIPainter) return

    const color1 = usePainterTool.getState().with.color1
    const color2 = usePainterTool.getState().with.color2

    usePainterTool.getState().setColor(color2)
    usePainterTool.getState().setColor2(color1)
}