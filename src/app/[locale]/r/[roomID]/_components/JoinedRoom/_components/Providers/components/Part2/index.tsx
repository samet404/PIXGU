import type { PropsWithChildren } from 'react'
import RoomID from './components/RoomID'
import { RoomPlayersIDsOrderedByTimestamp } from './components/RoomPlayersIDsOrderedByTimestamp'
import { HostID } from './components/HostID'
import { IsHostPlayer } from './components/isHostPlayer'
import { AmIHostProvider } from './components/AmIHost'
import UserID from './components/UserID'

export const Part2 = ({
  roomID,
  userID,
  hostID,
  isHostPlayer,
  children,
}: Props) => {
  return (
    <RoomID roomID={roomID}>
      <RoomPlayersIDsOrderedByTimestamp>
        <HostID hostID={hostID}>
          <AmIHostProvider hostID={hostID} userID={userID}>
            <IsHostPlayer isHostPlayer={isHostPlayer}>
              <UserID userID={userID}>{children}</UserID>
            </IsHostPlayer>
          </AmIHostProvider>
        </HostID>
      </RoomPlayersIDsOrderedByTimestamp>
    </RoomID>
  )
}

type Props = {
  roomID: string
  userID: string
  hostID: string
  isHostPlayer: boolean
} & PropsWithChildren
