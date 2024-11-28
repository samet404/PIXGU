import type { UndoInput } from '../types'

export const undoByOperation = ({ undoRedo }: UndoInput) => {
    console.log('before undoByOperation: ', undoRedo.current)
    if (undoRedo.current.madeLastUndoOperation || undoRedo.current.stack.length === 0) return null

    const currentOperationIndex = undoRedo.current.operationIndex;
    const result: [coords: Uint16Array, color: Uint8ClampedArray][] = []
    undoRedo.current.madeLastRedoOperation = false

    // Handle new operation
    if (currentOperationIndex === 0) {
        undoRedo.current.madeLastUndoOperation = true

        for (let groupI = 0; groupI < undoRedo.current.stack[undoRedo.current.operationIndex]!.length; groupI++) {
            for (let undoI = 0; undoI < undoRedo.current.stack[undoRedo.current.operationIndex]![groupI]![0]!.length; undoI++) {
                result.push(undoRedo.current.stack[undoRedo.current.operationIndex]![groupI]![0]![undoI]!)
            }
        }

        return result
    }


    undoRedo.current.madeLastUndoOperation = false


    for (let groupI = 0; groupI < undoRedo.current.stack[undoRedo.current.operationIndex]!.length; groupI++) {
        for (let undoI = 0; undoI < undoRedo.current.stack[undoRedo.current.operationIndex]![groupI]![0]!.length; undoI++) {
            result.push(undoRedo.current.stack[undoRedo.current.operationIndex]![groupI]![0]![undoI]!)
        }
    }


    undoRedo.current.operationIndex--

    console.log('after undoByOperation: ', undoRedo.current)
    return result
}

