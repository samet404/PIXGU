export type BucketInputFromMain = {
    x: number
    y: number
    color: Uint8ClampedArray
}

export type BucketInputFromWorker = {
    cellSideCount: number
    pixels: Uint8ClampedArray[][]
    undoRedo: UndoRedo
    blurInfo: BlurInfo

}

export type PencilInputFromMain = {
    startX: number
    startY: number
    size: number
    color: Uint8ClampedArray
}

export type PencilInputFromWorker = {
    invisiblePencil: InvisiblePencil
    cellSideCount: number
    pixels: Uint8ClampedArray[][]
    pixelsOnDraw: Set<`${number},${number}`>
    undoRedo: UndoRedo
    lastPixel: [x: number, y: number] | null
    blurInfo: BlurInfo
}

export type EraserInputMain = {
    startX: number
    startY: number
    size: number
}

export type EraserInputFromWorker = {
    invisiblePencil: InvisiblePencil
    cellSideCount: number
    pixels: Uint8ClampedArray[][]
    pixelsOnDraw: Set<`${number},${number}`>
    undoRedo: UndoRedo
    lastPixel: [x: number, y: number] | null
    blurInfo: BlurInfo
}

export type PencilInput = PencilInputFromWorker & PencilInputFromMain
export type BucketInput = BucketInputFromWorker & BucketInputFromMain
export type EraserInput = EraserInputFromWorker & EraserInputMain

export type CanvasWorkerOnMsgData = {
    e: 'bucket'
    data: BucketInputFromMain
} | {
    e: 'pencil'
    data: PencilInputFromMain
} | {
    e: 'eraser'
    data: EraserInputMain
} | {
    e: 'reset'
} | {
    e: 'mouseUp'
} | {
    e: 'pixels'
} | {
    e: 'eyedropper'
    data: [x: number, y: number]
} | {
    e: 'getPixels'
    data: Uint8ClampedArray[][]
} | {
    e: 'redo'
} | {
    e: 'undo'
} | {
    e: 'getLastPixel'
    data: Uint16Array | null
} | {
    e: 'redoByOperation'
} | {
    e: 'undoByOperation'
} | {
    e: 'mousedown'
    data: [smoothX: number, smoothY: number]
} | {
    e: 'focus'
} | {
    e: 'blur'
} | {
    e: 'pencilIsInvisible'
} | {
    e: 'pencilIsVisible'
}


export type CanvasWorkerPostMsgData =
    {
        e: 'bucket'
        data: [coor: Uint16Array, color: Uint8ClampedArray][]
    } | {
        e: 'pencil'
        data: [coor: Uint16Array, color: Uint8ClampedArray][]
    } | {
        e: 'eraser'
        data: [coor: Uint16Array, color: Uint8ClampedArray][]

    } |
    {
        e: 'focus'
        data: [coor: Uint16Array, color: Uint8ClampedArray][]
    }
    |
    {
        e: 'reset'
    }
    | {
        e: 'pixels'
        data: Uint8ClampedArray[][]
    }
    | {
        e: 'eyedropper'
        data: Uint8ClampedArray
    } | {
        e: 'undo-redo'
        data: [coor: Uint16Array, color: Uint8ClampedArray][]
    } | {
        e: 'clear-canvas'
    } | {
        e: 'invisiblePencilStack'
        data: [coor: Uint16Array, color: Uint8ClampedArray][]
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
            madeLastUndoOperation: boolean
            madeLastRedoOperation: boolean
        }
        madeLastUndoOperation: boolean
        madeLastRedoOperation: boolean
        operationIndex: number
        stack: [[coords: Uint16Array, color: Uint8ClampedArray][], [coords: Uint16Array, color: Uint8ClampedArray][]][][]
    }
}


export type BlurInfo = {
    blurStack: Set<[number, number]>
    hasBlur: boolean
}

export type InvisiblePencil = {
    stack: Set<[number, number]>
    hasInvisiblePencil: boolean
}
