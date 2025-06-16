import { usePowerups } from '@/zustand/store/usePowerups'

export const letterHint = (data: string) => {
    console.log('letterHint', data)
    usePowerups.getState().setPowerupInActive('letterHint')
    usePowerups.getState().setPowerupsHasBackText('letterHint', data)
}