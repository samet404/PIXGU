import { useCoins } from '@/zustand/store/useCoins'
import { usePeers } from '@/zustand/store/usePeers'
import { usePlayers } from '@/zustand/store/usePlayers'
import { useSocketIO } from '@/zustand/store/useSocketIO'
import { useSpectators } from '@/zustand/store/useSpectators'
import { useHostingHealth } from '@/zustand/store/useHostingHealth'
import type { Guest, Locale } from '@/types'
import type PixguPeer from 'simple-peer'
import { sendToPeer } from '@/utils/sendToPeer'
import { positiveLog } from '@/utils/positiveLog'
import { handlePeerDatas } from './funcs/handlePeerDatas'
import { sendEveryoneNewPlayer } from './funcs/sendEveryoneNewPlayer'
import { sendPrevPlayersToNewPlayer } from './funcs/sendPrevPlayersToNewPlayer'
import {
  getCanvasWorker,
  postMsgToHostTimerWorker,
  type CanvasWorkerOnMsgData,
} from '@/workers'

const canvasWorker = getCanvasWorker()

export const onPeerConnect = (
  peer: PixguPeer.Instance,
  userID: string,
  roomID: string,
  user: Guest,
  locale: Locale,
) =>
  peer.on('connect', () => {
    const userSecretKey = usePeers.getState().secretKeys[userID]!
    // const isGuest = true

    positiveLog(`CONNECTED TO ${userID}`)
    console.log('sent player joined')

    postMsgToHostTimerWorker({
      ID: 'RTT',
      event: 'start',
      type: 'interval',
      triggerNow: true,
      ms: 5000,
    })

    if (usePlayers.getState().value.count === 1)
      useHostingHealth.getState().set('readyToStart')

    const status = useHostingHealth.getState().status
    const isSpectator = status === 'gameIsStarted'

    if (isSpectator) {
      sendToPeer(peer, userSecretKey, {
        event: 'youAreSpectator',
      })

      useSpectators.getState().add(userID)
      Object.keys(useCoins.getState().coins).forEach((ID) => {
        const secretKey = usePeers.getState().secretKeys[ID]!

        sendToPeer(peer, secretKey, {
          event: 'coin',
          data: {
            to: ID,
            amount: useCoins.getState().coins[ID]!,
          },
        })
      })
    }

    canvasWorker.current.postMessage({
      e: 'pixels',
    } as CanvasWorkerOnMsgData)

    usePlayers.getState().addPlayer(userID, {
      id: userID,
      username: user.name,
      usernameWithUsernameID: user.nameWithNameID,
      profilePicture: undefined,
    })

    handlePeerDatas(userID, roomID, locale)
    sendPrevPlayersToNewPlayer(userID)
    sendToPeer(peer, userSecretKey, {
      event: 'prevSpectators',
      data: useSpectators.getState().playersIDs,
    })
    sendEveryoneNewPlayer(userID)
    useCoins.getState().initUser(userID)
    useSocketIO.getState().io!.emit('current-players', {
      count: usePlayers.getState().value.count,
      IDs: Object.keys(usePlayers.getState().value.obj),
    })
  })
