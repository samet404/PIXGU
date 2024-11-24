import { lastArrIndex } from '@/utils';
import type { UndoRedo } from '../types';

// const MAX_UNDO_REDO_STACK = 50;

export const addNewUndoRedoGroup = (undoRedo: UndoRedo) => {
    undoRedo.current.undoRedoGroup.index++
    const operationIndex = undoRedo.current.operationIndex
    const undoRedoGroupIndex = undoRedo.current.undoRedoGroup.index

    if (undoRedoGroupIndex !== lastArrIndex(undoRedo.current.stack![operationIndex]!))
        undoRedo.current.stack![operationIndex]!.length = undoRedoGroupIndex + 1


    undoRedo.current.stack[operationIndex]!.push([[], []])
}

