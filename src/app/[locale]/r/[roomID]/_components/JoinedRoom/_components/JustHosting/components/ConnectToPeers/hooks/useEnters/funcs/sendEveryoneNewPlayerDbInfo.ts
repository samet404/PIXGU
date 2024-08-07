import { api } from '@/trpc/client'
import type { Peers, RoomPlayersDbInfoOrderedByJoinTime } from '@/types'
import type { User } from 'lucia'
import { sendToPeer } from '@/utils/sendToPeer'

export const sendEveryoneNewPlayerDbInfo = async (
  roomPlayersDbInfoOrderedByJoinTime: RoomPlayersDbInfoOrderedByJoinTime,
  playerID: string,
  peers: Peers,
) => {
  const playerDbInfo = (await api.user.getById.query({
    ID: playerID,
    config: {
      username: false,
      usernameID: false,
    },
  })) as Omit<User, 'username' | 'usernameID'>

  roomPlayersDbInfoOrderedByJoinTime.players[playerID] = {
    profilePicture: playerDbInfo.profilePicture,
    usernameWithUsernameID: playerDbInfo.usernameWithUsernameID,
  }

  for (const userID in peers) {
    if (userID === playerID || !peers[userID]?.peer) continue

    sendToPeer(peers[userID].peer, {
      from: 'host',
      event: 'playerJoined',
      data: {
        ID: playerID,
        profilePicture: playerDbInfo.profilePicture,
        usernameWithUsernameID: playerDbInfo.usernameWithUsernameID,
      },
    })
  }
}
