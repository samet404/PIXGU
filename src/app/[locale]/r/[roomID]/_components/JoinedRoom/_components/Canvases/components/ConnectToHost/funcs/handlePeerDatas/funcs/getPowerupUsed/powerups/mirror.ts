import { usePlayersPowerups } from '@/zustand/store'

export const mirror = (userID: string) => {
    usePlayersPowerups.getState().setPowerupRunning(userID, 'mirror')
}