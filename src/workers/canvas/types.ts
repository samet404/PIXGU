export type BucketInputFromMain = {
    x: number
    y: number
    color: Uint8ClampedArray
}

export type BucketInputFromWorker = {
    cellSideCount: number
    pixels: Uint8ClampedArray[][]
}

export type PencilInputFromMain = {
    startX: number
    startY: number
    size: number
    color: Uint8ClampedArray
}

export type PencilInputFromWorker = {
    cellSideCount: number
    pixels: Uint8ClampedArray[][]
    pixelsOnDraw: Set<`${number},${number}`>
    undoRedo: UndoRedo
    lastPixel: [x: number, y: number] | null

}

export type EraserInputMain = {
    startX: number
    startY: number
    size: number
}

export type EraserInputFromWorker = {
    cellSideCount: number
    pixels: Uint8ClampedArray[][]
    pixelsOnDraw: Set<`${number},${number}`>
    undoRedo: UndoRedo
    lastPixel: [x: number, y: number] | null
}

export type PencilInput = PencilInputFromWorker & PencilInputFromMain
export type BucketInput = BucketInputFromWorker & BucketInputFromMain
export type EraserInput = EraserInputFromWorker & EraserInputMain

export type CanvasWorkerOnMsgData = {
    // bucket
    e: 0
    data: BucketInputFromMain
} | {
    // pencil
    e: 1
    data: PencilInputFromMain
} | {
    // eraser
    e: 2
    data: EraserInputMain
} | {
    // reset
    e: 3
} | {
    // mouseUp
    e: 4
} | {
    // pixels
    e: 5
} | {
    // eyedropper
    e: 6
    data: [x: number, y: number]
} | {
    // getPixels
    e: 7
    data: Uint8ClampedArray[][]
} | {
    // redo
    e: 8
} | {
    // undo
    e: 9
} | {
    // getLastPixel
    e: 10
    data: Uint16Array | null
} | {
    // redo byOperation
    e: 11
} | {
    // undo byOperation
    e: 12
} | {
    // mousedown
    e: 13
    data: [smoothX: number, smoothY: number]
}


export type CanvasWorkerPostMsgData = {
    e: 0
    data: {
        coors: Uint16Array[]
        color: Uint8ClampedArray
    }
} | {
    e: 1
    data: {
        coors: Uint16Array[]
        color: Uint8ClampedArray
    }
} | {
    e: 2
    data: {
        coors: Uint16Array[]
    }
} |
{
    e: 3
}
    | {
        e: 5
        data: Uint8ClampedArray[][]
    }
    | {
        e: 6
        data: Uint8ClampedArray
    } | {
        e: 8
        data: [coor: Uint16Array, color: Uint8ClampedArray][]
    } | {
        e: 9
        data: [coor: Uint16Array, color: Uint8ClampedArray][]
    } | {
        e: 11
        data: [coords: Uint16Array, color: Uint8ClampedArray][][]
    } | {
        e: 12
        data: [coor: Uint16Array, color: Uint8ClampedArray][][]
    }

export type RedoInput = {
    undoRedo: UndoRedo
}

export type UndoInput = {
    undoRedo: UndoRedo
}

// Operation means a set of pixels that are drawn while the mouse is down
export type UndoRedo = {
    current: {
        undoRedoGroup: {
            index: number
            direction: 'u' | 'r'
        }
        operationIndex: number
        stack: [[coords: Uint16Array, color: Uint8ClampedArray][], [coords: Uint16Array, color: Uint8ClampedArray][]][][]
    }
}

