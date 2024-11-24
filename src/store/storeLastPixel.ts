import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers'

export const storeLastPixel: Actions & State = {
    value: null,
    set: function (input) {
        getCanvasWorker().current.postMessage({
            e: 'getLastPixel',
            data: input
        } as CanvasWorkerOnMsgData)

        this.value = input
    }
}

type State = {
    value: null | Uint16Array
}

type Actions = {
    set: (input: null | Uint16Array) => void
}