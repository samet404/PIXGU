import { bucket, eraser, pencil, redo, redoByOperation, undo, undoByOperation } from './events'
import type { BlurInfo, CanvasWorkerOnMsgData, CanvasWorkerPostMsgData, UndoRedo } from './types'
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
const blurInfo: BlurInfo = {
    blurStack: new Set(),
    hasBlur: false
}

let pixels: Uint8ClampedArray[][] = []
let lastPixel: [x: number, y: number] | null = null
initlizeCanvasPixels(pixels, CELL_SIDE_COUNT)


self.onmessage = (e) => {
    const workerData = e.data as CanvasWorkerOnMsgData

    switch (workerData.e) {
        case 'focus': {
            blurInfo.hasBlur = false

            const blurArray = Array.from(blurInfo.blurStack)
            const pixelsToBeFilled: [coors: Uint16Array, color: Uint8ClampedArray][] = []
            for (let i = 0; i < blurArray.length; i++) {
                if (blurInfo.hasBlur) {
                    postMessage({
                        e: 'focus',
                        data: pixelsToBeFilled
                    } as CanvasWorkerPostMsgData)
                    break
                }

                const value = blurArray[i]
                const [x, y] = value!
                blurInfo.blurStack.delete(value!)
                pixelsToBeFilled.push([new Uint16Array([x!, y!]), pixels[x!]![y!]!])
            }

            postMessage({
                e: 'focus',
                data: pixelsToBeFilled
            } as CanvasWorkerPostMsgData)
            break;
        }
        case 'blur': {
            blurInfo.hasBlur = true
            break
        }
        case 'bucket':

            const bucketData = bucket({
                ...workerData.data,
                cellSideCount: CELL_SIDE_COUNT,
                pixels,
                blurInfo
            }) as CanvasWorkerPostMsgData

            postMessage(bucketData)
            break

        case 'pencil':
            const pencilData = pencil({
                ...workerData.data,
                cellSideCount: CELL_SIDE_COUNT,
                pixels,
                lastPixel,
                pixelsOnDraw,
                undoRedo,
                blurInfo
            }) as CanvasWorkerPostMsgData

            postMessage(pencilData)
            lastPixel = [workerData.data.startX, workerData.data.startY]
            break

        case 'eraser':

            const eraserData = eraser({
                ...workerData.data,
                cellSideCount: CELL_SIDE_COUNT,
                pixels,
                lastPixel,
                pixelsOnDraw,
                undoRedo,
                blurInfo
            }) as CanvasWorkerPostMsgData

            postMessage(eraserData)
            lastPixel = [workerData.data.startX, workerData.data.startY]
            break

        case 'reset':

            pixelsOnDraw.clear()
            lastPixel = null
            initlizeCanvasPixels(pixels, CELL_SIDE_COUNT)
            undoRedo.current = { ...undoRedoInit }
            console.log('worker reset done')
            break

        case 'mouseUp':

            lastPixel = null
            pixelsOnDraw.clear()
            break

        case 'pixels':

            postMessage(pixels)
            break

        case 'eyedropper':

            const [x, y] = workerData.data
            postMessage({
                e: 6,
                data: pixels[x]![y]!
            })
            break

        case 'getPixels':

            pixels = workerData.data
            break

        case 'undo':
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
                    e: 'undo/redo',
                    data: undoPixels
                } as CanvasWorkerPostMsgData)
                break
            }

        case 'redo':
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
                    e: 'undo/redo',
                    data: redoPixels
                } as CanvasWorkerPostMsgData)
                break
            }

        case 'getLastPixel':
            {
                const data = workerData.data
                if (data) {
                    const [x, y] = data
                    lastPixel = [x!, y!]
                } else lastPixel = null
                break;
            }

        case 'undoByOperation':
            {
                // const pixels = undoByOperation({ undoRedo })
                // if (!pixels) break

                // for (let pixelI = 0; pixelI < pixels!.length; pixelI++) {
                //     const pixel = pixels[pixelI]!
                //     const [x, y] = pixel[0]!
                //     const color = pixel[1]!
                //     pixels[x!]![y!]! = color!
                // }

                // self.postMessage({
                //     e: 'undoByOperation',
                //     data: pixels
                // } as CanvasWorkerPostMsgData)

                break
            }

        case 'redoByOperation':
            {
                break
                const ops = redoByOperation({ undoRedo })
                if (!ops) break

                // for (let opsI = 0; opsI < ops.length; opsI++) {
                //     for (let grpI = 0; grpI < ops[opsI]!.length; grpI++) {
                //         const pixel = ops[opsI]![grpI]!
                //         const [x, y] = pixel[0]

                //         pixels[x!]![y!]! = pixel[1]!
                //     }
                // }

                // self.postMessage({
                //     e: 12,
                //     data: ops
                // } as CanvasWorkerPostMsgData)

                break
            }
        case 'mousedown': {
            const data = workerData.data
            undoRedo.current.operationIndex++
            undoRedo.current.stack.push([])
            undoRedo.current.undoRedoGroup.index = -1
            undoRedo.current.undoRedoGroup.direction = 'r'
            mousedown.smooth = data
            console.log('undoRedoMouseDown: ', undoRedo.current)
        }

    }

}


