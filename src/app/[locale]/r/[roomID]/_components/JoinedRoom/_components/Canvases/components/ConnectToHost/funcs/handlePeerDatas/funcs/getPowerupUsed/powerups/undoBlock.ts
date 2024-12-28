import { usePlayersPowerups } from '@/zustand/store'

export const undoBlock = (userID: string) => {
    usePlayersPowerups.getState().setPowerupRunning(userID, 'rotate')
}