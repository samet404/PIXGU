"use client"

import { createMatch } from '@/helpers/room'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { sendToPeerWithID } from '@/utils/sendToPeerWithID'
import { getHostTimerWorker, postMsgToHostTimerWorker, terminateTimerWorker, TimerWorkerPostMsgData } from '@/workers'
import { useCoins, useHostingHealth, useHostPainterData, useMatchStatus, usePlayers, useWhoIsPainter } from '@/zustand/store'

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
                    break
                }

                case 'MATCH_REMAIN_TIME':
                    console.log('MATCH_REMAIN_TIME')
                    useMatchStatus.getState().decreaseRemainSeconds()
                    break

                case 'MATCH_ENDED':
                    const painterID = useWhoIsPainter.getState().value.painterID!

                    postMsgToHostTimerWorker({
                        ID: 'MATCH_REMAIN_TIME',
                        event: 'stop',
                    })

                    useCoins.getState().decrease(painterID, 100)

                    sendToPeerWithID(painterID, {

                        event: 'yourCoin',
                        data: {
                            amount: useCoins.getState().coins[painterID]!,
                        },
                    })

                    sendToAllPeers({
                        event: 'coin',
                        data: {
                            to: painterID,
                            amount: useCoins.getState().coins[painterID]!,
                        },
                    }, {
                        except: [painterID]
                    })

                    createMatch(roomID)
                    break

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