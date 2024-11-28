import type { UndoInput } from '../types';

export const undo = ({ undoRedo }: UndoInput) => {
    console.log({ undoRedo: undoRedo.current })
    if (undoRedo.current.undoRedoGroup.madeLastUndoOperation || undoRedo.current.stack.length === 0) return null
    const currentUndoRedoGroupIndex = undoRedo.current.undoRedoGroup.index;

    // Handle new operation
    if (currentUndoRedoGroupIndex === 0) {
        undoRedo.current.undoRedoGroup.madeLastUndoOperation = true
        const result = undoRedo.current.stack[undoRedo.current.operationIndex]?.[currentUndoRedoGroupIndex]?.[0];

        // Check if we can move to previous operation
        if (undoRedo.current.operationIndex > 0) {
            undoRedo.current.undoRedoGroup.madeLastUndoOperation = false
            const newOperationIndex = undoRedo.current.operationIndex - 1;

            // Set to last group of previous operation
            undoRedo.current.undoRedoGroup.index =
                undoRedo.current.stack[newOperationIndex!]!.length - 1;
            undoRedo.current.operationIndex = newOperationIndex;

        }

        return result
    }

    // Handle direction change

    undoRedo.current.undoRedoGroup.madeLastRedoOperation = false
    undoRedo.current.undoRedoGroup.madeLastUndoOperation = false

    // Get current pixel state
    const result = undoRedo.current.stack[undoRedo.current.operationIndex]?.[currentUndoRedoGroupIndex]?.[0];

    // Move to previous group if possible
    if (currentUndoRedoGroupIndex > 0) {
        undoRedo.current.undoRedoGroup.index--
    }

    return result
};
