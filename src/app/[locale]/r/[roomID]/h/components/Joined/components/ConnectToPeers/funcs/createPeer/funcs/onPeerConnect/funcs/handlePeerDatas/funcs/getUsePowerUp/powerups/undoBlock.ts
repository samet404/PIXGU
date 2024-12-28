
import { POWERUP_DURATIONS, POWERUP_PRICES } from '@/constants'
import { sendCoinInfo } from '@/helpers/room'
import { sendToAllPeers, sendToPeerWithID } from '@/utils'
import { postMsgToHostTimerWorker } from '@/workers'
import { useCoins, useGuessedPlayers, usePlayersPowerups, useWhoIsPainter } from '@/zustand/store'

export const undoBlock = (userID: string) => {
    if (
        !useGuessedPlayers.getState().isGuessed(userID) ||
        !usePlayersPowerups.getState().users[userID]?.powerups.undoBlock.isActive ||
        useWhoIsPainter.getState().value.status !== 'selectedTheme' ||
        useCoins.getState().coins[userID]! < POWERUP_PRICES.undoBlock
    ) return

    postMsgToHostTimerWorker({
        ID: 'UNDO_BLOCK_POWERUP',
        event: 'start',
        ms: POWERUP_DURATIONS.rotate,
        type: 'timeout',
        data: { userID }
    })
    useCoins.getState().decrease(userID, POWERUP_PRICES.undoBlock)
    sendCoinInfo([userID])
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