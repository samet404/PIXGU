import type { UndoInput } from '../types'

export const undoByOperation = ({ undoRedo }: UndoInput) => {
    const operationIndex = undoRedo.current.operationIndex

    if (!undoRedo.current.stack[operationIndex]) return null
    console.log('undoByOperation: ', undoRedo.current.stack[operationIndex])

    const operationIndexLength = undoRedo.current.stack[operationIndex]!.length
    const pixelsToBeFilled = undoRedo.current.stack[operationIndex]

    undoRedo.current.undoRedoGroup.direction = 'r'
    undoRedo.current.undoRedoGroup.index = undoRedo.current.stack[operationIndex - 1] ? undoRedo.current.stack[operationIndex - 1]!.length - 1 : -1
    undoRedo.current.operationIndex--

    return pixelsToBeFilled
}



