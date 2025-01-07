import { usePowerups } from '@/zustand/store'

export const wordsLength = (data: string) => {
    usePowerups.getState().setPowerupInActive('wordsLength')
    usePowerups.getState().setPowerupsHasBackText('wordsLength', data)
}