import type { PixelHistoryStoreValueHistory, PixelsOnDrawStoreValue } from '@/store'

export type WorkerOnMsgData = {
    smoothX: number
    smoothY: number
    cellSideCount: number
    size: number
    color: Uint8ClampedArray
    rgbsData: PixelHistoryStoreValueHistory['rgb']
    pixelsOnDraw: PixelsOnDrawStoreValue['value']
    lastPixel: [x: number, y: number] | null
}

export type WorkerPostMsgData = {
    pixelsToBeFilled: Uint16Array[]
    rgbsData: PixelHistoryStoreValueHistory['rgb']
    pixelsOnDraw: PixelsOnDrawStoreValue['value']
}