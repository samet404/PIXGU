"use client"

import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useAmIPainting, useAmISpectator, useCoins, useGameEndedPanel, useGuessChatLayout, useGuessedPlayers, useHostPeer, useIsGameStopped, useMatchStatusClient, useMyCoin, useNewPainterPanel, usePainterSelectingRemainTime, usePing, useRoomGuessChatMsgsStore, useRoomWinnersChatMsgsStore, useSelectThemePanel, useSpectators, useWhoIsPainterClient, useWinnersChatLayout, } from '@/zustand/store'
import { getPlayerTimerWorker, postMsgToPlayerTimerWorker, terminatePlayerTimerWorker, type PlayerTimerWorkerPostMsgData } from '@/workers'
import { violetLog } from '@/utils/violetLog'
import { type RTCStats } from '@/types'
import { sendToPeer } from '@/utils/sendToPeer'

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
                case 'RTT': {
                    const peer = useHostPeer.getState().peer as any
                    const secretKey = useHostPeer.getState().secretKey!

                    sendToPeer(peer, secretKey, {
                        event: 'loremForRTT',
                        data: 'Eu irure ea occaecat deserunt fugiat incididunt tempor est consectetur sit velit labore cillum.'
                    })

                    peer.getStats((err: Error | null, stats: RTCStats[]) => {
                        if (err) {
                            console.error('Failed to get peer stats:', err);
                            peer.destroy()
                            return
                        }

                        stats.forEach((report) => {
                            if (report.type === 'candidate-pair') {
                                const rtt = report.currentRoundTripTime
                                if (!rtt) {
                                    violetLog(`RTT is undefined`)
                                    return
                                }

                                violetLog(`RTT ${rtt / 1000}ms`)
                                usePing.getState().set(rtt)
                            }
                        })

                    })
                }




            }


            return () => {
                terminatePlayerTimerWorker()
            }
        }
    })

    return null
}