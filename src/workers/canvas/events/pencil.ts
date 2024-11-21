import type { PencilInput, CanvasWorkerPostMsgData } from '../types';
import { radialPencilPattern } from '../utils/radialPencilPattern';

export const pencil = (input: PencilInput): CanvasWorkerPostMsgData => ({
    e: 1,
    data: {
        coors: radialPencilPattern(input),
        color: input.color
    }
})