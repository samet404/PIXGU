import type { UndoInput } from '../types'

export const redo = ({ undoRedo }: UndoInput) => {
    console.log({ undoRedo: undoRedo.current })
    const currentDirection = undoRedo.current.undoRedoGroup.direction;
    const currentUndoRedoGroupIndex = undoRedo.current.undoRedoGroup.index;
    const currentOperation = undoRedo.current.stack[undoRedo.current.operationIndex];

    // Handle new operation
    if (currentUndoRedoGroupIndex === currentOperation!.length - 1) {
        if (undoRedo.current.undoRedoGroup.madeLastRedoOperation) return null
        undoRedo.current.undoRedoGroup.madeLastRedoOperation = true
        const result = undoRedo.current.stack[undoRedo.current.operationIndex]?.[currentUndoRedoGroupIndex]?.[1];

        // Check if we can move to next operation
        if (undoRedo.current.operationIndex < undoRedo.current.stack.length - 1) {
            undoRedo.current.undoRedoGroup.madeLastRedoOperation = false
            const newOperationIndex = undoRedo.current.operationIndex + 1;

            // Set to first group of next operation
            undoRedo.current.undoRedoGroup.index = 0;
            undoRedo.current.operationIndex = newOperationIndex;

            if (currentDirection === 'u')
                undoRedo.current.undoRedoGroup.direction = 'r';
        }

        return result
    }

    // Handle direction change
    if (currentDirection === 'u')
        undoRedo.current.undoRedoGroup.direction = 'r';

    if (undoRedo.current.undoRedoGroup.madeLastRedoOperation)
        undoRedo.current.undoRedoGroup.madeLastRedoOperation = false

    // Get current pixel state
    const result = undoRedo.current.stack[undoRedo.current.operationIndex]?.[currentUndoRedoGroupIndex]?.[1];

    // Move to next group if possible
    if (currentUndoRedoGroupIndex < currentOperation!.length - 1) {
        undoRedo.current.undoRedoGroup.index++
    }

    return result
};