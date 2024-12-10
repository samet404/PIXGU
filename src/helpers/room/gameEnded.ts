import { storePaintersAccess } from '@/store'
import { sToMs, sendToAllPeers } from '@/utils'
import { postMsgToCanvasWorker, postMsgToHostTimerWorker } from '@/workers'
import { useCoins, useGuessedPlayers, useHostingHealth, useHostPainterData, useMatchStatus, useSocketIO, useTotalMatchCount, useWhoIsPainter } from '@/zustand/store'

export const gameEnded = () => {
    useSocketIO.getState().io!.emit('game-started', false)
    sendToAllPeers({
        event: 'gameEnded',
        data: {
            coins: useCoins.getState().getSortedByAmount(),
        },
    })

    useHostingHealth.getState().set('gameEnded')
    useHostPainterData.getState().reset()
    useWhoIsPainter.getState().reset()
    useMatchStatus.getState().reset()
    useTotalMatchCount.getState().reset()
    storePaintersAccess.reset()
    postMsgToHostTimerWorker({
        ID: 'MATCH_ENDED',
        event: 'stop',
    })
    postMsgToHostTimerWorker({
        ID: 'MATCH_REMAIN_TIME',
        event: 'stop',
    })
    useCoins.getState().reset()
    postMsgToCanvasWorker({ e: 'reset' })
    useGuessedPlayers.getState().reset()

    postMsgToHostTimerWorker({
        ID: 'GAME_ENDED',
        type: 'timeout',
        event: 'start',
        ms: sToMs(20),
    })

}
