import type { Locale, UsePowerup } from '@/types'
import {
    categoryHint,
    changeThemes,
    colorChaos,
    giveUp,
    invisiblePencil,
    letterHint,
    mirror,
    pencilSize,
    rainingColors,
    rotate,
    undoBlock,
    wordsLength
} from './powerups'

export const getUsePowerup = (data: UsePowerup['data'], userID: string, roomID: string, locale: Locale) => {
    const { name } = data

    switch (name) {
        case 'letterHint':
            letterHint(userID)
            break
        case 'changeThemes':
            changeThemes(locale, userID)
            break
        case 'rotate':
            rotate(userID)
            break
        case 'mirror':
            mirror(userID)
            break
        case 'giveUp':
            giveUp(userID, locale)
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
            categoryHint(userID, locale)
            break
    }
}