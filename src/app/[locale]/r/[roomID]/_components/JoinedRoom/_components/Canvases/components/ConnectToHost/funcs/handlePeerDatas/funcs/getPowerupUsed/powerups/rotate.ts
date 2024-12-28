import { usePlayersPowerups } from '@/zustand/store'

export const rotate = (userID: string) => {
    usePlayersPowerups.getState().setPowerupRunning(userID, 'rotate')
}