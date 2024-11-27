import type { UndoRedo } from '../types';

// const MAX_UNDO_REDO_STACK = 50;

export const addNewUndoRedoGroup = (undoRedo: UndoRedo) => {
    undoRedo.current.undoRedoGroup.index++
    const operationIndex = undoRedo.current.operationIndex

    undoRedo.current.stack[operationIndex]!.push([[], []])
}

