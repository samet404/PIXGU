import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { usePlayers } from '@/zustand/store'

export const sendEveryoneNewPlayerDbInfo = (playerID: string) => {
  const { usernameWithUsernameID, profilePicture } = usePlayers.getState().get()
    .playersDbInfos[playerID]!

  sendToAllPeers(
    {
      from: 'host',
      event: 'playerJoined',
      data: {
        ID: playerID,
        profilePicture: profilePicture,
        usernameWithUsernameID: usernameWithUsernameID,
      },
    },
    { except: [playerID] },
  )
}
