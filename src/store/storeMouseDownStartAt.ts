import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers'

export const storeMouseDownStartAt: Actions & State = {
    value: null,
    set: function (input) {
        const canvasWorker = getCanvasWorker()
        canvasWorker.current.postMessage({
            e: 13,
            data: input.smooth
        } as CanvasWorkerOnMsgData)
        this.value = input
    }
}

type State = {
    value: null | Value
}

type Actions = {
    set: (input: Value) => void
}

type Value = {
    smooth: [x: number, y: number]
    exact: [x: number, y: number]
} 