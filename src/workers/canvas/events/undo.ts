import type { UndoInput } from '../types';

export const undo = ({ undoRedo }: UndoInput) => {
    const currentUndoRedoGroupIndex = undoRedo.current.undoRedoGroup.index
    console.log('undo called: ', undoRedo.current)

    if (undoRedo.current.undoRedoGroup.direction === 'r') {
        undoRedo.current.undoRedoGroup.direction = 'u'
        return undoRedo.current.stack[undoRedo.current.operationIndex]![currentUndoRedoGroupIndex]![0]!
    }

    else if (undoRedo.current.stack[undoRedo.current.operationIndex]![currentUndoRedoGroupIndex]) {
        if (undoRedo.current.stack[undoRedo.current.operationIndex]![currentUndoRedoGroupIndex - 1]) {
            undoRedo.current.undoRedoGroup.index--
            undoRedo.current.undoRedoGroup.direction = 'u'
        }
        return undoRedo.current.stack[undoRedo.current.operationIndex]![currentUndoRedoGroupIndex]![0]
    }
    else if (undoRedo.current.stack[undoRedo.current.operationIndex - 1]?.[0]) {
        undoRedo.current.undoRedoGroup.index = 0
        undoRedo.current.undoRedoGroup.direction = 'u'
        undoRedo.current.operationIndex--

        return undoRedo.current.stack[undoRedo.current.operationIndex]![currentUndoRedoGroupIndex]![0]
    }

    return null

}