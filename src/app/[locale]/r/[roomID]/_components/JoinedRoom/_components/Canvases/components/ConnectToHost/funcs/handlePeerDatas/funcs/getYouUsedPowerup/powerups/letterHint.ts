import { usePowerups } from '@/zustand/store'

export const letterHint = (data: string) => {
    console.log('letterHint', data)
    usePowerups.getState().setPowerupInActive('letterHint')
    usePowerups.getState().setPowerupsHasBackText('letterHint', data)
}