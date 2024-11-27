import type { UndoInput } from '../types'

export const undoByOperation = ({ undoRedo }: UndoInput) => {
    const currentDirection = undoRedo.current.direction;
    const currentOperationIndex = undoRedo.current.operationIndex;
    const result: [coords: Uint16Array, color: Uint8ClampedArray][] = []

    // Handle new operation
    if (currentOperationIndex === 0) {
        if (undoRedo.current.madeLastUndoOperation) return null
        undoRedo.current.madeLastUndoOperation = true

        for (let groupI = 0; groupI < undoRedo.current.stack[undoRedo.current.operationIndex]!.length; groupI++) {
            for (let undoI = 0; undoI < undoRedo.current.stack[undoRedo.current.operationIndex]![groupI]![0]!.length; undoI++) {
                result.push(undoRedo.current.stack[undoRedo.current.operationIndex]![groupI]![0]![undoI]!)
            }
        }

        return result
    }

    // Handle direction change
    if (currentDirection === 'r')
        undoRedo.current.direction = 'u';

    if (undoRedo.current.madeLastUndoOperation)
        undoRedo.current.madeLastUndoOperation = false

    // Get current pixel state


    for (let groupI = 0; groupI < undoRedo.current.stack[undoRedo.current.operationIndex]!.length; groupI++) {
        for (let undoI = 0; undoI < undoRedo.current.stack[undoRedo.current.operationIndex]![groupI]![0]!.length; undoI++) {
            result.push(undoRedo.current.stack[undoRedo.current.operationIndex]![groupI]![0]![undoI]!)
        }
    }


    // Move to previous group if possible
    if (currentOperationIndex > 0)
        undoRedo.current.operationIndex--

    return result
}

