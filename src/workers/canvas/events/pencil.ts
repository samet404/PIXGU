import type { PencilInput, CanvasWorkerPostMsgData } from '../types';
import { radialPencilPattern } from '../utils/radialPencilPattern';

export const pencil = (input: PencilInput): CanvasWorkerPostMsgData => ({
    e: 'pencil',
    data: radialPencilPattern(input)
})