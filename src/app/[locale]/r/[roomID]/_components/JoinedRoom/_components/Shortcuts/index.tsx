"use client"

import { useShortcut } from '@/hooks'
import { sendToHostPeer } from '@/utils/sendToHostPeer'
import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers'
import { toolsHaveSizeProperty, useGameToolAlert, usePainterTool, useWhoIsPainterClient, type ToolHaveSizeProperty } from '@/zustand/store'

const canvasWorker = getCanvasWorker()

export const Shortcuts = () => {
    const setTool = usePainterTool((s) => s.setCurrent)
    const setToolAlert = useGameToolAlert((s) => s.setAlert)


    useShortcut({
        keyName: 'Pencil', onShortcut: () => {
            const whoIsPainter = useWhoIsPainterClient.getState().value
            if (!whoIsPainter.amIPainter) return

            setTool('pencil')
            setToolAlert('Pencil selected')
        }
    })

    useShortcut({
        keyName: 'Bucket', onShortcut: () => {
            const whoIsPainter = useWhoIsPainterClient.getState().value
            if (!whoIsPainter.amIPainter) return

            setTool('bucket')
            setToolAlert('Bucket selected')
        }
    })

    useShortcut({
        keyName: 'Eyedropper', onShortcut: () => {
            const whoIsPainter = useWhoIsPainterClient.getState().value
            if (!whoIsPainter.amIPainter) return

            setTool('eyedropper')
            setToolAlert('Eye dropper selected')
        }
    })

    useShortcut({
        keyName: 'Eraser', onShortcut: () => {
            const whoIsPainter = useWhoIsPainterClient.getState().value
            if (!whoIsPainter.amIPainter) return

            setTool('eraser')
            setToolAlert('Eraser selected')
        }
    })

    useShortcut({
        keyName: 'Increase tool size', onShortcut: () => {
            const whoIsPainter = useWhoIsPainterClient.getState().value
            if (!whoIsPainter.amIPainter) return

            const current = usePainterTool.getState().current
            if (toolsHaveSizeProperty.includes(current)) {
                usePainterTool.getState().increaseSize(current as ToolHaveSizeProperty)
                setToolAlert(`Tool size: ${usePainterTool.getState().options[current as ToolHaveSizeProperty].size}`)
            }
        }
    })

    useShortcut({
        keyName: 'Decrease tool size', onShortcut: () => {
            const whoIsPainter = useWhoIsPainterClient.getState().value
            if (!whoIsPainter.amIPainter) return

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
            const whoIsPainter = useWhoIsPainterClient.getState().value
            if (!whoIsPainter.amIPainter) return

            const undoRedoType = usePainterTool.getState().with.undoRedoType
            console.log('undoRedoType: ', undoRedoType)
            canvasWorker.current.postMessage({
                e: undoRedoType === 0 ? 'undoByOperation' : 'undo',
            } as CanvasWorkerOnMsgData)

            sendToHostPeer({
                event: 'undoRedo',
                data: {
                    type: undoRedoType,
                    direction: 0
                }
            })

            setToolAlert(undoRedoType === 0 ? 'Undo-BO' : 'Undo-PBP')
        }
    })

    const switchGrid = usePainterTool((s) => s.switchGrid)

    useShortcut({
        keyName: 'Grid', onShortcut: () => {
            switchGrid()
            setToolAlert(`Grid ${usePainterTool.getState().with.grid ? 'Grid opened' : 'Grid closed'}`)
        }
    })

    useShortcut({
        keyName: 'Redo',
        onShortcut: () => {
            const whoIsPainter = useWhoIsPainterClient.getState().value
            if (!whoIsPainter.amIPainter) return

            const undoRedoType = usePainterTool.getState().with.undoRedoType
            canvasWorker.current.postMessage({
                e: undoRedoType === 0 ? 'redoByOperation' : 'redo',
            } as CanvasWorkerOnMsgData)

            sendToHostPeer({
                event: 'undoRedo',
                data: {
                    type: undoRedoType,
                    direction: 1
                }
            })

            setToolAlert(undoRedoType === 0 ? 'Redo-BO' : 'Redo-PBP')
        }
    })

    const setUndoRedoType = usePainterTool((s) => s.setUndoRedoType)

    useShortcut({
        keyName: 'Change Undo/Redo type',
        onShortcut: () => {
            const whoIsPainter = useWhoIsPainterClient.getState().value
            if (!whoIsPainter.amIPainter) return

            const undoRedoType = usePainterTool.getState().with.undoRedoType
            setUndoRedoType(undoRedoType === 0 ? 1 : 0)

            setToolAlert(undoRedoType === 0 ? 'Changed to UR-BO' : 'Changed to UR-PBP')
        }
    })

    return null

}