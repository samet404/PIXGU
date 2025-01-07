
import { POWERUP_PRICES } from '@/constants'
import { sendCoinInfo } from '@/helpers/room'
import type { Locale } from '@/types'
import { useCoins, useHostPainterData, usePlayersPowerups, useSocketIO, useWhoIsPainter } from '@/zustand/store'

export const categoryHint = (userID: string, locale: Locale) => {
    const painterData = useHostPainterData.getState().value
    if (
        useWhoIsPainter.getState().isPainter(userID) ||
        painterData.status !== 'painterSelectedTheme' ||
        useCoins.getState().coins[userID]! < POWERUP_PRICES.categoryHint ||
        !painterData.selectedTheme ||
        !usePlayersPowerups.getState().users[userID]!.powerups!.categoryHint!.isActive
    ) return

    useCoins.getState().decrease(userID, POWERUP_PRICES.categoryHint)
    sendCoinInfo([userID])

    useSocketIO.getState().io!.emit('category-hint', {
        locale,
        theme: painterData.selectedTheme,
        userID: userID
    })
}
