export type BucketInput = {
    x: number
    y: number
    pixels: Uint8ClampedArray[][]
    cellSideCount: number
}

export type PencilInput = {
    x: number,
    y: number,
    color: Uint8ClampedArray,
    size: number,
}

export type EraserInput = {
    x: number,
    y: number,
    size: number,
}

export type WorkerOnMsgData = {
    // bucket
    event: 0
    data: BucketInput
} | {
    // pencil
    event: 1
    data: PencilInput
} | {
    // eraser
    event: 2
    data: EraserInput
}

export type WorkerPostMsgData = {
    event: 0
    coors: Uint16Array[]
} | {
    event: 1
    coors: Uint16Array[]
} | {
    event: 2
    coors: Uint16Array[]
}
