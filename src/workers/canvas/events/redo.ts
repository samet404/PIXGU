import type { UndoInput } from '../types';

export const redo = ({ undoRedo }: UndoInput) => {
    console.log('redo ', undoRedo.current)
    const currentUndoRedoGroupIndex = undoRedo.current.undoRedoGroup.index


    if (undoRedo.current.undoRedoGroup.direction === 'u') {
        undoRedo.current.undoRedoGroup.direction = 'r'
        return undoRedo.current.stack[undoRedo.current.operationIndex]![currentUndoRedoGroupIndex]![1]!
    }

    else if (undoRedo.current.stack[undoRedo.current.operationIndex]![currentUndoRedoGroupIndex + 1]) {
        undoRedo.current.undoRedoGroup.index++
        undoRedo.current.undoRedoGroup.direction = 'r'
        return undoRedo.current.stack[undoRedo.current.operationIndex]![currentUndoRedoGroupIndex]![1]
    }
    else if (undoRedo.current.stack[undoRedo.current.operationIndex + 1]?.[0]) {
        undoRedo.current.undoRedoGroup.index = 0
        undoRedo.current.undoRedoGroup.direction = 'r'
        undoRedo.current.operationIndex++

        return undoRedo.current.stack[undoRedo.current.operationIndex]![currentUndoRedoGroupIndex]![1]
    }

    return null

}