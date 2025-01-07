import { usePlayersPowerups } from '@/zustand/store'

export const mirror = (userID: string) => {
    usePlayersPowerups.getState().setPowerupIsNotRunning(userID, 'mirror')
}