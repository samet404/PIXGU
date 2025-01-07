import { usePlayersPowerups } from '@/zustand/store'

export const undoBlock = (userID: string) => {
    usePlayersPowerups.getState().setPowerupIsNotRunning(userID, 'undoBlock')
}