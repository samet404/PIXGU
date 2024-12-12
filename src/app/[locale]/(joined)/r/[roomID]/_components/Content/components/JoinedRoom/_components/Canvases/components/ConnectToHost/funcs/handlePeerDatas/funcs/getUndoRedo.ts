import type { UndoRedo } from '@/types';
import { postMsgToCanvasWorker } from '@/workers';

export const getUndoRedo = (data: UndoRedo['data']) => {
    const event = data.type === 0 ?
        data.direction === 0 ? 'undoByOperation' : 'redoByOperation' :
        data.type === 1 ? 'redo' : 'undo'

    postMsgToCanvasWorker({
        e: event,
    })
}