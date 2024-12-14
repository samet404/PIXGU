"use client"

import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useAmIPainting, useAmISpectator, useCoins, useGameEndedPanel, useGuessChatLayout, useGuessedPlayers, useIsGameStopped, useMatchStatusClient, useMyCoin, useNewPainterPanel, usePainterSelectingRemainTime, usePing, useRoomGuessChatMsgsStore, useRoomWinnersChatMsgsStore, useSelectThemePanel, useSpectators, useWhoIsPainterClient, useWinnersChatLayout, } from '@/zustand/store'
import { getPlayerTimerWorker, postMsgToPlayerTimerWorker, terminatePlayerTimerWorker, type PlayerTimerWorkerPostMsgData } from '@/workers'

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


                case 'PAINTER_SELECTING_REMAIN_TIME':
                    if (usePainterSelectingRemainTime.getState().passedMiliseconds === 20000) {
                        postMsgToPlayerTimerWorker({
                            ID: 'PAINTER_SELECTING_REMAIN_TIME',
                            event: 'stop'
                        })
                        return
                    }
                    usePainterSelectingRemainTime.getState().add50ms()
                    break
                case 'GAME_ENDED':
                    if (useGameEndedPanel.getState().value.timerPassedMs === 20000) {
                        postMsgToPlayerTimerWorker({
                            ID: 'GAME_ENDED',
                            event: 'stop'
                        })

                        useIsGameStopped.getState().addCode('waitingForHost')
                        useWhoIsPainterClient.getState().reset()
                        useAmIPainting.getState().reset()
                        useWinnersChatLayout.getState().reset()
                        useGuessChatLayout.getState().reset()
                        useRoomWinnersChatMsgsStore.getState().reset()
                        useRoomGuessChatMsgsStore.getState().reset()
                        useGuessedPlayers.getState().reset()
                        useMyCoin.getState().reset()
                        useCoins.getState().reset()
                        useSpectators.getState().reset()
                        useAmISpectator.getState().reset()
                        useNewPainterPanel.getState().reset()
                        useMatchStatusClient.getState().reset()
                        useSelectThemePanel.getState().reset()
                        useGameEndedPanel.getState().close()

                        break
                    }

                    useGameEndedPanel.getState().add50msToTimer()
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