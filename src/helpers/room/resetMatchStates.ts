import { getCanvasWorker, postMsgToPlayerTimerWorker, type CanvasWorkerOnMsgData } from '@/workers'
import { useAmIPainting } from '@/zustand/store/useAmIPainting'
import { useGuessedPlayers } from '@/zustand/store/useGuessedPlayers'
import { useMatchStatusClient } from '@/zustand/store/useMatchStatusClient'
import { usePlayersWhoGaveUp } from '@/zustand/store/usePlayersWhoGaveUp'
import { useRoomGuessChatMsgsStore } from '@/zustand/store/useRoomGuessChatMsgs'
import { useRoomGeneralChatMsgsStore } from '@/zustand/store/useRoomGeneralChatMsgs'
import { useCanvasesMainData } from '@/zustand/store/useCanvasesMainData'

export const resetMatchStates = () => {
    const canvasWorker = getCanvasWorker()
    const { mctx } = useCanvasesMainData.getState()


    mctx!.beginPath()
    mctx!.fillStyle = '#ffffff'
    mctx!.fillRect(0, 0, mctx!.canvas.width, mctx!.canvas.height)
    mctx!.closePath()

    usePlayersWhoGaveUp.getState().reset()
    useMatchStatusClient.getState().clearTheme()
    canvasWorker.current.postMessage({ e: 'reset' } as CanvasWorkerOnMsgData)
    useAmIPainting.getState().reset()
    useRoomGeneralChatMsgsStore.getState().reset()
    useRoomGuessChatMsgsStore.getState().reset()
    useGuessedPlayers.getState().reset()
    postMsgToPlayerTimerWorker({
        ID: 'MATCH_REMAIN_TIME',
        event: 'stop',
    })
}
