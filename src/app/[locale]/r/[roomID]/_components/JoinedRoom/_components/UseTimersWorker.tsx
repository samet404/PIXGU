'use client'

import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useAmIPainting } from '@/zustand/store/useAmIPainting'
import { useAmISpectator } from '@/zustand/store/useAmISpectator'
import { useCoins } from '@/zustand/store/useCoins'
import { useGameEndedPanel } from '@/zustand/store/useGameEndedPanel'
import { useGuessChatLayout } from '@/zustand/store/useGuessChatLayout'
import { useGuessedPlayers } from '@/zustand/store/useGuessedPlayers'
import { useHostPeer } from '@/zustand/store/useHostPeer'
import { useIsGameStopped } from '@/zustand/store/useIsGameStopped'
import { useMatchStatusClient } from '@/zustand/store/useMatchStatusClient'
import { useMyCoin } from '@/zustand/store/useMyCoin'
import { useNewPainterPanel } from '@/zustand/store/useNewPainterPanel'
import { usePainterSelectingRemainTime } from '@/zustand/store/usePainterSelectingRemainTime'
import { usePing } from '@/zustand/store/usePing'
import { useRoomGuessChatMsgsStore } from '@/zustand/store/useRoomGuessChatMsgs'
import { useRoomGeneralChatMsgsStore } from '@/zustand/store/useRoomGeneralChatMsgs'
import { useSelectThemePanel } from '@/zustand/store/useSelectThemePanel'
import { useSpectators } from '@/zustand/store/useSpectators'
import { useWhoIsPainterClient } from '@/zustand/store/useWhoIsPainterClient'
import { useGeneralChatLayout } from '@/zustand/store/useGeneralChatLayout'
import { getPlayerTimerWorker, postMsgToPlayerTimerWorker, terminatePlayerTimerWorker, type PlayerTimerWorkerPostMsgData } from '@/workers'
import { violetLog } from '@/utils/violetLog'
import { type RTCStats } from '@/types'

export const UseTimersWorker = () => {
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
                        useGeneralChatLayout.getState().reset()
                        useGuessChatLayout.getState().reset()
                        useRoomGeneralChatMsgsStore.getState().reset()
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
                case 'RTT': {
                    const peer = useHostPeer.getState().peer as any

                    try {
                        peer.getStats((err: Error | null, stats: RTCStats[]) => {
                            if (err) {
                                console.error('Failed to get peer stats:', err);
                                peer.destroy()
                                return
                            }

                            stats.forEach((report) => {
                                if (report.type === 'candidate-pair') {
                                    const rtt = report.currentRoundTripTime * 1000
                                    if (!rtt) {
                                        violetLog(`RTT is undefined`)
                                        return
                                    }

                                    violetLog(`RTT ${rtt}ms`)
                                    usePing.getState().set(rtt)
                                }
                            })

                        })
                    } catch (error) {
                        console.error('Failed to get peer stats:', error)
                        peer.destroy()
                        break
                    }
                }




            }


            return () => {
                terminatePlayerTimerWorker()
            }
        }
    })

    return null
}