import type { YourPowerupTimeIsUp } from '@/types'
import { invisiblePencil, mirror, rotate, undoBlock } from './powerups'

export const getYourPowerupTimeIsUp = ({ name }: YourPowerupTimeIsUp['data']) => {
    switch (name) {
        case 'rotate':
            rotate()
            break
        case 'invisiblePencil':
            invisiblePencil()
            break
        case 'undoBlock':
            undoBlock()
            break
        case 'mirror':
            mirror()
    }
}