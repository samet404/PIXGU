import { invisiblePencil, mirror, rotate, undoBlock, wordsLength, letterHint, categoryHint, rainingColors } from './powerups'
import type { YouUsedPowerup } from '@/types'
import { usePowerups } from '@/zustand/store'
import { giveUp } from './powerups/giveUp'

export const getYouUsedPowerup = (rtcData: YouUsedPowerup['data'], myUserID: string) => {
    const { name } = rtcData
    usePowerups.getState().setPowerupInActive(name)

    switch (name) {
        case 'rotate':
            rotate()
            break
        case 'wordsLength':
            wordsLength(rtcData.data)
            break
        case 'categoryHint':
            categoryHint(rtcData.data)
            break
        case 'letterHint':
            letterHint(rtcData.data)
            break
        case 'invisiblePencil':
            invisiblePencil()
            break
        case 'mirror':
            mirror()
            break
        case 'undoBlock':
            undoBlock()
            break
        case 'rainingColors':
            rainingColors(rtcData.data)
            break
        case 'giveUp':
            giveUp(myUserID)
            break
    }
}