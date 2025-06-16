import { POWERUP_DURATIONS, POWERUP_PRICES } from '@/constants'
import { sendCoinInfo } from '@/helpers/room'
import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { sendToPeerWithID } from '@/utils/sendToPeerWithID'
import { postMsgToHostTimerWorker } from '@/workers'
import { useCoins } from '@/zustand/store/useCoins'
import { useGuessedPlayers } from '@/zustand/store/useGuessedPlayers'
import { usePlayersPowerups } from '@/zustand/store/usePlayersPowerups'

export const mirror = (userID: string) => {
    if (
        !useGuessedPlayers.getState().isGuessed(userID) ||
        !usePlayersPowerups.getState().users[userID]!.powerups!.mirror!.isActive ||
        useCoins.getState().coins[userID]! < POWERUP_PRICES.mirror
    ) return


    useCoins.getState().decrease(userID, POWERUP_PRICES.mirror)
    sendCoinInfo([userID])

    usePlayersPowerups.getState().setPowerupInActive(userID, 'mirror')
    usePlayersPowerups.getState().setPowerupRunning(userID, 'mirror')

    postMsgToHostTimerWorker({
        ID: 'MIRROR_POWERUP',
        event: 'start',
        ms: POWERUP_DURATIONS.mirror,
        type: 'timeout',
        otherIDs: [userID]
    })

    sendToAllPeers({
        event: 'powerupUsed',
        data: {
            name: 'mirror',
            userID
        }
    }, {
        except: [userID]
    })

    sendToPeerWithID(userID, {
        event: 'youUsedPowerup',
        data: {
            name: 'mirror'
        }
    })
}