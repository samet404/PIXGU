import type { UndoInput } from '../types'

export const undoByOperation = ({ undoRedo }: UndoInput) => {

    console.log({ undoRedo: undoRedo.current })
    // No more operations to undo
    if (undoRedo.current.operationIndex <= -1) return null

    const operationIndex = undoRedo.current.operationIndex
    const pixelsToBeFilled: [coords: Uint16Array, color: Uint8ClampedArray][] = []
    const operation = undoRedo.current.stack[operationIndex]!

    // Get pixels to be filled from the current operation
    for (let opI = 0; opI < operation.length; opI++) {
        console.log('redoGroup', operation[opI]!)
        const redoGroup = operation[opI]![0]!

        for (let redoGroupI = 0; redoGroupI < redoGroup.length; redoGroupI++) {
            pixelsToBeFilled.push(redoGroup[redoGroupI]!)
        }
    }

    const newOperationIndex = operationIndex - 1
    undoRedo.current.undoRedoGroup.index = undoRedo.current.stack[newOperationIndex]!.length - 1
    undoRedo.current.undoRedoGroup.direction = 'r'
    undoRedo.current.operationIndex = newOperationIndex;

    // Get the current pixel state from the undo/redo group
    return pixelsToBeFilled;
}