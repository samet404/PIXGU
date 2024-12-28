import type { UsePowerup } from '@/types'
import { changeThemes, colorChaos, giveUp, invisiblePencil, letterHint, mirror, pencilSize, rainingColors, rotate, undoBlock, wordsLength } from './powerups'
import { usePlayersPowerups } from '@/zustand/store'

export const getUsePowerup = (data: UsePowerup['data'], userID: string, roomID: string) => {
    const { name } = data

    switch (name) {
        case 'letterHint':
            letterHint(userID)
            break
        case 'changeThemes':
            changeThemes(userID, roomID)
            break
        case 'rotate':
            rotate(userID)
            break
        case 'mirror':
            mirror(userID)
            break
        case 'giveUp':
            giveUp(userID, roomID)
            break
        case 'undoBlock':
            undoBlock(userID)
            break
        case 'colorChaos':
            colorChaos(userID)
            break
        case 'pencilSize':
            pencilSize(userID)
            break
        case 'invisiblePencil':
            invisiblePencil(userID)
            break
        case 'zaWarudo':
            break
        case 'rainingColors':
            rainingColors(userID)
            break
        case 'wordsLength':
            wordsLength(userID)
            break
        case 'categoryHint':
            break
    }

    usePlayersPowerups.getState().setPowerupInActive(userID, name)
}