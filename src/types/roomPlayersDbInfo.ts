import type { User } from 'lucia'

export type RoomPlayersDbInfoOrderedByJoinTime = {
  players: Record<string, RoomPlayersDbInfo>
  me: User | null
}

export type RoomPlayersDbInfo = {
  usernameWithUsernameID: string
  profilePicture: string | null
}
