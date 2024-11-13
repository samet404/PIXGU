import { pencil as runPencil } from '@/helpers/room'
import { sendToHostPeer } from '@/utils/sendToHostPeer'
import {
    useAmIPainting,
    useCanvasesMainData,
    usePainterTool,
} from '@/zustand/store'

export const pencil = (
    smoothX: number,
    smoothY: number,
) => {
    if (!useAmIPainting.getState().amIPainting) return

    const color = new Uint8ClampedArray(usePainterTool.getState().with.color)
    const { draft_pencil, cellPixelLength, cellSideCount } = useCanvasesMainData.getState().get()
    const dpctx = draft_pencil!.getContext('2d')!
    const size = usePainterTool.getState().options.pencil.size

    const processed = runPencil(smoothX, smoothY)
    sendToHostPeer({
        from: 'client',
        event: 'painterPencil',
        data: {
            x: smoothX,
            y: smoothY,
            color,
            size,
        },
    })
}