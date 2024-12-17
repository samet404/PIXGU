import { clsxMerge } from '@/utils/clsxMerge'
import { usePainterTool } from '@/zustand/store'

export const TypeBtn = ({ type }: Props) => {
    const selectedType = usePainterTool((s) => s.with.undoRedoType)
    const setUndoRedoType = usePainterTool((s) => s.setUndoRedoType)

    return (
        <button onMouseDown={() => setUndoRedoType(type)} className={clsxMerge('rounded-md bg-[#ffffff18] px-2 py-1 text-[#ffffff7c] text-sm', {
            'bg-[#ffffff52]': selectedType === type,
        })}>
            {type === 0 ? 'By operation' : 'Pixel by pixel'}
        </button>
    )
}

type Props = {
    type: 0 | 1
}