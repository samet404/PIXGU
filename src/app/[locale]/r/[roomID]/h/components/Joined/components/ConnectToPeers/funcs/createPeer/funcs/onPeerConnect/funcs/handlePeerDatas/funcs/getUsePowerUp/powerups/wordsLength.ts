import { POWERUP_PRICES } from '@/constants'
import { sendCoinInfo } from '@/helpers/room'
import { sendToAllPeers, sendToPeerWithID } from '@/utils'
import { useCoins, useGuessedPlayers, useHostPainterData, usePlayersPowerups } from '@/zustand/store'

export const wordsLength = (userID: string) => {
    const painterData = useHostPainterData.getState().value
    if (
        useGuessedPlayers.getState().isGuessed(userID) ||
        painterData.status !== 'painterSelectedTheme' ||
        !usePlayersPowerups.getState().users[userID]!.powerups!.wordsLength!.isActive ||
        useCoins.getState().coins[userID]! < POWERUP_PRICES.wordsLength
    ) return

    useCoins.getState().decrease(userID, POWERUP_PRICES.wordsLength)
    sendCoinInfo([userID])
    usePlayersPowerups.getState().setPowerupInActive(userID, 'wordsLength')

    const themeLength = painterData.selectedTheme.toLocaleLowerCase().trim().length
    if (!themeLength) return

    sendToAllPeers({
        event: 'powerupUsed',
        data: {
            name: 'wordsLength',
            userID,
        }
    }, {
        except: [userID]
    })

    sendToPeerWithID(userID, {
        event: 'youUsedPowerup',
        data: {
            name: 'wordsLength',
            data: `${themeLength}`
        }
    })
}