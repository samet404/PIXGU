import { lastArrIndex } from '@/utils/lastArrIndex';
import type { UndoInput } from '../types'

export const redoByOperation = ({ undoRedo }: UndoInput) => {
    const currentDirection = undoRedo.current.direction;
    const currentOperationIndex = undoRedo.current.operationIndex;
    const result: [coords: Uint16Array, color: Uint8ClampedArray][] = []

    // Handle new operation
    if (lastArrIndex(undoRedo.current.stack) === currentOperationIndex) {
        if (undoRedo.current.madeLastRedoOperation) return null
        undoRedo.current.madeLastRedoOperation = true

        for (let groupI = 0; groupI < undoRedo.current.stack[undoRedo.current.operationIndex]!.length; groupI++) {
            for (let undoI = 0; undoI < undoRedo.current.stack[undoRedo.current.operationIndex]![groupI]![1]!.length; undoI++) {
                result.push(undoRedo.current.stack[undoRedo.current.operationIndex]![groupI]![1]![undoI]!)
            }
        }

        return result
    }

    // Handle direction change
    if (currentDirection === 'r')
        undoRedo.current.direction = 'u';

    if (undoRedo.current.madeLastRedoOperation)
        undoRedo.current.madeLastRedoOperation = false


    for (let groupI = 0; groupI < undoRedo.current.stack[undoRedo.current.operationIndex]!.length; groupI++) {
        for (let undoI = 0; undoI < undoRedo.current.stack[undoRedo.current.operationIndex]![groupI]![1]!.length; undoI++) {
            result.push(undoRedo.current.stack[undoRedo.current.operationIndex]![groupI]![1]![undoI]!)
        }
    }


    // Move to previous group if possible
    if (currentOperationIndex < lastArrIndex(undoRedo.current.stack))
        undoRedo.current.operationIndex++

    return result
}

