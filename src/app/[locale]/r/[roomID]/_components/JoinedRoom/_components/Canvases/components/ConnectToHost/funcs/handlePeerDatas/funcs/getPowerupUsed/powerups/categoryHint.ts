import { usePlayersPowerups } from '@/zustand/store'

export const categoryHint = (userID: string) => {
    usePlayersPowerups.getState().setPowerupInActive(userID, 'categoryHint')
}