import { bucket as runBucket } from '@/helpers/room'
import { useCanvasesMainData, usePainterTool } from '@/zustand/store'

export const bucket = (e: PointerEvent) => {
    const { main, draft_bucket, mctx, dbctx, zoom, cellPixelLength, cellSideCount } =
        useCanvasesMainData.getState()

    const bounding = main!.getBoundingClientRect()
    const exactX = (e.clientX - bounding.left) * zoom
    const exactY = (e.clientY - bounding.top) * zoom
    const smoothX = Math.floor(exactX / cellPixelLength!)
    const smoothY = Math.floor(exactY / cellPixelLength!)
    const rgba = new Uint8ClampedArray(usePainterTool.getState().with.color)

    runBucket(mctx!, dbctx!, draft_bucket!, smoothX, smoothY, cellSideCount, cellPixelLength!, rgba)
}