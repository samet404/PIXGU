import { Svg } from '@/components/Svg'
import { clsxMerge } from '@/utils/clsxMerge'
import { postMsgToCanvasWorker } from '@/workers'
import { useGameToolAlert, usePainterTool } from '@/zustand/store'

export const UndoRedoBtn = ({ type }: Props) => {
    const setToolAlert = useGameToolAlert((s) => s.setAlert)

    const onmousedown = () => {
        const undoRedoType = usePainterTool.getState().with.undoRedoType
        postMsgToCanvasWorker({
            e: undoRedoType === 0 ? `${type}ByOperation` : type,
        })

        setToolAlert(undoRedoType === 0 ? `${type}-BO` : `${type}-PBP`)
    }

    return <button>
        <Svg src='undo-left-round-svgrepo-com.svg' alt='Undo-Redo' className={clsxMerge('size-8 hover:opacity-85 duration-300 opacity-60', {
            'scale-x-[-1]': type === 'redo',
        })} onMouseDown={onmousedown} />
    </button>
}

type Props = {
    type: 'undo' | 'redo'
}