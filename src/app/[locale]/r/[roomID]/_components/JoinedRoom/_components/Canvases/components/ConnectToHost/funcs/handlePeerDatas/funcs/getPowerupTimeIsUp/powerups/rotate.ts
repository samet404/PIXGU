import { usePlayersPowerups } from '@/zustand/store/usePlayersPowerups'

export const rotate = (userID: string) => {
    usePlayersPowerups.getState().setPowerupIsNotRunning(userID, 'rotate')
}