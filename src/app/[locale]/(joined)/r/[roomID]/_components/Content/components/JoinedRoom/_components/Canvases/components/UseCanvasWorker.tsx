"use client"

import { clearAndPasteToMainCanvas, fillOnePixel } from '@/helpers/room'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { grayLog } from '@/utils/grayLog'
import { getCanvasWorker, terminateCanvasWorker, type CanvasWorkerPostMsgData } from '@/workers'
import { useCanvasesMainData, usePainterTool } from '@/zustand/store'

export const UseCanvasWorker = () => {

    useEffectOnce(() => {
        const canvasWorker = getCanvasWorker()

        canvasWorker.current.onmessage = (e) => {
            const workerData = e.data as CanvasWorkerPostMsgData

            switch (workerData.e) {
                case 0:

                    {
                        grayLog('BUCKET WORKER DONE', e.data)
                        const { dbctx, cellPixelLength, mctx } = useCanvasesMainData.getState()
                        const { color, coors } = workerData.data

                        grayLog('BUCKET WORKER DONE', workerData)

                        for (const coord of coors) {
                            fillOnePixel(dbctx!, coord[0]!, coord[1]!, cellPixelLength!, color)
                        }
                        clearAndPasteToMainCanvas(dbctx!, mctx!)
                    }
                    break

                case 1:

                    {
                        const { color, coors } = workerData.data
                        const { dpctx, cellPixelLength } = useCanvasesMainData.getState()

                        if (workerData.e !== 1) return

                        for (let i = 0; i < coors.length; i++) {
                            fillOnePixel(dpctx!, coors[i]![0]!, coors[i]![1]!, cellPixelLength!, color)
                        }
                    }
                    break

                case 2:

                    {
                        grayLog('ERASER WORKER DONE', e.data)
                        const { dpctx, cellPixelLength } = useCanvasesMainData.getState()
                        const { coors } = workerData.data

                        for (let i = 0; i < coors.length; i++) {
                            fillOnePixel(dpctx!, coors[i]![0]!, coors[i]![1]!, cellPixelLength!, new Uint8ClampedArray([255, 255, 255, 255]))
                        }
                    }
                    break

                case 6:

                    const data = workerData.data
                    usePainterTool.getState().setColor(
                        [data[0]!, data[1]!, data[2]!, 255]
                    )
                    break

                case 8:

                    {
                        const { dpctx, mctx, cellPixelLength } = useCanvasesMainData.getState()
                        const pixels = workerData.data

                        console.log('by pixels undo', pixels)

                        for (let i = 0; i < pixels.length; i++) {
                            const pixel = pixels[i]!
                            // Instead of pixel[0], use the coords object directly
                            const coords = pixel[0]
                            const color = pixel[1]

                            fillOnePixel(
                                dpctx!,
                                coords[0]!, // x coordinate
                                coords[1]!, // y coordinate
                                cellPixelLength!,
                                color
                            )
                        }

                        clearAndPasteToMainCanvas(dpctx!, mctx!)
                        break
                    }

                case 9:

                    {
                        const { dpctx, cellPixelLength, mctx } = useCanvasesMainData.getState()
                        const pixels = workerData.data

                        console.log('by pixels redo', pixels)

                        console.log('redo', pixels)
                        for (let i = 0; i < pixels.length; i++) {
                            const pixel = pixels[i]!
                            const coord = pixel[0]!

                            fillOnePixel(dpctx!, coord[0]!, coord[1]!, cellPixelLength!, pixel[1])
                        }

                        clearAndPasteToMainCanvas(dpctx!, mctx!)
                        break
                    }


                case 11:
                    {
                        const { dpctx, cellPixelLength, mctx } = useCanvasesMainData.getState()
                        const ops = workerData.data


                        for (let opsI = 0; opsI < ops.length; opsI++) {
                            for (let groupI = 0; groupI < ops[opsI]!.length; groupI++) {
                                const pixel = ops[opsI]![groupI]!
                                const [x, y] = pixel[0]!
                                const color = pixel[1]!
                                fillOnePixel(dpctx!, x!, y!, cellPixelLength!, color)
                            }
                        }

                        clearAndPasteToMainCanvas(dpctx!, mctx!)
                        break
                    }
                case 12:
                    {
                        const { dpctx, cellPixelLength, mctx } = useCanvasesMainData.getState()
                        const pixels = workerData.data

                        console.log('by operation redo', pixels)

                        console.log('redo', pixels)
                        for (let i = 0; i < pixels.length; i++) {
                            for (let j = 0; j < pixels[i]!.length; j++) {
                                const pixel = pixels[i]![j]!
                                const coord = pixel[0]!

                                fillOnePixel(dpctx!, coord[0]!, coord[1]!, cellPixelLength!, pixel[1])
                            }
                        }

                        clearAndPasteToMainCanvas(dpctx!, mctx!)
                        break
                    }
            }
        }

        return () => {
            terminateCanvasWorker()
        }
    })

    return null
}