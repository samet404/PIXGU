import { lastArrIndex } from '@/utils/lastArrIndex';
import type { UndoInput } from '../types'

export const redoByOperation = ({ undoRedo }: UndoInput) => {
    // if we are at the first operation or there is no redo operation to undo, exit
    if (undoRedo.current.madeLastRedoOperation || undoRedo.current.stack.length === 0) return null

    // we are redoing now so madeLastUndoOperation is false
    undoRedo.current.madeLastUndoOperation = false

    // check if we are at  the last operation index
    if (undoRedo.current.operationIndex === lastArrIndex(undoRedo.current.stack)) {
        undoRedo.current.madeLastRedoOperation = true
    }
    // if we are not at the last operation, increase operation index
    else {
        undoRedo.current.madeLastRedoOperation = false
        undoRedo.current.operationIndex++
    }

    // currentOperationIndex to apply the current undo operation
    const currentOperationIndex = undoRedo.current.operationIndex;

    const result: [coords: Uint16Array, color: Uint8ClampedArray][] = []

    try {
        // push all the color and coords to result
        for (let groupI = 0; groupI < undoRedo.current.stack[currentOperationIndex]!.length; groupI++) {
            const group = undoRedo.current.stack[currentOperationIndex]![groupI]!
            if (!group) console.log('no group: ', group)
            if (!group) console.log('no group because i guess because of this: ', typeof undoRedo.current.stack[currentOperationIndex])
            // [1] means reddo part of the group
            for (let redoI = 0; redoI < group[1].length; redoI++) {
                result.push(undoRedo.current.stack[currentOperationIndex]![groupI]![1][redoI]!)
            }
        }

    } catch (error) {
        console.error('Error at returning result: ', error, undoRedo.current, { currentOperationIndex })
    }

    // successful
    return result
}

