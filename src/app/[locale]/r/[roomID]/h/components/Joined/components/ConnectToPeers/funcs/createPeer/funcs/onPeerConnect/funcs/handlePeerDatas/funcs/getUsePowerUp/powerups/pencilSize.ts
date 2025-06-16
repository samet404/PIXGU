import { POWERUP_PRICES } from '@/constants'
import { sendCoinInfo } from '@/helpers/room'
import { sendToPeerWithID, sendToAllPeers, getRandomNum } from '@/utils'
import { useCoins } from '@/zustand/store/useCoins'
import { useGuessedPlayers } from '@/zustand/store/useGuessedPlayers'
import { usePlayersPowerups } from '@/zustand/store/usePlayersPowerups'
import { useWhoIsPainter } from '@/zustand/store/useWhoIsPainter'

export const pencilSize = (userID: string) => {
    if (
        !useGuessedPlayers.getState().isGuessed(userID) ||
        !usePlayersPowerups.getState().users[userID]!.powerups!.pencilSize!.isActive ||
        useCoins.getState().coins[userID]! < POWERUP_PRICES.pencilSize
    ) return

    useCoins.getState().decrease(userID, 10)
    sendCoinInfo([userID])
    usePlayersPowerups.getState().setPowerupInActive(userID, 'pencilSize')
    const painterID = useWhoIsPainter.getState().value.painterID!

    sendToAllPeers({
        event: 'powerupUsed',
        data: {
            name: 'pencilSize',
            userID
        }
    }, {
        except: [userID]
    })

    sendToPeerWithID(userID, {
        event: 'youUsedPowerup',
        data: {
            name: 'pencilSize',
        }
    })

    sendToPeerWithID(painterID, {
        event: 'powerupUsed',
        data: {
            name: 'pencilSize',
            userID,
            data: getRandomNum(1, 20)
        }
    })
}