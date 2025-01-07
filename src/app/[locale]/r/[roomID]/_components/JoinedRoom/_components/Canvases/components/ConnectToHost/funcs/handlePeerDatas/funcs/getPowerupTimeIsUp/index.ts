import type { PowerupTimeIsUp } from '@/types'
import { invisiblePencil, mirror, rotate, undoBlock } from './powerups'

export const getPowerupTimeIsUp = ({ name, userID }: PowerupTimeIsUp['data']) => {
    switch (name) {
        case 'rotate':
            rotate(userID)
            break
        case 'invisiblePencil':
            invisiblePencil(userID)
            break
        case 'undoBlock':
            undoBlock(userID)
            break
        case 'mirror':
            mirror(userID)
            break
    }
}