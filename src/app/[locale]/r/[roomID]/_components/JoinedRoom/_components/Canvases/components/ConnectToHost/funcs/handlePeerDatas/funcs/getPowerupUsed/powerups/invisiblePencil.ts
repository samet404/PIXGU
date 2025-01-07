import { postMsgToCanvasWorker } from '@/workers'
import { usePlayersPowerups } from '@/zustand/store'

export const invisiblePencil = (userID: string) => {
    postMsgToCanvasWorker({
        e: 'pencilIsInvisible'
    })
    usePlayersPowerups.getState().setPowerupRunning(userID, 'invisiblePencil')
    usePlayersPowerups.getState().setPowerupInActive(userID, 'invisiblePencil')
}