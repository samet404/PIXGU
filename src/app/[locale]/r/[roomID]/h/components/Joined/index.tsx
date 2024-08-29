import { HostingHealthDisplay } from './components/HostingHealthDisplay'
import { Outfit } from 'next/font/google'
import './styles/scrollbars.css'
import { PlayersSection } from './components/PlayersSection'
import { ConnectToPeers } from './components/ConnectToPeers'
import { Providers } from './components/Providers'
import { getHostID, getRoomID, getUser, getUserID } from '@/context/server'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['600', '500'],
})

const userID = getUserID()
const hostID = getHostID()
const roomID = getRoomID()
const user = getUser()!

const Joined = () => {
  return (
    <Providers hostID={hostID} userID={userID} roomID={roomID} user={user}>
      <div
        id="root"
        className={`${outfit.className} h-full w-full overflow-y-scroll`}
      >
        <ConnectToPeers />
        <HostingHealthDisplay />
        <div className="flex flex-col items-center py-14">
          <PlayersSection />
        </div>
      </div>
    </Providers>
  )
}

export default Joined
