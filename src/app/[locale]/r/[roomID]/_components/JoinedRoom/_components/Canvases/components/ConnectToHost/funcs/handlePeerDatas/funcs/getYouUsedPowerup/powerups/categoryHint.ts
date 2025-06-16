import { usePowerups } from '@/zustand/store/usePowerups'

export const categoryHint = (data: string) => {
    usePowerups.getState().setPowerupInActive('categoryHint')
    usePowerups.getState().setPowerupsHasBackText('categoryHint', data)
}