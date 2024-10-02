import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { usePlayers } from '@/zustand/store'

export const sendEveryoneNewPlayer = (ID: string, isSpectator: boolean) => {
  const { usernameWithUsernameID, profilePicture, username, usernameID } =
    usePlayers.getState().value.obj[ID]!

  sendToAllPeers(
    {
      from: 'host',
      event: 'playerJoined',
      data: {
        ID,
        profilePicture,
        usernameWithUsernameID,
        username,
        usernameID,
        isSpectator,
      },
    },
    { except: [ID] },
  )
}
