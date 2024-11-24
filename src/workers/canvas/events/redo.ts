import type { UndoInput } from '../types'

export const redo = ({ undoRedo }: UndoInput) => {
    const currentDirection = undoRedo.current.undoRedoGroup.direction
    const currentUndoRedoGroupIndex = undoRedo.current.undoRedoGroup.index

    // Handle new operation
    if (currentUndoRedoGroupIndex === undoRedo.current.stack[undoRedo.current.operationIndex]!.length - 1) {
        // Check if we can move to previous operation
        if (undoRedo.current.operationIndex < undoRedo.current.stack.length - 1) {
            const newOperationIndex = undoRedo.current.operationIndex + 1

            // Set to last group of previous operation
            undoRedo.current.undoRedoGroup.index =
                undoRedo.current.stack[newOperationIndex]!.length + 1
            undoRedo.current.undoRedoGroup.direction = 'r'
            undoRedo.current.operationIndex = newOperationIndex
        } else
            // No more operations to undo
            return null

    }

    // Handle direction change
    if (currentDirection === 'u')
        undoRedo.current.undoRedoGroup.direction = 'r'


    // Get current pixel state
    const result = undoRedo.current.stack[undoRedo.current.operationIndex]?.[currentUndoRedoGroupIndex]?.[1]

    // Move to previous group if possible
    if (currentUndoRedoGroupIndex > 0)
        undoRedo.current.undoRedoGroup.index++


    return result
}
