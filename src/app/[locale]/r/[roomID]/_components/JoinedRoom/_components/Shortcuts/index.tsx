'use client'

import { useShortcut } from '@/hooks'
import { sendToHostPeer } from '@/utils/sendToHostPeer'
import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers'
import { toolsHaveSizeProperty, useCurrentPanel, useGameToolAlert, usePainterTool, usePlayersPowerups, useWhoIsPainterClient, type ToolHaveSizeProperty } from '@/zustand/store'
import type { LangObj } from '../../lang'

const canvasWorker = getCanvasWorker()

export const Shortcuts = ({ langObj }: Props) => {
    const setTool = usePainterTool((s) => s.setCurrent)
    const setToolAlert = useGameToolAlert((s) => s.setAlert)
    const setCurrentPanel = useCurrentPanel(s => s.setPanel)


    useShortcut({
        keyName: 'Pencil', onShortcut: () => {
            const whoIsPainter = useWhoIsPainterClient.getState().value
            if (!whoIsPainter.amIPainter) return

            setTool('pencil')
            setToolAlert(langObj.toolAlert.pencil)
        }
    })

    useShortcut({
        keyName: 'Bucket', onShortcut: () => {
            const whoIsPainter = useWhoIsPainterClient.getState().value
            if (!whoIsPainter.amIPainter) return

            setTool('bucket')
            setToolAlert(langObj.toolAlert.bucket)
        }
    })

    useShortcut({
        keyName: 'Eyedropper', onShortcut: () => {
            const whoIsPainter = useWhoIsPainterClient.getState().value
            if (!whoIsPainter.amIPainter) return

            setTool('eyedropper')
            setToolAlert(langObj.toolAlert.eyeDropper)
        }
    })

    useShortcut({
        keyName: 'Eraser', onShortcut: () => {
            const whoIsPainter = useWhoIsPainterClient.getState().value
            if (!whoIsPainter.amIPainter) return

            setTool('eraser')
            setToolAlert(langObj.toolAlert.eraser)
        }
    })

    useShortcut({
        keyName: 'Increase tool size', onShortcut: () => {
            const whoIsPainter = useWhoIsPainterClient.getState().value
            if (!whoIsPainter.amIPainter) return

            const current = usePainterTool.getState().current
            if (toolsHaveSizeProperty.includes(current)) {
                console.log('increasing tool size for: ', current)
                usePainterTool.getState().increaseSize(current as ToolHaveSizeProperty)
                setToolAlert(`${langObj.toolAlert.increaseToolSize} ${usePainterTool.getState().options[current as ToolHaveSizeProperty].size}`)
            }
        }
    })

    useShortcut({
        keyName: 'Decrease tool size', onShortcut: () => {
            const whoIsPainter = useWhoIsPainterClient.getState().value
            if (!whoIsPainter.amIPainter) return

            const current = usePainterTool.getState().current
            if (toolsHaveSizeProperty.includes(current)) {
                console.log('decreasing tool size for: ', current)
                usePainterTool.getState().decreaseSize(current as ToolHaveSizeProperty)
                setToolAlert(`${langObj.toolAlert.decreaseToolSize} ${usePainterTool.getState().options[current as ToolHaveSizeProperty].size}`)
            }
        }
    })

    useShortcut({
        keyName: 'Undo',
        onShortcut: () => {
            const isBlocked = usePlayersPowerups.getState().runningPowerups.undoBlock.process.length > 0
            if (isBlocked) return

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

            setToolAlert(undoRedoType === 0 ? `${langObj.toolAlert.undo} ${langObj.toolAlert.BO}` : `${langObj.toolAlert.undo} ${langObj.toolAlert.PBP}`)
        }
    })

    const switchGrid = usePainterTool((s) => s.switchGrid)

    useShortcut({
        keyName: 'Grid', onShortcut: () => {
            switchGrid()
            setToolAlert(`${usePainterTool.getState().with.grid ? langObj.toolAlert.gridOpened : langObj.toolAlert.gridClosed}`)
        }
    })

    useShortcut({
        keyName: 'Redo',
        onShortcut: () => {
            const isBlocked = usePlayersPowerups.getState().runningPowerups.undoBlock.process.length > 0
            if (isBlocked) return

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

            setToolAlert(undoRedoType === 0 ? `${langObj.toolAlert.redo} ${langObj.toolAlert.BO}` : `${langObj.toolAlert.redo} ${langObj.toolAlert.PBP}`)
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

            setToolAlert(undoRedoType === 0 ? langObj.toolAlert.changeURType.BO : langObj.toolAlert.changeURType.PBP)
        }
    })

    useShortcut({
        keyName: 'Powerups',
        onShortcut: () => {
            if (useCurrentPanel.getState().currentPanel === 'power-ups') setCurrentPanel(null)
            else setCurrentPanel('power-ups')
        }
    })

    return null

}

type Props = {
    langObj: LangObj['shortcuts']
}