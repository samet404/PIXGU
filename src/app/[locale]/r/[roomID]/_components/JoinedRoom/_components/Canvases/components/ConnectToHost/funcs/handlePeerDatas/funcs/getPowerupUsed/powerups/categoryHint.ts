import { usePlayersPowerups } from '@/zustand/store/usePlayersPowerups'

export const categoryHint = (userID: string) => {
    usePlayersPowerups.getState().setPowerupInActive(userID, 'categoryHint')
}