import JoinWithPass from './JoinWithPass'
import JoinedRoom from './JoinedRoom'
import Connect from './Connect'
import JoinRoom from './JoinRoom'
import { Urbanist } from 'next/font/google'
import GetUser from './GetUser'

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
        <GetUser>
          <Connect>
            <JoinRoom>
              <JoinedRoom />
            </JoinRoom>
          </Connect>
        </GetUser>
      </JoinWithPass>
    </div>
  )
}

export default JoinWithPassContainer
