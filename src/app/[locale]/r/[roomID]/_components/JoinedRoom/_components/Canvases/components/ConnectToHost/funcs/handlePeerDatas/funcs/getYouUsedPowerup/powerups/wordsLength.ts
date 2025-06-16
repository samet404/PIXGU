import { usePowerups } from '@/zustand/store/usePowerups'

export const wordsLength = (data: string) => {
    usePowerups.getState().setPowerupInActive('wordsLength')
    usePowerups.getState().setPowerupsHasBackText('wordsLength', data)
}