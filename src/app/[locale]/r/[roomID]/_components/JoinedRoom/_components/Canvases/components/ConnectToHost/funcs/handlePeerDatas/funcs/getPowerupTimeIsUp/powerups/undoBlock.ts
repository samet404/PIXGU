import { usePlayersPowerups } from '@/zustand/store/usePlayersPowerups'

export const undoBlock = (userID: string) => {
    usePlayersPowerups.getState().setPowerupIsNotRunning(userID, 'undoBlock')
}