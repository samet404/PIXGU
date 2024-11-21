import type { UndoInput } from '../types'

export const redoByOperation = ({ undoRedo }: UndoInput) => {
    const newOperationIndex = undoRedo.current.operationIndex + 1

    if (!undoRedo.current.stack[newOperationIndex]) return null

    const newOperationLength = undoRedo.current.stack[newOperationIndex].length
    const pixelsToBeFilled: [coords: Uint16Array, color: Uint8ClampedArray][][] = []
    for (let i = 0; i < newOperationLength; i++) {
        pixelsToBeFilled.push(undoRedo.current.stack[newOperationIndex][i]![1]!)
    }

    undoRedo.current.undoRedoGroup.direction = 'r'
    undoRedo.current.undoRedoGroup.index = newOperationLength - 1
    undoRedo.current.operationIndex = newOperationIndex

    return pixelsToBeFilled
}