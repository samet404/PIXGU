import { usePlayersPowerups } from '@/zustand/store/usePlayersPowerups'

export const mirror = (userID: string) => {
    usePlayersPowerups.getState().setPowerupRunning(userID, 'mirror')
}