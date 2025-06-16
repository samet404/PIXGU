import { POWERUP_PRICES } from '@/constants'
import { sendCoinInfo } from '@/helpers/room'
import { sendToAllPeers, sendToPeerWithID } from '@/utils'
import { useCoins } from '@/zustand/store/useCoins'
import { useGuessedPlayers } from '@/zustand/store/useGuessedPlayers'
import { usePlayersPowerups } from '@/zustand/store/usePlayersPowerups'

export const colorChaos = (userID: string) => {
    if (
        !useGuessedPlayers.getState().isGuessed(userID) ||
        !usePlayersPowerups.getState().users[userID]!.powerups!.colorChaos!.isActive ||
        useCoins.getState().coins[userID]! < POWERUP_PRICES.colorChaos
    ) return

    useCoins.getState().decrease(userID, POWERUP_PRICES.colorChaos)
    usePlayersPowerups.getState().setPowerupInActive(userID, 'colorChaos')

    sendToAllPeers({
        event: 'powerupUsed',
        data: {
            name: 'colorChaos',
            userID
        }
    }, {
        except: [userID]
    })

    sendCoinInfo([userID])

    sendToPeerWithID(userID, {
        event: 'youUsedPowerup',
        data: {
            name: 'colorChaos'
        }
    })
}