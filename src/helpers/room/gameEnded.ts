import { storePaintersAccess } from '@/store/storePaintersAccess'
import { sToMs, sendToAllPeers } from '@/utils'
import { postMsgToCanvasWorker, postMsgToHostTimerWorker } from '@/workers'
import { useCoins } from '@/zustand/store/useCoins'
import { useGuessedPlayers } from '@/zustand/store/useGuessedPlayers'
import { useHostingHealth } from '@/zustand/store/useHostingHealth'
import { useHostPainterData } from '@/zustand/store/useHostPainterData'
import { useMatchStatus } from '@/zustand/store/useMatchStatus'
import { useSocketIO } from '@/zustand/store/useSocketIO'
import { useTotalMatchCount } from '@/zustand/store/useTotalMatchCount'
import { useWhoIsPainter } from '@/zustand/store/useWhoIsPainter'

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
