import { postMsgToCanvasWorker } from '@/workers'
import { usePowerups } from '@/zustand/store/usePowerups'

export const invisiblePencil = () => {
    postMsgToCanvasWorker({
        e: 'pencilIsVisible',
    })
    usePowerups.getState().setPowerupIsNotRunning('invisiblePencil')
}