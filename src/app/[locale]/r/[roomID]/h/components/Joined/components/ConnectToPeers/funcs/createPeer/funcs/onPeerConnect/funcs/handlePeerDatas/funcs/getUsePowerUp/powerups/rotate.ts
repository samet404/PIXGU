import { POWERUP_DURATIONS, POWERUP_PRICES } from '@/constants'
import { sendCoinInfo } from '@/helpers/room'
import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { sendToPeerWithID } from '@/utils/sendToPeerWithID'
import { postMsgToHostTimerWorker } from '@/workers'
import { useCoins, useGuessedPlayers, usePlayersPowerups } from '@/zustand/store'

export const rotate = (userID: string) => {
    if (
        !useGuessedPlayers.getState().isGuessed(userID) ||
        !usePlayersPowerups.getState().users[userID]?.powerups.rotate.isActive ||
        useCoins.getState().coins[userID]! < POWERUP_PRICES.rotate
    ) return

    postMsgToHostTimerWorker({
        ID: 'ROTATE_POWERUP',
        event: 'start',
        ms: POWERUP_DURATIONS.rotate,
        type: 'timeout',
        data: { userID }
    })
    useCoins.getState().decrease(userID, POWERUP_PRICES.rotate)
    sendCoinInfo([userID])
    usePlayersPowerups.getState().setPowerupInActive(userID, 'rotate')
    sendToAllPeers({
        event: 'powerupUsed',
        data: {
            name: 'rotate',
            userID
        }
    }, {
        except: [userID]
    })

    sendToPeerWithID(userID, {
        event: 'youUsedPowerup',
        data: {
            name: 'rotate'
        }
    })
}