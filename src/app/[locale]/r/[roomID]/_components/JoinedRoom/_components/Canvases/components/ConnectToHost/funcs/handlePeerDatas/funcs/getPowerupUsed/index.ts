import type { PowerupUsed } from '@/types'
import { usePlayersPowerups } from '@/zustand/store/usePlayersPowerups'
import { mirror, rotate, undoBlock, invisiblePencil, colorChaos, rainingColors, categoryHint, pencilSize } from './powerups'

export const getPowerupUsed = (rtcData: PowerupUsed['data']) => {
    const { name, userID } = rtcData

    usePlayersPowerups.getState().setPowerupInActive(userID, name)

    switch (name) {
        case 'rotate':
            rotate(userID)
            break
        case 'invisiblePencil':
            invisiblePencil(userID)
            break
        case 'mirror':
            mirror(userID)
            break
        case 'undoBlock':
            undoBlock(userID)
            break
        case 'colorChaos':
            colorChaos()
            break
        case 'rainingColors':
            rainingColors(userID, rtcData.data)
            break
        case 'categoryHint':
            categoryHint(userID)
            break
        case 'pencilSize':
            pencilSize(userID)
            break

    }
}