import { HostingHealthDisplay } from './components/HostingHealthDisplay'
import { Outfit } from 'next/font/google'
import './styles/scrollbars.css'
import { PlayersSection } from './components/PlayersSection'
import { ConnectToPeers } from './components/ConnectToPeers'
import { Providers } from './components/Providers'
import { getHostID, getRoomID, getUser, getUserID } from '@/context/server'
import dynamic from 'next/dynamic'
import { env } from '@/env/server'

const States = dynamic(() => import('./components/States'))

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
        <div className="flex flex-col items-center gap-4 py-14">
          <PlayersSection />
          {env.NODE_ENV === 'development' && <States />}
        </div>
      </div>
    </Providers>
  )
}

export default Joined
