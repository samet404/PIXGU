import { lastArrIndex } from '@/utils/lastArrIndex'
import { bucket, eraser, pencil, redo, redoByOperation, undo, undoByOperation } from './events'
import type { BlurInfo, CanvasWorkerOnMsgData, CanvasWorkerPostMsgData, UndoRedo } from './types'
import { initlizeCanvasPixels } from './utils/initlizeCanvasPixels'
// import { stringifiedLog } from '@/utils'

const CELL_SIDE_COUNT = 80

const undoRedoInit: UndoRedo['current'] = {
    operationIndex: -1,
    madeLastUndoOperation: false,
    madeLastRedoOperation: false,
    undoRedoGroup: {
        madeLastUndoOperation: false,
        madeLastRedoOperation: false,
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

const pixelsOnDraw = new Set<`${number},${number}`>()
const blurInfo: BlurInfo = {
    blurStack: new Set(),
    hasBlur: false
}

let pixels: Uint8ClampedArray[][] = []
let lastPixel: [x: number, y: number] | null = null


self.onmessage = (e) => {
    const workerData = e.data as CanvasWorkerOnMsgData
    if (pixels.length === 0) initlizeCanvasPixels(pixels, CELL_SIDE_COUNT)
    console.log('worker received event: ', workerData.e)


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
                pixelsToBeFilled.push([new Uint16Array([x, y]), pixels[x]![y]!])
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
        case 'bucket': {
            const bucketData = bucket({
                ...workerData.data,
                cellSideCount: CELL_SIDE_COUNT,
                pixels,
                blurInfo,
                undoRedo
            })

            postMessage(bucketData)
            // stringifiedLog({
            //     name: 'after bucket',
            //     ...undoRedo.current,
            //     stack: undoRedo.current.stack.map(arr => arr.length)
            // })
            break
        }

        case 'pencil': {
            const pencilData = pencil({
                ...workerData.data,
                cellSideCount: CELL_SIDE_COUNT,
                pixels,
                lastPixel,
                pixelsOnDraw,
                undoRedo,
                blurInfo
            })

            postMessage(pencilData)
            lastPixel = [workerData.data.startX, workerData.data.startY]
            // stringifiedLog({
            //     name: 'after pencil',
            //     ...undoRedo.current,
            //     stack: undoRedo.current.stack.map(arr => arr.length)
            // })
            break
        }
        case 'eraser': {

            const eraserData = eraser({
                ...workerData.data,
                cellSideCount: CELL_SIDE_COUNT,
                pixels,
                lastPixel,
                pixelsOnDraw,
                undoRedo,
                blurInfo
            })

            // stringifiedLog({
            //     name: 'after eraser',
            //     ...undoRedo.current,
            //     stack: undoRedo.current.stack.map(arr => arr.length)
            // })
            postMessage(eraserData)
            lastPixel = [workerData.data.startX, workerData.data.startY]
            break
        }

        case 'reset':

            pixelsOnDraw.clear()
            lastPixel = null
            blurInfo.blurStack.clear()
            blurInfo.hasBlur = false
            initlizeCanvasPixels(pixels, CELL_SIDE_COUNT)
            undoRedo.current = {
                ...undoRedoInit,
                stack: []
            }
            mousedown.smooth = null
            console.log('worker reset done')
            break

        case 'mouseUp':

            lastPixel = null
            pixelsOnDraw.clear()
            break

        case 'pixels':

            postMessage(pixels)
            break

        case 'eyedropper': {
            const [x, y] = workerData.data
            postMessage({
                e: 'eyedropper',
                data: pixels[x]![y]!
            })
            break
        }

        case 'getPixels':

            pixels = workerData.data
            break

        case 'undo':
            {
                const undoPixels = undo({ undoRedo })
                if (!undoPixels) return

                console.log('undo: ', undoPixels)

                for (let i = 0; i < undoPixels.length; i++) {
                    const pixel = undoPixels[i]!
                    const [x, y] = pixel[0]
                    const [r, g, b, a] = pixel[1]
                    pixels[x!]![y!] = new Uint8ClampedArray([r!, g!, b!, a!])
                }

                // stringifiedLog({
                //     name: 'after undo',
                //     ...undoRedo.current,
                //     stack: undoRedo.current.stack.map(arr => arr.length)
                // })
                postMessage({
                    e: 'undo-redo',
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
                    const [x, y] = pixel[0]
                    const [r, g, b, a] = pixel[1]
                    pixels[x!]![y!] = new Uint8ClampedArray([r!, g!, b!, a!])
                }

                // stringifiedLog({
                //     name: 'after redo',
                //     ...undoRedo.current,
                //     stack: undoRedo.current.stack.map(arr => arr.length)
                // })
                postMessage({
                    e: 'undo-redo',
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
                // stringifiedLog({
                //     name: 'before undoByOperation',
                //     ...undoRedo.current,
                //     stack: undoRedo.current.stack.map(arr => arr.length)
                // })

                const undoPixels = undoByOperation({ undoRedo })
                if (!undoPixels) break
                if (typeof undoPixels === 'number') {
                    self.postMessage({
                        e: 'clear-canvas'
                    } as CanvasWorkerPostMsgData)
                    break
                }

                for (let i = 0; i < undoPixels.length; i++) {
                    const pixel = undoPixels[i]!
                    const [x, y] = pixel[0]
                    const [r, g, b, a] = pixel[1]
                    pixels[x!]![y!] = new Uint8ClampedArray([r!, g!, b!, a!])
                }

                // stringifiedLog({
                //     name: 'after undoByOperation',
                //     ...undoRedo.current,
                //     stack: undoRedo.current.stack.map(arr => arr.length)
                // })

                postMessage({
                    e: 'undo-redo',
                    data: undoPixels
                } as CanvasWorkerPostMsgData)
                break
            }

        case 'redoByOperation':
            {
                // stringifiedLog({
                //     name: 'before redoByOperation',
                //     ...undoRedo.current,
                //     stack: undoRedo.current.stack.map(arr => arr.length)
                // })

                const redoPixels = redoByOperation({ undoRedo })
                if (!redoPixels) break

                for (let i = 0; i < redoPixels.length; i++) {
                    const pixel = redoPixels[i]!
                    const [x, y] = pixel[0]
                    const [r, g, b, a] = pixel[1]
                    pixels[x!]![y!] = new Uint8ClampedArray([r!, g!, b!, a!])
                }

                // stringifiedLog({
                //     name: 'after redoByOperation',
                //     ...undoRedo.current,
                //     stack: undoRedo.current.stack.map(arr => arr.length)
                // })

                postMessage({
                    e: 'undo-redo',
                    data: redoPixels
                } as CanvasWorkerPostMsgData)
                break
            }
        case 'mousedown': {
            // stringifiedLog({
            //     name: 'before mousedown',
            //     ...undoRedo.current,
            //     stack: undoRedo.current.stack.map(arr => arr.length)
            // })
            const data = workerData.data

            if (undoRedo.current.operationIndex === -1) {
                undoRedo.current = {
                    ...undoRedoInit,
                    stack: []
                }
            }
            else if (undoRedo.current.operationIndex >= 0) {
                const currentOperationIndex = undoRedo.current.operationIndex

                // check if the operation index is the last operation index
                if (undoRedo.current.operationIndex !== lastArrIndex(undoRedo.current.stack)) {
                    console.log('oI: not last')
                    // stringifiedLog({
                    //     name: 'before oI',
                    //     ...undoRedo.current,
                    //     stack: undoRedo.current.stack.map(arr => arr.length)
                    // })
                    // undoRedo.current.stack.length = undoRedo.current.operationIndex + 1 // delete  after operationIndex
                    // stringifiedLog({
                    //     name: 'after oI',
                    //     ...undoRedo.current,
                    //     stack: undoRedo.current.stack.map(arr => arr.length)
                    // })
                }
                if (undoRedo.current.undoRedoGroup.index !== lastArrIndex(undoRedo.current.stack[currentOperationIndex]!)) {
                    console.log('urgI: not last')
                    // stringifiedLog({
                    //     name: 'before urgI',
                    //     ...undoRedo.current,
                    //     stack: undoRedo.current.stack.map(arr => arr.length)
                    // })
                    // undoRedo.current.stack[currentOperationIndex]!.length = undoRedo.current.undoRedoGroup.index + 1                 // delete after undoRedoGroup.index
                    // stringifiedLog({
                    //     name: 'after urgI',
                    //     ...undoRedo.current,
                    //     stack: undoRedo.current.stack.map(arr => arr.length)
                    // })
                }
            }

            undoRedo.current.undoRedoGroup.index = -1
            undoRedo.current.madeLastRedoOperation = true
            undoRedo.current.madeLastUndoOperation = false
            undoRedo.current.undoRedoGroup.madeLastUndoOperation = false
            undoRedo.current.undoRedoGroup.madeLastRedoOperation = true
            undoRedo.current.stack.push([])
            undoRedo.current.operationIndex++
            mousedown.smooth = data

            // stringifiedLog({
            //     name: 'after mousedown',
            //     ...undoRedo.current,
            //     stack: undoRedo.current.stack.map(arr => arr.length),
            // })
        }

    }

}


