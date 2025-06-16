
import { POWERUP_DURATIONS, POWERUP_PRICES } from '@/constants'
import { sendCoinInfo } from '@/helpers/room'
import { sendToAllPeers, sendToPeerWithID } from '@/utils'
import { postMsgToHostTimerWorker } from '@/workers'
import { useCoins } from '@/zustand/store/useCoins'
import { useGuessedPlayers } from '@/zustand/store/useGuessedPlayers'
import { useHostPainterData } from '@/zustand/store/useHostPainterData'
import { usePlayersPowerups } from '@/zustand/store/usePlayersPowerups'

export const undoBlock = (userID: string) => {
    if (
        !useGuessedPlayers.getState().isGuessed(userID) ||
        !usePlayersPowerups.getState().users[userID]!.powerups!.undoBlock!.isActive ||
        useHostPainterData.getState().value.status !== 'painterSelectedTheme' ||
        useCoins.getState().coins[userID]! < POWERUP_PRICES.undoBlock
    ) return

    postMsgToHostTimerWorker({
        ID: 'UNDO_BLOCK_POWERUP',
        event: 'start',
        ms: POWERUP_DURATIONS.undoBlock,
        type: 'timeout',
        otherIDs: [userID]
    })

    useCoins.getState().decrease(userID, POWERUP_PRICES.undoBlock)
    sendCoinInfo([userID])

    usePlayersPowerups.getState().setPowerupRunning(userID, 'undoBlock')
    usePlayersPowerups.getState().setPowerupInActive(userID, 'undoBlock')

    sendToAllPeers({
        event: 'powerupUsed',
        data: {
            name: 'undoBlock',
            userID
        }
    }, {
        except: [userID]
    })

    sendToPeerWithID(userID, {
        event: 'youUsedPowerup',
        data: {
            name: 'undoBlock'
        }
    })
}