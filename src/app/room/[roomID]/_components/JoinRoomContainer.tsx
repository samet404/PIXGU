import JoinRoom from './JoinRoom'
import JoinedRoom from './JoinedRoom'
import Connect from './Connect'

const JoinRoomContainer = () => {
  return (
    <Connect>
      <JoinRoom>
        <JoinedRoom />
      </JoinRoom>
    </Connect>
  )
}

export default JoinRoomContainer
