import { lastArrIndex } from '@/utils';
import type { UndoRedo } from '../types';

// const MAX_UNDO_REDO_STACK = 50;


// In addNewUndoRedoGroup.ts
export const addNewUndoRedoGroup = (undoRedo: UndoRedo) => {
    console.log('addNewUndoRedoGroup')
    undoRedo.current.undoRedoGroup.index++
    const operationIndex = undoRedo.current.operationIndex
    const undoRedoGroupIndex = undoRedo.current.undoRedoGroup.index


    if (operationIndex !== lastArrIndex(undoRedo.current.stack))
        undoRedo.current.stack.length = operationIndex + 1

    if (undoRedoGroupIndex !== lastArrIndex(undoRedo.current.stack![operationIndex]!))
        undoRedo.current.stack![operationIndex]!.length = undoRedoGroupIndex + 1


    undoRedo.current.stack[operationIndex]!.push([[], []])
}





// In addNewUndoRedoGroup.ts
export const a = (undoRedo: UndoRedo) => {
    const operationIndex = 3
    const undoRedoGroupIndex = 0


    if (operationIndex !== Math.max(0, 4))
        undoRedo.current.stack.length = 3 + 1

    if (undoRedo.current.stack[operationIndex] &&
        undoRedoGroupIndex !== undoRedo.current.stack[operationIndex].length - 1)
        undoRedo.current.stack[operationIndex].length = undoRedoGroupIndex + 1


    undoRedo.current.undoRedoGroup.direction = 'r'
    undoRedo.current.stack[operationIndex]!.push([[], []])
}



