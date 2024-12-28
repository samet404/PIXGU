import type { YouUsedPowerup } from '@/types'
import { usePowerups } from '@/zustand/store'
import { mirror, rotate, undoBlock } from './powerups'

export const getYouUsedPowerup = ({ name }: YouUsedPowerup['data']) => {
    usePowerups.getState().setPowerupInActive(name)

    switch (name) {
        case 'rotate':
            rotate()
            break
        case 'mirror':
            mirror()
            break
        case 'undoBlock':
            undoBlock()
            break
    }
}