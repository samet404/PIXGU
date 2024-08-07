import './_styles/scrollbars.css'
import Providers from './_components/Providers'
import {
  getHostID,
  getIsHostPlayer,
  getRoomID,
  getUser,
  getUserID,
} from '@/context/server'
import { JustHosting } from './_components/JustHosting'
import { NotJustForHosting } from './_components/NotJustHosting'

const JoinedRoom = () => {
  const userID = getUserID()
  const roomID = getRoomID()
  const hostID = getHostID()
  const isHostPlayer = getIsHostPlayer()!
  const myUserInfo = getUser()!

  return (
    <Providers
      userID={userID}
      roomID={roomID}
      hostID={hostID}
      myUserInfo={myUserInfo}
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
