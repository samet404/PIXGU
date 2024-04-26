import JoinWithPass from './JoinWithPass'
import JoinedRoom from './JoinedRoom'
import Connect from './Connect'
import JoinRoom from './JoinRoom'
import { Urbanist } from 'next/font/google'

const urbanist = Urbanist({
  weight: ['600'],
  subsets: ['latin'],
})

const JoinWithPassContainer = () => {
  return (
    <div className={`${urbanist.className} w-full text-white`}>
      <JoinWithPass>
        <Connect>
          <JoinRoom>
            <JoinedRoom />
          </JoinRoom>
        </Connect>
      </JoinWithPass>
    </div>
  )
}

export default JoinWithPassContainer
