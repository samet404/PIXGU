import {
  useCoins,
  useHostingHealth,
  usePlayers,
  useSpectators,
} from '@/zustand/store'
import type { User } from 'lucia'
import type { Guest } from '@/types'
import type SimplePeer from 'simple-peer'
import { storePixelHistory } from '@/store'
import { sendToPeer } from '@/utils/sendToPeer'
import { positiveLog } from '@/utils/positiveLog'
import { handlePeerDatas } from './funcs/handlePeerDatas'
import { sendEveryoneNewPlayer } from './funcs/sendEveryoneNewPlayer'
import { sendPrevPlayersToNewPlayer } from './funcs/sendPrevPlayersToNewPlayer'

export const onPeerConnect = (
  peer: SimplePeer.Instance,
  userID: string,
  roomID: string,
  user: User | Guest,
) =>
  peer.on('connect', () => {
    positiveLog(`CONNECTED TO ${userID}`)

    if (usePlayers.getState().value.count === 1)
      useHostingHealth.getState().set('readyToStart')

    const status = useHostingHealth.getState().status
    const isSpectator = status === 'gameIsStarted'

    if (isSpectator) {
      sendToPeer(peer, {
        from: 'host',
        event: 'youAreSpectator',
      })

      useSpectators.getState().add(userID)
      Object.keys(useCoins.getState().coins).forEach((ID) => {
        sendToPeer(peer, {
          from: 'host',
          event: 'coin',
          data: {
            to: ID,
            amount: useCoins.getState().coins[ID]!,
          },
        })
      })

      sendToPeer(peer, {
        from: 'host',
        event: 'prevCanvas',
        data: storePixelHistory.get().rgb
      })
    }

    usePlayers.getState().addPlayer(userID, {
      ...user,
    })

    handlePeerDatas(userID, roomID)
    sendPrevPlayersToNewPlayer(userID)
    sendToPeer(peer, {
      from: 'host',
      event: 'prevSpectators',
      data: useSpectators.getState().playersIDs,
    })
    sendEveryoneNewPlayer(userID, isSpectator)
  })
