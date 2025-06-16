import { Svg } from '@/components/Svg'
import { clsxMerge } from '@/utils'
import { postMsgToCanvasWorker } from '@/workers'
import { useGameToolAlert } from '@/zustand/store/useGameToolAlert'
import { usePainterTool } from '@/zustand/store/usePainterTool'
import { usePlayersPowerups } from '@/zustand/store/usePlayersPowerups'

export const UndoRedoBtn = ({ type }: Props) => {
    const setToolAlert = useGameToolAlert((s) => s.setAlert)
    const process = usePlayersPowerups(s => s.runningPowerups.undoBlock.process)
    const isBlocked = process.length > 0

    const onmousedown = () => {
        if (isBlocked) return

        const undoRedoType = usePainterTool.getState().with.undoRedoType
        postMsgToCanvasWorker({
            e: undoRedoType === 0 ? `${type}ByOperation` : type,
        })

        setToolAlert(undoRedoType === 0 ? `${type}-BO` : `${type}-PBP`)
    }

    return <button onMouseDown={onmousedown} disabled={isBlocked}>
        <Svg src='undo-left-round-svgrepo-com.svg' alt='Undo-Redo' className={clsxMerge('size-8 hover:opacity-85 duration-300 opacity-60', {
            'scale-x-[-1]': type === 'redo',
            'opacity-25 cursor-not-allowed': isBlocked
        })} />
    </button>
}

type Props = {
    type: 'undo' | 'redo'
}