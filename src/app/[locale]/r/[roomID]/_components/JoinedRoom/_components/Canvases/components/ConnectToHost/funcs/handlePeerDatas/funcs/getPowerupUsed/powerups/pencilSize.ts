import { usePlayersPowerups } from '@/zustand/store'

export const pencilSize = (userID: string) => {
    usePlayersPowerups.getState().setPowerupInActive(userID, 'pencilSize')
}