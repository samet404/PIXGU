import { usePlayersPowerups } from '@/zustand/store/usePlayersPowerups'

export const pencilSize = (userID: string) => {
    usePlayersPowerups.getState().setPowerupInActive(userID, 'pencilSize')
}