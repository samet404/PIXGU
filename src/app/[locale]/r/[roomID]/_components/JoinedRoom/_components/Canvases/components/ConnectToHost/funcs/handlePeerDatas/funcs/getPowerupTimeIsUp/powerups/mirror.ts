import { usePlayersPowerups } from '@/zustand/store/usePlayersPowerups'

export const mirror = (userID: string) => {
    usePlayersPowerups.getState().setPowerupIsNotRunning(userID, 'mirror')
}