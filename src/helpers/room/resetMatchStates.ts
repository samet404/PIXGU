import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers'
import { useAmIPainting, useCanvasesMainData, useCoins, useGuessChatLayout, useGuessedPlayers, useMatchStatusClient, useMyCoin, useRoomGuessChatMsgsStore, useRoomWinnersChatMsgsStore, useWhoIsPainterClient, useWinnersChatLayout } from '@/zustand/store'

export const resetMatchStates = () => {
    const canvasWorker = getCanvasWorker()
    const { mctx } = useCanvasesMainData.getState()


    mctx!.beginPath()
    mctx!.fillStyle = '#ffffff'
    mctx!.fillRect(0, 0, mctx!.canvas.width, mctx!.canvas.height)
    mctx!.closePath()

    canvasWorker.current.postMessage({ e: 'reset' } as CanvasWorkerOnMsgData)
    useAmIPainting.getState().reset()
    useRoomWinnersChatMsgsStore.getState().reset()
    useRoomGuessChatMsgsStore.getState().reset()
    useGuessedPlayers.getState().reset()
}
