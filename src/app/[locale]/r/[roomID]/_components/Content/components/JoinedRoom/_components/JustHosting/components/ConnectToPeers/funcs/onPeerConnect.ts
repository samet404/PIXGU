import type { User } from 'lucia'
import type SimplePeer from 'simple-peer'
import { positiveLog } from '@/utils/positiveLog'
import { usePlayers } from '@/zustand/store'
import { useOtherHostRoomStatus } from '@/zustand/store/useOtherHostRoomStatus'
import { updatePaintersToPlayers } from './updatePaintersToPlayers'
import { createMatchTimeout } from './createMatchTimeout'
import { handlePeerDatas } from './handlePeerDatas'
import { sendPlayers } from './sendPlayers'
import { sendEveryoneNewPlayerDbInfo } from './sendEveryoneNewPlayerDbInfo'

export const onPeerConnect = (
  peer: SimplePeer.Instance,
  userID: string,
  user: User,
) =>
  peer.on('connect', async () => {
    positiveLog(`CONNECTED TO ${userID}`)

    const players = usePlayers.getState().get()
    const otherStatues = useOtherHostRoomStatus.getState().get()

    // #region firstMatch
    if (otherStatues.isFirstMatch && players.count > 3) {
      usePlayers.getState().addPlayer(userID, {
        isPainter: false,
        isGuessed: false,
        coin: 0,
        ...user,
      })

      useOtherHostRoomStatus.getState().add({
        isFirstMatch: false,
      })

      useOtherHostRoomStatus.getState().add({
        matchTimeout: createMatchTimeout(),
      })

      updatePaintersToPlayers()
    }
    // #endregion
    // #region not first Match
    else if (!otherStatues.isFirstMatch) {
      usePlayers.getState().addPlayer(userID, {
        isPainter: false,
        isGuessed: false,
        coin: 0,
        ...user,
      })
    }
    // #endregion

    handlePeerDatas(userID)
    sendPlayers(userID)
    sendEveryoneNewPlayerDbInfo(userID)
  })
