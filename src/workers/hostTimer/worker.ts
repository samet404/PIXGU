import type { TimerWorkerOnMsgData } from './types'

const timers: Record<number | string, ReturnType<typeof setInterval>> = {}

self.onmessage = (e) => {
    const data = e.data as TimerWorkerOnMsgData
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
            const { ID, ms, type } = data
            const start = performance.now()


            if (type === 'timeout')
                timers[ID] = setInterval(() => {
                    if ((performance.now() - start) < ms) return

                    clearInterval(timers[ID])
                    delete timers[ID]
                    self.postMessage({
                        ID
                    })
                }, 20)
            else
                timers[ID] = setInterval(() => {
                    clearInterval(timers[ID])
                    delete timers[ID]
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
        }
    }
}

