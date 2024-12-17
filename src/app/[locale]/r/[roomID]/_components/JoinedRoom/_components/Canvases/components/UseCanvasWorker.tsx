"use client"

import { fillOnePixel } from '@/helpers/room'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { getCanvasWorker, terminateCanvasWorker, type CanvasWorkerPostMsgData } from '@/workers'
import { useCanvasesMainData, usePainterTool } from '@/zustand/store'

export const UseCanvasWorker = () => {

    useEffectOnce(() => {
        const canvasWorker = getCanvasWorker()

        canvasWorker.current.onmessage = (e) => {
            const workerData = e.data as CanvasWorkerPostMsgData

            switch (workerData.e) {
                case 'focus': {
                    const { cellPixelLength, mctx } = useCanvasesMainData.getState()

                    for (let i = 0; i < workerData.data.length; i++) {
                        const [coors, color] = workerData.data[i]!
                        fillOnePixel(mctx!, coors[0]!, coors[1]!, cellPixelLength!, color)
                    }
                    break
                }
                case 'bucket':

                    {
                        const { cellPixelLength, mctx } = useCanvasesMainData.getState()

                        for (let i = 0; i < workerData.data.length; i++) {
                            const [coors, color] = workerData.data[i]!
                            fillOnePixel(mctx!, coors[0]!, coors[1]!, cellPixelLength!, color)
                        }
                        break
                    }
                case 'pencil':
                    {
                        const { mctx, cellPixelLength } = useCanvasesMainData.getState()


                        for (let i = 0; i < workerData.data.length; i++) {
                            const [coors, color] = workerData.data[i]!
                            fillOnePixel(mctx!, coors[0]!, coors[1]!, cellPixelLength!, color)
                        }
                    }
                    break

                case 'eraser':

                    {
                        const { mctx, cellPixelLength } = useCanvasesMainData.getState()

                        for (let i = 0; i < workerData.data.length; i++) {
                            const [coors, color] = workerData.data[i]!
                            fillOnePixel(mctx!, coors[0]!, coors[1]!, cellPixelLength!, color)
                        }
                    }
                    break

                case 'eyedropper':

                    const data = workerData.data
                    usePainterTool.getState().setColor(
                        [data[0]!, data[1]!, data[2]!, 255]
                    )
                    break

                case 'undo-redo':
                    {
                        const { cellPixelLength, mctx } = useCanvasesMainData.getState()
                        for (let i = 0; i < workerData.data.length; i++) {
                            const [coors, color] = workerData.data[i]!
                            fillOnePixel(mctx!, coors[0]!, coors[1]!, cellPixelLength!, color)
                        }
                        break
                    }

                case 'clear-canvas': {
                    const { mctx } = useCanvasesMainData.getState()
                    mctx!.fillStyle = '#ffffff'
                    mctx!.fillRect(0, 0, mctx!.canvas.width, mctx!.canvas.height)
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