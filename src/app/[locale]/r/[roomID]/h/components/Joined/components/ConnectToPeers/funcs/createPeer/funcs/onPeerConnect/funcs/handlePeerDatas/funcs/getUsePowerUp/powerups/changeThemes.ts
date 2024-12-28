import { POWERUP_PRICES } from '@/constants'
import { sendCoinInfo } from '@/helpers/room'
import { api } from '@/trpc/server'
import { sendToPeerWithID } from '@/utils/sendToPeerWithID'
import { useCoins, usePlayersPowerups, useWhoIsPainter } from '@/zustand/store'

export const changeThemes = async (userID: string, roomID: string) => {
    if (
        !useWhoIsPainter.getState().isPainter(userID) ||
        useWhoIsPainter.getState().value.status !== 'selectingTheme' ||
        !usePlayersPowerups.getState().users[userID]?.powerups.changeThemes.isActive ||
        useCoins.getState().coins[userID]! < POWERUP_PRICES.changeThemes
    ) return

    useCoins.getState().decrease(userID, POWERUP_PRICES.changeThemes)
    usePlayersPowerups.getState().setPowerupInActive(userID, 'changeThemes')
    sendCoinInfo([userID])
    sendToPeerWithID(userID, {
        event: 'youUsedPowerup',
        data: {
            name: 'changeThemes',
            data: await api.gameRoom.getThemes.query({ roomID })
        }
    })
}