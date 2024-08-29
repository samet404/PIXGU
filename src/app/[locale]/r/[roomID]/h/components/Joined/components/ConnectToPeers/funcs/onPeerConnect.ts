import type { User } from 'lucia'
import type SimplePeer from 'simple-peer'
import { positiveLog } from '@/utils/positiveLog'
import { useHostingHealth, usePlayers } from '@/zustand/store'
import { handlePeerDatas } from './handlePeerDatas'
import { sendPlayers } from './sendPlayers'
import { sendEveryoneNewPlayerDbInfo } from './sendEveryoneNewPlayerDbInfo'

export const onPeerConnect = (
  peer: SimplePeer.Instance,
  userID: string,
  roomID: string,
  user: User,
) =>
  peer.on('connect', () => {
    positiveLog(`CONNECTED TO ${userID}`)

    usePlayers.getState().addPlayer(userID, {
      isPainter: false,
      isGuessed: false,
      coin: 0,
      ...user,
    })

    handlePeerDatas(userID)
    sendPlayers(userID)
    if (usePlayers.getState().value.count >= 2)
      useHostingHealth.getState().set('readyToStart')
    else useHostingHealth.getState().set('waitingForPlayers')
    sendEveryoneNewPlayerDbInfo(userID)
  })
