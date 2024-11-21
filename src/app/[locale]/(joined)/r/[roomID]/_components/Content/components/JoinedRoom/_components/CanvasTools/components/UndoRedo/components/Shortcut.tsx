"use client"

import { useShortcut } from '@/hooks/useShortcut'
import { usePainterTool } from '@/zustand/store'

export const Shortcut = () => {
    const setUndoRedoType = usePainterTool((s) => s.setUndoRedoType)
    const selectedType = usePainterTool((s) => s.with.undoRedoType)

    useShortcut({
        keyName: 'Change Undo/Redo type',
        onShortcut: () => setUndoRedoType(selectedType === 0 ? 1 : 0)
    })

    return null
}