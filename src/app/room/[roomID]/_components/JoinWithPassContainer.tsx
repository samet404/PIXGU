import JoinWithPass from './JoinWithPass'
import JoinedRoom from './JoinedRoom'
import Connect from './Connect'
import JoinRoom from './JoinRoom'

const JoinWithPassContainer = () => {
  return (
    <JoinWithPass>
      <Connect>
        <JoinRoom>
          <JoinedRoom />
        </JoinRoom>
      </Connect>
    </JoinWithPass>
  )
}

export default JoinWithPassContainer
