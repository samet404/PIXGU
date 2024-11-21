import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers'
import { useAmIPainting, useCanvasesMainData, useCoins, useGuessChatLayout, useGuessedPlayers, useMatchStatusClient, useMyCoin, useRoomGuessChatMsgsStore, useRoomWinnersChatMsgsStore, useWhoIsPainterClient, useWinnersChatLayout } from '@/zustand/store'

export const resetMatchStates = () => {
    const canvasWorker = getCanvasWorker()
    const { mctx, dbctx, dpctx } = useCanvasesMainData.getState()


    mctx!.beginPath()
    mctx!.fillStyle = '#ffffff'
    mctx!.fillRect(0, 0, mctx!.canvas.width, mctx!.canvas.height)
    mctx!.closePath()

    dbctx!.beginPath()
    dbctx!.clearRect(0, 0, mctx!.canvas.width, mctx!.canvas.height)
    dbctx!.closePath()

    dpctx!.beginPath()
    dpctx!.clearRect(0, 0, mctx!.canvas.width, mctx!.canvas.height)
    dpctx!.closePath()


    canvasWorker.current.postMessage({ e: 3 } as CanvasWorkerOnMsgData)
    useAmIPainting.getState().reset()
    useRoomWinnersChatMsgsStore.getState().reset()
    useRoomGuessChatMsgsStore.getState().reset()
    useGuessedPlayers.getState().reset()
    useMatchStatusClient.getState().reset()
}
