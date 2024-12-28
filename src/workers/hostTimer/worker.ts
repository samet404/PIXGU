import type { TimerWorkerOnMsgData } from './types'

const timers: Record<number | string, ReturnType<typeof setInterval>> = {}

self.onmessage = (e) => {
    const workerData = e.data as TimerWorkerOnMsgData
    const { event } = workerData

    switch (event) {
        case 'stop': {
            console.log('worker timer stopped', workerData)

            const { ID } = workerData

            clearInterval(timers[ID])
            delete timers[ID]

            break
        }
        case 'start': {
            console.log('worker timer started', workerData)
            const { ID, ms, type, triggerNow, data } = workerData
            const start = performance.now()

            if (triggerNow) self.postMessage({
                ID
            })

            if (type === 'timeout')
                timers[ID] = setInterval(() => {
                    if ((performance.now() - start) < ms) return

                    clearInterval(timers[ID])
                    delete timers[ID]
                    self.postMessage({
                        ID,
                        data
                    })
                }, 50)
            else
                timers[ID] = setInterval(() => {
                    self.postMessage({
                        ID,
                        data
                    })
                }, ms)

            break
        }
        case 'clear': {
            console.log('worker timer cleared', workerData)

            for (const key in timers) {
                clearInterval(timers[key])
                delete timers[key]
            }
            break
        }
    }
}

