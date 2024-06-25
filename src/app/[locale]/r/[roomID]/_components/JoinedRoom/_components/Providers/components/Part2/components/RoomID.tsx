import { RoomIDContext } from '@/context/client'
import { type ReactNode } from 'react'

const RoomID = ({ roomID, children }: Props) => (
  <RoomIDContext.Provider value={roomID}>{children}</RoomIDContext.Provider>
)

export default RoomID

type Props = {
  roomID: string
  children: ReactNode
}
