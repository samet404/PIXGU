import { storePixelHistory, storePixelsOnDraw } from '@/store'

export const trash = (main: HTMLCanvasElement, draft_pencil: HTMLCanvasElement, draft_bucket: HTMLCanvasElement, mctx: CanvasRenderingContext2D, dpctx: CanvasRenderingContext2D, dbctx: CanvasRenderingContext2D,) => {
    mctx!.beginPath()
    mctx!.fillStyle = '#ffffff'
    mctx!.fillRect(0, 0, main!.width, main!.height)
    dbctx.beginPath()
    dbctx.clearRect(0, 0, draft_bucket!.width, draft_bucket!.height)
    dpctx.beginPath()
    dpctx.clearRect(0, 0, draft_pencil!.width, draft_pencil!.height)

    storePixelHistory.reset()
    storePixelsOnDraw.reset()
}