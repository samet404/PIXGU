import './_styles/scrollbars.css'
import {
  getHostID,
  getIsHostPlayer,
  getRoomID,
  getUser,
  getUserID,
} from '@/context/server'
import { JustHosting } from './_components/JustHosting'
import { NotJustForHosting } from './_components/NotJustHosting'
import { Providers } from './_components/Providers'

const JoinedRoom = () => {
  const userID = getUserID()
  const hostID = getHostID()
  const roomID = getRoomID()
  const isHostPlayer = getIsHostPlayer()!
  const user = getUser()!

  const isHost = userID === hostID

  return (
    <Providers
      userID={userID}
      roomID={roomID}
      hostID={hostID}
      user={user}
      isHostPlayer={isHostPlayer}
    >
      {isHost && !isHostPlayer ? <JustHosting /> : <NotJustForHosting />}
    </Providers>
  )
}

export default JoinedRoom
