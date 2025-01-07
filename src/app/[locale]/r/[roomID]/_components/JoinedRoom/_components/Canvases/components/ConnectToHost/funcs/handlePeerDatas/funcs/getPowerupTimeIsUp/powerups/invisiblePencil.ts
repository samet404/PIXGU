import { postMsgToCanvasWorker } from '@/workers'
import { usePlayersPowerups } from '@/zustand/store'

export const invisiblePencil = (userID: string) => {
    postMsgToCanvasWorker({
        e: 'pencilIsVisible',
    })
    usePlayersPowerups.getState().setPowerupIsNotRunning(userID, 'invisiblePencil')
}