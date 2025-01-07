'use client'

import { createMatch, gameEnded, sendCoinInfo } from '@/helpers/room'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { storePaintersAccess } from '@/store'
import type { Locale } from '@/types/locale'
import type { RTCStats } from '@/types/rtcStats'
import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { sendToPeerWithID } from '@/utils/sendToPeerWithID'
import { violetLog } from '@/utils/violetLog'
import { getHostTimerWorker, postMsgToCanvasWorker, postMsgToHostTimerWorker, terminateTimerWorker, type TimerWorkerPostMsgData } from '@/workers'
import { useCoins, useGuessedPlayers, useHostingHealth, useHostPainterData, useMatchStatus, usePeers, usePlayers, usePlayersPing, usePlayersPowerups, useWhoIsPainter } from '@/zustand/store'

export const UseTimersWorker = ({ locale }: Props) => {
    useEffectOnce(() => {
        const timerWorker = getHostTimerWorker()

        timerWorker.current.onmessage = (e: any) => {
            const workerData = e.data as TimerWorkerPostMsgData
            const { ID, otherIDs } = workerData

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
                        event: 'painterSelectedThemeTimeIsUp',
                    })

                    if (storePaintersAccess.value.paintersToBeSelected.length === 1) gameEnded()
                    else createMatch(locale)
                    break
                }

                case 'MATCH_REMAIN_TIME':
                    console.log('MATCH_REMAIN_TIME')
                    useMatchStatus.getState().decreaseRemainSeconds()
                    break

                case 'MATCH_ENDED': {
                    const painterID = useWhoIsPainter.getState().value.painterID!

                    postMsgToHostTimerWorker({
                        ID: 'MATCH_REMAIN_TIME',
                        event: 'stop',
                    })

                    if (useGuessedPlayers.getState().playersIDs.length === 0) useCoins.getState().decrease(painterID, 100)

                    const notGuessedPlayersIDs = usePlayers.getState().value.arr
                        .filter(p => !useGuessedPlayers.getState().isGuessed(p.id))
                        .map(p => p.id)

                    notGuessedPlayersIDs.forEach(ID => {
                        useCoins.getState().decrease(ID, 100)
                    })

                    sendCoinInfo(notGuessedPlayersIDs)

                    createMatch(locale)
                    break
                }

                case 'RTT':
                    Object.keys(usePeers.getState().peers).forEach((ID) => {
                        const peer = usePeers.getState().peers[ID]!.peer as any

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

                                        usePlayersPing.getState().set(rtt, ID)
                                    }
                                })
                            })
                        } catch (error) {
                            console.error('Failed to get peer stats:', error)
                            peer.destroy()
                            return
                        }

                    })
                    break

                case 'ROTATE_POWERUP': {
                    const userID = otherIDs![0] as string

                    usePlayersPowerups.getState().setPowerupIsNotRunning(userID, 'rotate')


                    sendToAllPeers({
                        event: 'powerupTimeIsUp',
                        data: {
                            name: 'rotate',
                            userID
                        }
                    }, {
                        except: [userID]
                    })

                    sendToPeerWithID(userID, {
                        event: 'yourPowerupTimeIsUp',
                        data: {
                            name: 'rotate'
                        }
                    })


                    break
                }

                case 'MIRROR_POWERUP': {
                    console.log('MIRROR_POWERUP_TIME_IS_UP')
                    const userID = otherIDs![0] as string

                    usePlayersPowerups.getState().setPowerupIsNotRunning(userID, 'mirror')

                    sendToAllPeers({
                        event: 'powerupTimeIsUp',
                        data: {
                            name: 'mirror',
                            userID
                        }
                    }, {
                        except: [userID]
                    })

                    sendToPeerWithID(userID, {
                        event: 'yourPowerupTimeIsUp',
                        data: {
                            name: 'mirror'
                        }
                    })
                    break
                }

                case 'UNDO_BLOCK_POWERUP': {
                    if (usePlayersPowerups.getState().runningPowerups.undoBlock.IDs.length !== 1) break
                    const userID = otherIDs![0] as string

                    usePlayersPowerups.getState().setPowerupRunning(userID, 'undoBlock')

                    sendToAllPeers({
                        event: 'powerupTimeIsUp',
                        data: {
                            name: 'undoBlock',
                            userID
                        }
                    }, {
                        except: [userID]
                    })

                    sendToPeerWithID(userID, {
                        event: 'yourPowerupTimeIsUp',
                        data: {
                            name: 'undoBlock'
                        }
                    })
                    break
                }

                case 'INVISIBLE_PENCIL_POWERUP': {
                    if (usePlayersPowerups.getState().runningPowerups.invisiblePencil.IDs.length !== 1) break
                    const userID = otherIDs![0] as string

                    usePlayersPowerups.getState().setPowerupIsNotRunning(userID, 'invisiblePencil')

                    if (usePlayersPowerups.getState().runningPowerups.invisiblePencil.IDs.length !== 0) break

                    postMsgToCanvasWorker({
                        e: 'pencilIsVisible'
                    })

                    sendToAllPeers({
                        event: 'powerupTimeIsUp',
                        data: {
                            name: 'invisiblePencil',
                            userID
                        }
                    }, {
                        except: [userID]
                    })

                    sendToPeerWithID(userID, {
                        event: 'yourPowerupTimeIsUp',
                        data: {
                            name: 'invisiblePencil'
                        }
                    })
                    break
                }

                case 'ZA_WARUDO_POWERUP': {
                    if (usePlayersPowerups.getState().runningPowerups.zaWarudo.IDs.length !== 1) break
                    const userID = otherIDs![0] as string

                    usePlayersPowerups.getState().setPowerupRunning(userID, 'zaWarudo')

                    sendToAllPeers({
                        event: 'powerupTimeIsUp',
                        data: {
                            name: 'zaWarudo',
                            userID
                        }
                    }, {
                        except: [userID]
                    })

                    sendToPeerWithID(userID, {
                        event: 'yourPowerupTimeIsUp',
                        data: {
                            name: 'zaWarudo'
                        }
                    })
                    break
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
    locale: Locale
}