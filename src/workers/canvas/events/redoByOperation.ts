import { lastArrIndex } from '@/utils/lastArrIndex';
import type { UndoInput } from '../types'

export const redoByOperation = ({ undoRedo }: UndoInput) => {
    if (undoRedo.current.madeLastUndoOperation || undoRedo.current.stack.length === 0) return null

    const currentOperationIndex = undoRedo.current.operationIndex;
    const result: [coords: Uint16Array, color: Uint8ClampedArray][] = []
    undoRedo.current.madeLastUndoOperation = false

    // Handle new operation
    if (currentOperationIndex === lastArrIndex(undoRedo.current.stack)) {
        undoRedo.current.madeLastRedoOperation = true

        for (let groupI = 0; groupI < undoRedo.current.stack[undoRedo.current.operationIndex]!.length; groupI++) {
            for (let undoI = 0; undoI < undoRedo.current.stack[undoRedo.current.operationIndex]![groupI]![1]!.length; undoI++) {
                result.push(undoRedo.current.stack[undoRedo.current.operationIndex]![groupI]![1]![undoI]!)
            }
        }

        return result
    }


    undoRedo.current.madeLastRedoOperation = false


    for (let groupI = 0; groupI < undoRedo.current.stack[undoRedo.current.operationIndex]!.length; groupI++) {
        for (let undoI = 0; undoI < undoRedo.current.stack[undoRedo.current.operationIndex]![groupI]![1]!.length; undoI++) {
            result.push(undoRedo.current.stack[undoRedo.current.operationIndex]![groupI]![1]![undoI]!)
        }
    }


    undoRedo.current.operationIndex++

    return result
}

