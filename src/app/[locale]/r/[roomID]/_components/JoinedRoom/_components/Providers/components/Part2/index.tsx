import type { PropsWithChildren } from 'react'
import RoomID from './components/RoomID'
import { RoomPlayersIDs } from './components/RoomPlayersIDs'
import UserID from './components/UserID'

export const Part2 = ({ roomID, userID, children }: Props) => {
  return (
    <RoomID roomID={roomID}>
      <RoomPlayersIDs>
        <UserID userID={userID}>{children}</UserID>
      </RoomPlayersIDs>
    </RoomID>
  )
}
 
type Props = {
  roomID: string
  userID: string
} & PropsWithChildren
