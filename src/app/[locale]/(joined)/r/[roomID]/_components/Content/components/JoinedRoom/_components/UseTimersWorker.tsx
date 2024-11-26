"use client"

import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useMatchStatusClient, } from '@/zustand/store'
import { getPlayerTimerWorker, terminatePlayerTimerWorker, type PlayerTimerWorkerPostMsgData } from '@/workers'

export const UseTimersWorker = ({ }: Props) => {
    useEffectOnce(() => {
        const timerWorker = getPlayerTimerWorker()

        timerWorker.current.onmessage = (e: any) => {
            const data = e.data as PlayerTimerWorkerPostMsgData
            const { ID } = data

            switch (ID) {
                case 'MATCH_REMAIN_TIME':
                    console.log('MATCH_REMAIN_TIME')
                    useMatchStatusClient.getState().decreaseRemainSeconds()
                    break
            }

            return () => {
                terminatePlayerTimerWorker()
            }
        }
    })

    return null
}

type Props = {
}