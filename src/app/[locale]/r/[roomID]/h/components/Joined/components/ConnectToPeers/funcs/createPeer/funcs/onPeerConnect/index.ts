import {
  useCoins,
  usePeers,
  usePlayers,
  useSocketIO,
  useSpectators,
  useHostingHealth,
} from '@/zustand/store'
import type { User } from 'lucia'
import type { Guest, Locale } from '@/types'
import type SimplePeer from 'simple-peer'
import { sendToPeer } from '@/utils/sendToPeer'
import { positiveLog } from '@/utils/positiveLog'
import { handlePeerDatas } from './funcs/handlePeerDatas'
import { sendEveryoneNewPlayer } from './funcs/sendEveryoneNewPlayer'
import { sendPrevPlayersToNewPlayer } from './funcs/sendPrevPlayersToNewPlayer'
import { getCanvasWorker, postMsgToHostTimerWorker, type CanvasWorkerOnMsgData } from '@/workers'

const canvasWorker = getCanvasWorker()

export const onPeerConnect = (
  peer: SimplePeer.Instance,
  userID: string,
  roomID: string,
  user: User | Guest,
  locale: Locale,
) =>
  peer.on('connect', () => {
    const userSecretKey = usePeers.getState().secretKeys[userID]!
    const isGuest = 'ID' in user

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
      e: 'pixels'
    } as CanvasWorkerOnMsgData)

    usePlayers.getState().addPlayer(userID, {
      id: userID,
      username: (isGuest ? (user).name : (user).username),
      usernameWithUsernameID: (isGuest ? (user).nameWithNameID : (user).usernameWithUsernameID),
      profilePicture: (!isGuest && (user).profilePicture) as string | undefined
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
