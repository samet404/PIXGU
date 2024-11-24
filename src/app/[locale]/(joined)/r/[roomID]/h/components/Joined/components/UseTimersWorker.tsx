"use client"

import { createMatch } from '@/helpers/room'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { getHostTimerWorker, terminateTimerWorker, TimerWorkerPostMsgData } from '@/workers'
import { useHostingHealth, useHostPainterData, usePlayers } from '@/zustand/store'

export const UseTimersWorker = ({ roomID }: Props) => {
    useEffectOnce(() => {
        const timerWorker = getHostTimerWorker()

        timerWorker.current.onmessage = (e: any) => {
            const data = e.data as TimerWorkerPostMsgData
            const { ID } = data

            switch (ID) {
                case 'GAME_ENDED': {
                    if (usePlayers.getState().value.count > 1)
                        useHostingHealth.getState().set('readyToStart')
                    else useHostingHealth.getState().set('waitingForPlayers')


                    break
                }

                case 'PAINTER_TIME_IS_UP': {
                    const data = useHostPainterData.getState().value
                    if (data.status !== 'painterSelectingTheme') return

                    sendToAllPeers({
                        event: 'painterCouldNotSelectTheme',
                        data: 'timeIsUp',
                    })

                    createMatch(roomID)
                }

            }

            return () => {
                terminateTimerWorker()
            }
        }
    })

    return null
}

type Props = {
    roomID: string
}