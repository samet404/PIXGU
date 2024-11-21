export * from './canvas/types'

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

export const terminateCanvasWorker = (): void => {
    canvasWorker.current?.terminate()
    canvasWorker.current = null
}
