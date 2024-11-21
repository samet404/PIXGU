import { bucket, eraser, pencil, redo, redoByOperation, undo, undoByOperation } from './events'
import type { CanvasWorkerOnMsgData, CanvasWorkerPostMsgData, UndoRedo } from './types'
import { initlizeCanvasPixels } from './utils/initlizeCanvasPixels'

const CELL_SIDE_COUNT = 80
const undoRedoInit: UndoRedo['current'] = {
    operationIndex: -1,
    undoRedoGroup: {
        direction: 'r',
        index: -1
    },
    stack: []
}
const undoRedo: UndoRedo = {
    current: { ...undoRedoInit }
}
const mousedown: {
    smooth: [smoothX: number, smoothY: number] | null
} = {
    smooth: null
}


const pixelsOnDraw: Set<`${number},${number}`> = new Set()
let pixels: Uint8ClampedArray[][] = []
let lastPixel: [x: number, y: number] | null = null
initlizeCanvasPixels(pixels, CELL_SIDE_COUNT)

self.onmessage = (e) => {
    const workerData = e.data as CanvasWorkerOnMsgData
    console.log('worker onmessage: ', workerData)

    switch (workerData.e) {
        case 0:

            const bucketData = bucket({
                ...workerData.data,
                cellSideCount: CELL_SIDE_COUNT,
                pixels,
            }) as CanvasWorkerPostMsgData
            console.log('worker bucketData: ', bucketData)

            postMessage(bucketData)
            break

        case 1:
            const pencilData = pencil({
                ...workerData.data,
                cellSideCount: CELL_SIDE_COUNT,
                pixels,
                lastPixel,
                pixelsOnDraw,
                undoRedo,
            }) as CanvasWorkerPostMsgData
            console.log('undoRedoPencil: ', undoRedo.current)


            postMessage(pencilData)
            lastPixel = [workerData.data.startX, workerData.data.startY]
            break

        case 2:

            const eraserData = eraser({
                ...workerData.data,
                cellSideCount: CELL_SIDE_COUNT,
                pixels,
                lastPixel,
                pixelsOnDraw,
                undoRedo
            }) as CanvasWorkerPostMsgData

            postMessage(eraserData)
            lastPixel = [workerData.data.startX, workerData.data.startY]
            break

        case 3:

            pixelsOnDraw.clear()
            lastPixel = null
            initlizeCanvasPixels(pixels, CELL_SIDE_COUNT)
            undoRedo.current = { ...undoRedoInit }
            console.log('worker reset done')
            break

        case 4:

            lastPixel = null
            pixelsOnDraw.clear()
            break

        case 5:

            postMessage(pixels)
            break

        case 6:

            const [x, y] = workerData.data
            postMessage({
                e: 6,
                data: pixels[x]![y]!
            })
            break

        case 7:

            pixels = workerData.data
            break

        case 8:
            {
                const undoPixels = undo({ undoRedo })
                if (!undoPixels) return

                for (let i = 0; i < undoPixels.length; i++) {
                    const pixel = undoPixels[i]!
                    const [x, y] = pixel[0]!
                    const [r, g, b, a] = pixel[1]!
                    pixels[x!]![y!]! = new Uint8ClampedArray([r!, g!, b!, a!])
                }

                postMessage({
                    e: 8,
                    data: undoPixels
                } as CanvasWorkerPostMsgData)
                break
            }

        case 9:
            {
                const redoPixels = redo({ undoRedo })
                if (!redoPixels) return

                for (let i = 0; i < redoPixels.length; i++) {
                    const pixel = redoPixels[i]!
                    const [x, y] = pixel[0]!
                    const [r, g, b, a] = pixel[1]!
                    pixels[x!]![y!]! = new Uint8ClampedArray([r!, g!, b!, a!])
                }

                postMessage({
                    e: 9,
                    data: redoPixels
                } as CanvasWorkerPostMsgData)
                break
            }

        case 10:
            {
                const data = workerData.data
                if (data) {
                    const [x, y] = data
                    lastPixel = [x!, y!]
                } else lastPixel = null
                break;
            }

        case 11:
            {
                const ops = undoByOperation({ undoRedo })
                console.log('undoByOperation: ', ops)
                if (!ops) break

                for (let opsI = 0; opsI < ops.length; opsI++) {
                    for (let groupI = 0; groupI < ops[opsI]!.length; groupI++) {
                        const pixel = ops[opsI]![groupI]!
                        const [x, y] = pixel[0]!
                        const color = pixel[1]!
                        pixels[x!]![y!]! = color!
                    }
                }

                self.postMessage({
                    e: 11,
                    data: ops
                } as CanvasWorkerPostMsgData)

                break
            }

        case 12:
            {
                const ops = redoByOperation({ undoRedo })
                if (!ops) break

                for (let opsI = 0; opsI < ops.length; opsI++) {
                    for (let grpI = 0; grpI < ops[opsI]!.length; grpI++) {
                        const pixel = ops[opsI]![grpI]!
                        const [x, y] = pixel[0]

                        pixels[x!]![y!]! = pixel[1]!
                    }
                }

                self.postMessage({
                    e: 12,
                    data: ops
                } as CanvasWorkerPostMsgData)

                break
            }
        case 13: {
            const data = workerData.data
            undoRedo.current.operationIndex++
            undoRedo.current.undoRedoGroup.index = -1
            undoRedo.current.undoRedoGroup.direction = 'r'
            undoRedo.current.stack.push([])
            mousedown.smooth = data
            console.log('undoRedoMouseDown: ', undoRedo.current)
        }

    }

}


