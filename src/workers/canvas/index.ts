import { bucket } from './events'
import type { WorkerOnMsgData, BucketInput, EraserInput, PencilInput, WorkerPostMsgData } from './types'

const CELL_SIDE_COUNT = 80
const pixels: Uint8ClampedArray[][] = []
const pixelsOnDraw: [x: number, y: number][] = []

for (let x = 0; x < CELL_SIDE_COUNT; x++) {
    pixels[x] = []
    for (let y = 0; y < CELL_SIDE_COUNT; y++) {
        pixels[x]![y] = new Uint8ClampedArray([255, 255, 255])
    }
}



self.onmessage = (e) => {
    const data = e.data as WorkerOnMsgData

    switch (data.event) {
        case 0:
            postMessage(bucket(data.data))
            break
        case 1:
            pencil(data.data)
            break
        case 2:
            eraser(data.data)
            break
    }
}

