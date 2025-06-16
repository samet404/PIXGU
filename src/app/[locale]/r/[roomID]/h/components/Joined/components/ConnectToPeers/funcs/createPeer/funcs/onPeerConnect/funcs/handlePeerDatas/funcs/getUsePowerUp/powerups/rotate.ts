import { POWERUP_DURATIONS, POWERUP_PRICES } from '@/constants'
import { sendCoinInfo } from '@/helpers/room'
import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { sendToPeerWithID } from '@/utils/sendToPeerWithID'
import { postMsgToHostTimerWorker } from '@/workers'
import { useCoins } from '@/zustand/store/useCoins'
import { usePlayersPowerups } from '@/zustand/store/usePlayersPowerups'
import { useWhoIsPainter } from '@/zustand/store/useWhoIsPainter'

export const rotate = (userID: string) => {
    if (
        !usePlayersPowerups.getState().users[userID]!.powerups!.rotate!.isActive ||
        useCoins.getState().coins[userID]! < POWERUP_PRICES.rotate ||
        useWhoIsPainter.getState().isPainter(userID)
    ) return

    postMsgToHostTimerWorker({
        ID: 'ROTATE_POWERUP',
        otherIDs: [userID],
        event: 'start',
        ms: POWERUP_DURATIONS.rotate,
        type: 'timeout',
    })

    useCoins.getState().decrease(userID, POWERUP_PRICES.rotate)
    sendCoinInfo([userID])
    usePlayersPowerups.getState().setPowerupInActive(userID, 'rotate')
    usePlayersPowerups.getState().setPowerupRunning(userID, 'rotate')

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