let canvasWorker: Worker | null = null

export const getCanvasWorker = () => {
    if (!canvasWorker) {
        canvasWorker = new Worker(new URL('./', import.meta.url), {
            type: 'module',
        })
    }

    return canvasWorker
};
