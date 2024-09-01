import type { PlayerJoined } from '@/types'
import { usePlayers } from '@/zustand/store'

export const getJoinedPlayers = (data: PlayerJoined['data']) => {
  const { ID, profilePicture, usernameWithUsernameID, username, usernameID } =
    data

  usePlayers.getState().addPlayer(ID, {
    id: ID,
    profilePicture,
    usernameWithUsernameID,
    username,
    usernameID,
  })
}
