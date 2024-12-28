import type { PowerupUsed } from '@/types'
import { usePlayersPowerups } from '@/zustand/store'
import { mirror, rotate, undoBlock } from './powerups'

export const getPowerupUsed = (data: PowerupUsed['data']) => {
    const { name, userID } = data

    usePlayersPowerups.getState().setPowerupInActive(userID, name)

    switch (name) {
        case 'rotate':
            rotate(userID)
            break
        case 'mirror':
            mirror(userID)
            break
        case 'undoBlock':
            undoBlock(userID)
            break
    }
}