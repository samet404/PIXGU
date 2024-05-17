import CheckRoomPermInServer from './CheckRoomPermInServer'
import JoinWithPass from './JoinWithPass'
import JoinedRoom from './JoinedRoom'
import { Urbanist } from 'next/font/google'

const urbanist = Urbanist({
  weight: ['600'],
  subsets: ['latin'],
})

const JoinWithPassContainer = () => {
  return (
    <div
      className={`${urbanist.className} h-full w-full items-center justify-center text-center text-white`}
    >
      <JoinWithPass>
        <CheckRoomPermInServer>
          <JoinedRoom />
        </CheckRoomPermInServer>
      </JoinWithPass>
    </div>
  )
}

export default JoinWithPassContainer
