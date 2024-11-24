import type { UndoInput } from '../types'

export const redoByOperation = ({ undoRedo }: UndoInput) => {
    // Check if there are more operations to redo
    if (undoRedo.current.operationIndex < undoRedo.current.stack.length - 1) {
        // Move to the next operation
        const newOperationIndex = undoRedo.current.operationIndex + 1;

        // Set the undo/redo group to the last group of the next operation
        undoRedo.current.undoRedoGroup.index = undoRedo.current.stack[newOperationIndex]!.length + 1;
        undoRedo.current.undoRedoGroup.direction = 'r';
        undoRedo.current.operationIndex = newOperationIndex;

        const pixelsToBeFilled: [coords: Uint16Array, color: Uint8ClampedArray][] = []
        const operation = undoRedo.current.stack[undoRedo.current.operationIndex]!

        // Get pixels to be filled from the current operation
        for (let opI = 0; opI < operation.length; opI++) {
            console.log('redoGroup', operation[opI]!)
            const redoGroup = operation[opI]![1]!

            for (let redoGroupI = 0; redoGroupI < redoGroup.length; redoGroupI++) {
                pixelsToBeFilled.push(redoGroup[redoGroupI]!)
            }
        }

        // Get the current pixel state from the undo/redo group
        return pixelsToBeFilled
    } else {
        // No more operations to redo
        return null
    }
}