import type { WebRTCConnData } from '@/types'
import { usePlayers } from '@/zustand/store'

export const getJoinedPlayers = (rtcData: WebRTCConnData) => {
  const { from, event, data } = rtcData
  if (event === 'playerJoined' && from === 'host') {
    const { ID, profilePicture, usernameWithUsernameID } = data
    usePlayers.getState().addPlayer(ID, {
      coin: 0,
      isGuessed: false,
      isPainter: false,
      profilePicture,
      usernameWithUsernameID,
    })
  }
}
