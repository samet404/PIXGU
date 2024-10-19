import './styles/scrollbars.css'
import { HostingHealthDisplay } from './components/HostingHealthDisplay'
import { Outfit } from 'next/font/google'
import { PlayersSection } from './components/PlayersSection'
import { ConnectToPeers } from './components/ConnectToPeers'
import { Providers } from './components/Providers'
import { getRoomID, getUser, getUserID } from '@/context/server'
import { States } from './components/States'
import { ResetStates } from './components/ResetStates'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['600', '500'],
})

const userID = getUserID()
const roomID = getRoomID()
const user = getUser()!

const Joined = () => {
  return (
    <Providers userID={userID} roomID={roomID} user={user}>
      <div
        id="root"
        className={`${outfit.className} h-full w-full overflow-y-scroll`}
      >
        <ResetStates />
        <ConnectToPeers />
        <HostingHealthDisplay />
        <div className="flex flex-col items-center gap-4 py-14">
          <PlayersSection />
          <States />
        </div>
      </div>
    </Providers>
  )
}

export default Joined
