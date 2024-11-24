import type { EraserInput, CanvasWorkerPostMsgData } from '../types';
import { radialPencilPattern } from '../utils/radialPencilPattern';

const COLOR = new Uint8ClampedArray([255, 255, 255, 255])

export const eraser = (input: EraserInput): CanvasWorkerPostMsgData => ({
    e: 'eraser',
    data: radialPencilPattern({
        ...input,
        color: COLOR
    })
}
)