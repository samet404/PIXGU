export type * from './hostTimer/types'
export type * from './canvas/types'


import type { CanvasWorkerOnMsgData } from './canvas/types'
import type { TimerWorkerOnMsgData } from './hostTimer/types'

const canvasWorker: {
    current: Worker | null
} = {
    current: null
}
export const getCanvasWorker = () => {
    if (!canvasWorker.current) {
        canvasWorker.current = new Worker(new URL('./canvas/worker.ts', import.meta.url), {
            type: 'module',
        })
    }

    return canvasWorker as {
        current: Worker
    }
}

export const postMsgToCanvasWorker = (msg: CanvasWorkerOnMsgData) => getCanvasWorker().current.postMessage(msg)

export const terminateCanvasWorker = (): void => {
    canvasWorker.current?.terminate()
    canvasWorker.current = null
}




const hostTimerWorker: {
    current: Worker | null
} = {
    current: null
}

export const getHostTimerWorker = () => {
    if (!hostTimerWorker.current) {
        hostTimerWorker.current = new Worker(new URL('./hostTimer/worker.ts', import.meta.url), {
            type: 'module',
        })
    }

    return hostTimerWorker as {
        current: Worker
    }
}

export const postMsgToHostTimerWorker = (msg: TimerWorkerOnMsgData) => getHostTimerWorker().current.postMessage(msg)

export const terminateTimerWorker = (): void => {
    postMsgToHostTimerWorker({
        event: 'clear'
    })
    hostTimerWorker.current?.terminate()
    hostTimerWorker.current = null
}







const playerTimerWorker: {
    current: Worker | null
} = {
    current: null
}

export const getTimerTimerWorker = () => {
    if (!playerTimerWorker.current) {
        playerTimerWorker.current = new Worker(new URL('./playerTimer/worker.ts', import.meta.url), {
            type: 'module',
        })
    }

    return playerTimerWorker as {
        current: Worker
    }
}

export const postMsgToTimerTimerWorker = (msg: TimerWorkerOnMsgData) => getTimerTimerWorker().current.postMessage(msg)

export const terminatePlayerTimerWorker = (): void => {
    postMsgToTimerTimerWorker({
        event: 'clear'
    })
    playerTimerWorker.current?.terminate()
    playerTimerWorker.current = null
}


