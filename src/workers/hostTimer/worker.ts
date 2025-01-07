import type { TimerWorkerOnMsgData, TimerWorkerPostMsgData } from './types'

const timers: Record<string, ReturnType<typeof setInterval>> = {}

self.onmessage = (e) => {
    const workerData = e.data as TimerWorkerOnMsgData
    const { event } = workerData

    switch (event) {
        case 'stop': {
            console.log('worker timer stopped', workerData)

            const { ID, otherIDs } = workerData
            const key = otherIDs ? ID + otherIDs.join(',') : ID

            clearInterval(timers[key])
            delete timers[key]

            break
        }
        case 'start': {
            console.log('worker timer started', workerData)
            const { ID, ms, type, triggerNow, otherIDs } = workerData
            const start = performance.now()

            const key = otherIDs ? ID + otherIDs.join(',') : ID

            if (triggerNow) self.postMessage({
                ID,
                otherIDs
            } as TimerWorkerPostMsgData)

            if (type === 'timeout') {
                timers[key] = setInterval(() => {
                    if ((performance.now() - start) < ms) return

                    clearInterval(timers[key])
                    delete timers[key]
                    self.postMessage({
                        ID,
                        otherIDs
                    } as TimerWorkerPostMsgData)
                }, 50)
                break
            }

            timers[ID] = setInterval(() => {
                self.postMessage({
                    ID,
                    otherIDs
                } as TimerWorkerPostMsgData)
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

