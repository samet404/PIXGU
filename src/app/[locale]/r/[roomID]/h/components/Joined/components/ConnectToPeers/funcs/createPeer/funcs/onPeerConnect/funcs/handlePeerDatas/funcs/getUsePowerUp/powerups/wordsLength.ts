import { POWERUP_PRICES } from '@/constants'
import { sendCoinInfo } from '@/helpers/room'
import { sendToAllPeers, sendToPeerWithID } from '@/utils'
import { useCoins } from '@/zustand/store/useCoins'
import { useGuessedPlayers } from '@/zustand/store/useGuessedPlayers'
import { useHostPainterData } from '@/zustand/store/useHostPainterData'
import { usePlayersPowerups } from '@/zustand/store/usePlayersPowerups'

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