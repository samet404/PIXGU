import type { PlayerTimerWorkerOnMsgData } from './types'

const timers: Record<number | string, ReturnType<typeof setInterval>> = {}

self.onmessage = (e) => {
    const data = e.data as PlayerTimerWorkerOnMsgData
    const { event } = data

    switch (event) {
        case 'stop': {
            console.log('worker timer stopped', data)

            const { ID } = data

            clearInterval(timers[ID])
            delete timers[ID]

            break
        }
        case 'start': {
            console.log('worker timer started', data)
            const { ID, ms, type, triggerNow } = data
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
                        ID
                    })
                }, 50)
            else
                timers[ID] = setInterval(() => {
                    self.postMessage({
                        ID
                    })
                }, ms)

            break
        }
        case 'clear': {
            console.log('worker timer cleared', data)

            for (const key in timers) {
                clearInterval(timers[key])
                delete timers[key]
            }
            break
        }
    }
}

