import { POWERUP_DURATIONS, POWERUP_PRICES } from '@/constants'
import { sendCoinInfo } from '@/helpers/room'
import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { sendToPeerWithID } from '@/utils/sendToPeerWithID'
import { postMsgToCanvasWorker, postMsgToHostTimerWorker } from '@/workers'
import { useCoins, useGuessedPlayers, usePlayersPowerups } from '@/zustand/store'

export const invisiblePencil = (userID: string) => {
    if (
        !useGuessedPlayers.getState().isGuessed(userID) ||
        !usePlayersPowerups.getState().users[userID]!.powerups!.invisiblePencil!.isActive ||
        useCoins.getState().coins[userID]! < POWERUP_PRICES.invisiblePencil
    ) return

    postMsgToHostTimerWorker({
        ID: 'INVISIBLE_PENCIL_POWERUP',
        event: 'start',
        ms: POWERUP_DURATIONS.invisiblePencil,
        type: 'timeout',
        otherIDs: [userID]
    })

    useCoins.getState().decrease(userID, POWERUP_PRICES.invisiblePencil)
    sendCoinInfo([userID])
    usePlayersPowerups.getState().setPowerupInActive(userID, 'invisiblePencil')
    usePlayersPowerups.getState().setPowerupRunning(userID, 'invisiblePencil')

    postMsgToCanvasWorker({
        e: 'pencilIsInvisible'
    })
    sendToAllPeers({
        event: 'powerupUsed',
        data: {
            name: 'invisiblePencil',
            userID
        }
    }, {
        except: [userID]
    })

    sendToPeerWithID(userID, {
        event: 'youUsedPowerup',
        data: {
            name: 'invisiblePencil'
        }
    })
}