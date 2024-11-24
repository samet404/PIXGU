"use client"

import { useShortcut } from '@/hooks'
import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers'
import { toolsHaveSizeProperty, useGameToolAlert, usePainterTool, type ToolHaveSizeProperty } from '@/zustand/store'

const canvasWorker = getCanvasWorker()

export const Shortcuts = () => {
    const setTool = usePainterTool((s) => s.setCurrent)
    const setToolAlert = useGameToolAlert((s) => s.setAlert)

    useShortcut({
        keyName: 'Pencil', onShortcut: () => {
            setTool('pencil')
            setToolAlert('Pencil selected')
        }
    })

    useShortcut({
        keyName: 'Bucket', onShortcut: () => {
            setTool('bucket')
            setToolAlert('Bucket selected')
        }
    })

    useShortcut({
        keyName: 'Eyedropper', onShortcut: () => {
            setTool('eyedropper')
            setToolAlert('Eye dropper selected')
        }
    })

    useShortcut({
        keyName: 'Eraser', onShortcut: () => {
            setTool('eraser')
            setToolAlert('Eraser selected')
        }
    })

    useShortcut({
        keyName: 'Increase tool size', onShortcut: () => {
            const current = usePainterTool.getState().current
            if (toolsHaveSizeProperty.includes(current)) {
                usePainterTool.getState().increaseSize(current as ToolHaveSizeProperty)
                setToolAlert(`Tool size: ${usePainterTool.getState().options[current as ToolHaveSizeProperty].size}`)
            }
        }
    })

    useShortcut({
        keyName: 'Decrease tool size', onShortcut: () => {
            const current = usePainterTool.getState().current
            if (toolsHaveSizeProperty.includes(current)) {
                usePainterTool.getState().decreaseSize(current as ToolHaveSizeProperty)
                setToolAlert(`Tool size: ${usePainterTool.getState().options[current as ToolHaveSizeProperty].size}`)
            }
        }
    })

    useShortcut({
        keyName: 'Undo',
        onShortcut: () => {
            const undoRedoType = usePainterTool.getState().with.undoRedoType
            console.log('undoRedoType: ', undoRedoType)
            canvasWorker.current.postMessage({
                e: undoRedoType === 0 ? 'undoByOperation' : 'undo',
            } as CanvasWorkerOnMsgData)
            setToolAlert(undoRedoType === 0 ? 'Undo-BO' : 'Undo-PBP')
        }
    })

    useShortcut({
        keyName: 'Redo',
        onShortcut: () => {
            const undoRedoType = usePainterTool.getState().with.undoRedoType
            canvasWorker.current.postMessage({
                e: undoRedoType === 0 ? 'redoByOperation' : 'redo',
            } as CanvasWorkerOnMsgData)
            setToolAlert(undoRedoType === 0 ? 'Redo-BO' : 'Redo-PBP')
        }
    })

    return null

}