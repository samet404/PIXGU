import { postMsgToCanvasWorker } from '@/workers'
import { usePlayersPowerups } from '@/zustand/store/usePlayersPowerups'

export const invisiblePencil = (userID: string) => {
    postMsgToCanvasWorker({
        e: 'pencilIsVisible',
    })
    usePlayersPowerups.getState().setPowerupIsNotRunning(userID, 'invisiblePencil')
}