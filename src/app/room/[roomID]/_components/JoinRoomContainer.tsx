import JoinRoom from './JoinRoom'
import JoinedRoom from './JoinedRoom'
import Connect from './Connect'
import { Urbanist } from 'next/font/google'

const urbanist = Urbanist({
  weight: ['600'],
  subsets: ['latin'],
})

const JoinRoomContainer = () => {
  return (
    <div className={`${urbanist.className} w-full text-white`}>
      <Connect>
        <JoinRoom>
          <JoinedRoom />
        </JoinRoom>
      </Connect>
    </div>
  )
}

export default JoinRoomContainer
