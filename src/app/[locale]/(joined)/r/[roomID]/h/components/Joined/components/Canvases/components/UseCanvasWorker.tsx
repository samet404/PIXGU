"use client"

import { fillOnePixel } from '@/helpers/room'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { getCanvasWorker, terminateCanvasWorker, type CanvasWorkerPostMsgData } from '@/workers'
import { useHostCanvasesData, useWhoIsPainter } from '@/zustand/store'

export const UseCanvasWorker = () => {

    useEffectOnce(() => {
        const canvasWorker = getCanvasWorker()

        canvasWorker.current.onmessage = (e) => {
            const workerData = e.data as CanvasWorkerPostMsgData

            switch (workerData.e) {
                case 'focus': {
                    const { mctx, cellPixelLength } = useHostCanvasesData.getState()

                    for (let i = 0; i < workerData.data.length; i++) {
                        const [coors, color] = workerData.data[i]!
                        fillOnePixel(mctx!, coors[0]!, coors[1]!, cellPixelLength!, color)
                    }
                    break
                }
                case 'bucket': {
                    const { mctx, cellPixelLength } = useHostCanvasesData.getState()

                    for (let i = 0; i < workerData.data.length; i++) {
                        const [coors, color] = workerData.data[i]!
                        fillOnePixel(mctx!, coors[0]!, coors[1]!, cellPixelLength!, color)
                    }
                }
                    break

                case 'pencil': {
                    const { mctx, cellPixelLength } = useHostCanvasesData.getState()

                    for (let i = 0; i < workerData.data.length; i++) {
                        const [coors, color] = workerData.data[i]!
                        fillOnePixel(mctx!, coors[0]!, coors[1]!, cellPixelLength!, color)
                    }
                }
                    break
                case 'eraser': {
                    const { mctx, cellPixelLength } = useHostCanvasesData.getState()

                    for (let i = 0; i < workerData.data.length; i++) {
                        const [coors, color] = workerData.data[i]!
                        fillOnePixel(mctx!, coors[0]!, coors[1]!, cellPixelLength!, color)
                    }

                    break
                }

                case 'reset': {
                    const value = useWhoIsPainter.getState().value
                    const painterID = 'painterID' in value ? value.painterID : null
                    if (!painterID) return

                    sendToAllPeers({

                        event: 'painterTrash',
                    }, {
                        except: [painterID]
                    })
                }
                    break


                case 'undo/redo':

                    {
                        const { mctx, cellPixelLength } = useHostCanvasesData.getState()

                        for (let i = 0; i < workerData.data.length; i++) {
                            const [coors, color] = workerData.data[i]!
                            fillOnePixel(mctx!, coors[0]!, coors[1]!, cellPixelLength!, color)
                        }
                    }

            }
        }

        return () => {
            terminateCanvasWorker()
        }
    })

    return null
}



