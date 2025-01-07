import { postMsgToCanvasWorker } from '@/workers'
import { usePowerups } from '@/zustand/store'

export const invisiblePencil = () => {
    postMsgToCanvasWorker({
        e: 'pencilIsInvisible'
    })
    usePowerups.getState().setPowerupRunning('invisiblePencil')
    usePowerups.getState().setPowerupInActive('invisiblePencil')
}