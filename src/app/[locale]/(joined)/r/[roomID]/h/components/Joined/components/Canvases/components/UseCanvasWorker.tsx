"use client"

import { fillOnePixel } from '@/helpers/room'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { grayLog } from '@/utils/grayLog'
import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { getCanvasWorker, terminateCanvasWorker, type CanvasWorkerPostMsgData } from '@/workers'
import { useHostCanvasesData, useWhoIsPainter } from '@/zustand/store'

export const UseCanvasWorker = () => {

    useEffectOnce(() => {
        const canvasWorker = getCanvasWorker()

        canvasWorker.current.onmessage = (e) => {
            const workerData = e.data as CanvasWorkerPostMsgData

            switch (workerData.e) {
                case 0: {
                    grayLog('BUCKET WORKER DONE', e.data)
                    const { dbctx, cellPixelLength } = useHostCanvasesData.getState()
                    const { color, coors } = workerData.data

                    grayLog('BUCKET WORKER DONE', workerData)

                    console.log('started bucket ', color)
                    for (const coord of coors) {
                        fillOnePixel(dbctx!, coord[0]!, coord[1]!, cellPixelLength!, color)
                    }
                }
                    break

                case 1: {
                    const { color, coors } = workerData.data
                    const { dbctx, cellPixelLength } = useHostCanvasesData.getState()

                    if (workerData.e !== 1) return

                    for (let i = 0; i < coors.length; i++) {
                        fillOnePixel(dbctx!, coors[i]![0]!, coors[i]![1]!, cellPixelLength!, color)
                    }
                }
                    break
                case 2: {
                    grayLog('ERASER WORKER DONE', e.data)
                    const { dbctx, cellPixelLength } = useHostCanvasesData.getState()
                    const { coors } = workerData.data

                    for (let i = 0; i < coors.length; i++) {
                        fillOnePixel(dbctx!, coors[i]![0]!, coors[i]![1]!, cellPixelLength!, new Uint8ClampedArray([255, 255, 255, 255]))
                    }
                }
                    break

                case 3: {
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
                default:
                    break
            }
        }

        return () => {
            terminateCanvasWorker()
        }
    })

    return null
}