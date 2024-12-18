import type { UndoInput } from '../types'

export const undoByOperation = ({ undoRedo }: UndoInput) => {
    // if we are at the first operation or there is no undo operation to undo, exit
    if (undoRedo.current.madeLastUndoOperation || undoRedo.current.stack.length === 0) return

    const result: [coords: Uint16Array, color: Uint8ClampedArray][] = []
    // currentOperationIndex to apply the current undo operation
    const currentOperationIndex = undoRedo.current.operationIndex;

    if (currentOperationIndex === -1) {
        // push all the color and coords to result
        for (let groupI = 0; groupI < undoRedo.current.stack[0]!.length; groupI++) {
            for (let undoI = 0; undoI < undoRedo.current.stack[0]![groupI]![0].length; undoI++) {
                result.push(undoRedo.current.stack[0]![groupI]![0][undoI]!)
            }
        }

        undoRedo.current.madeLastUndoOperation = true
        return result
    }

    undoRedo.current.madeLastRedoOperation = false
    undoRedo.current.madeLastUndoOperation = false
    undoRedo.current.operationIndex--


    // push all the color and coords to result
    for (let groupI = 0; groupI < undoRedo.current.stack[currentOperationIndex]!.length; groupI++) {
        for (let undoI = 0; undoI < undoRedo.current.stack[currentOperationIndex]![groupI]![0].length; undoI++) {
            result.push(undoRedo.current.stack[currentOperationIndex]![groupI]![0][undoI]!)
        }
    }

    // undo successful
    return result
}

