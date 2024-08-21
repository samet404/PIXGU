import type { User } from 'lucia'
import type SimplePeer from 'simple-peer'
import { positiveLog } from '@/utils/positiveLog'
import { usePlayers } from '@/zustand/store'
import { useOtherHostRoomStatus } from '@/zustand/store/useOtherHostRoomStatus'
import { updatePaintersToPlayers } from './updatePaintersToPlayers'
import { handlePeerDatas } from './handlePeerDatas'
import { sendPlayers } from './sendPlayers'
import { sendEveryoneNewPlayerDbInfo } from './sendEveryoneNewPlayerDbInfo'
import { createMatch } from './createMatch'
import { mToMs } from '@/utils/mToMs'

export const onPeerConnect = (
  peer: SimplePeer.Instance,
  userID: string,
  user: User,
) =>
  peer.on('connect', () => {
    positiveLog(`CONNECTED TO ${userID}`)

    const players = usePlayers.getState().get
    const otherStatues = useOtherHostRoomStatus.getState().get

    usePlayers.getState().addPlayer(userID, {
      isPainter: false,
      isGuessed: false,
      coin: 0,
      ...user,
    })

    createMatch()
    useOtherHostRoomStatus.getState().add({
      matchInterval: setInterval(() => createMatch(), mToMs(1)),
    })

    handlePeerDatas(userID)
    sendPlayers(userID)
    sendEveryoneNewPlayerDbInfo(userID)
  })
