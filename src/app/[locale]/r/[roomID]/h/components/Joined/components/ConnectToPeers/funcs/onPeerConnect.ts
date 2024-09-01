import type { User } from 'lucia'
import type SimplePeer from 'simple-peer'
import { positiveLog } from '@/utils/positiveLog'
import { useHostingHealth, usePlayers, useSpectators } from '@/zustand/store'
import { handlePeerDatas } from './handlePeerDatas'
import { sendEveryoneNewPlayer } from './sendEveryoneNewPlayer'
import { sendPrevPlayersToNewPlayer } from './sendPrevPlayersToNewPlayer'
import { sendToPeer } from '@/utils/sendToPeer'

export const onPeerConnect = (
  peer: SimplePeer.Instance,
  userID: string,
  roomID: string,
  user: User,
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
    }

    usePlayers.getState().addPlayer(userID, {
      ...user,
    })

    handlePeerDatas(userID)
    sendPrevPlayersToNewPlayer(userID)
    sendToPeer(peer, {
      from: 'host',
      event: 'prevSpectators',
      data: useSpectators.getState().playersIDs,
    })
    sendEveryoneNewPlayer(userID, isSpectator)
  })
