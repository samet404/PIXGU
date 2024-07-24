import './_styles/scrollbars.css'
import Providers from './_components/Providers'
import {
  getHostID,
  getIsHostPlayer,
  getRoomID,
  getUserID,
} from '@/context/server'
import { JustHosting } from './_components/JustHosting'
import { NotJustForHosting } from './_components/NotJustHosting'

const JoinedRoom = () => {
  const userID = getUserID()
  const roomID = getRoomID()
  const hostID = getHostID()
  const isHostPlayer = getIsHostPlayer()!

  return (
    <Providers
      userID={userID}
      roomID={roomID}
      hostID={hostID}
      isHostPlayer={isHostPlayer}
    >
      {!isHostPlayer && hostID === userID ? (
        <JustHosting />
      ) : (
        <NotJustForHosting />
      )}
    </Providers>
  )
}

export default JoinedRoom
