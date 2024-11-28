import type { UndoInput } from '../types'

export const redo = ({ undoRedo }: UndoInput) => {
    if (undoRedo.current.undoRedoGroup.madeLastRedoOperation || undoRedo.current.stack.length === 0) return null

    const currentUndoRedoGroupIndex = undoRedo.current.undoRedoGroup.index;
    const currentOperation = undoRedo.current.stack[undoRedo.current.operationIndex];

    // Handle new operation
    if (currentUndoRedoGroupIndex === currentOperation!.length - 1) {
        undoRedo.current.undoRedoGroup.madeLastRedoOperation = true
        const result = undoRedo.current.stack[undoRedo.current.operationIndex]?.[currentUndoRedoGroupIndex]?.[1];

        // Check if we can move to next operation
        if (undoRedo.current.operationIndex < undoRedo.current.stack.length - 1) {
            undoRedo.current.undoRedoGroup.madeLastRedoOperation = false
            const newOperationIndex = undoRedo.current.operationIndex + 1;

            // Set to first group of next operation
            undoRedo.current.undoRedoGroup.index = 0;
            undoRedo.current.operationIndex = newOperationIndex;

        }

        return result
    }

    undoRedo.current.undoRedoGroup.madeLastUndoOperation = false
    undoRedo.current.undoRedoGroup.madeLastRedoOperation = false

    // Get current pixel state
    const result = undoRedo.current.stack[undoRedo.current.operationIndex]?.[currentUndoRedoGroupIndex]?.[1];

    undoRedo.current.undoRedoGroup.index++

    return result
};