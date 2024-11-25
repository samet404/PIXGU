import './styles/scrollbars.css'
import { HostingHealthDisplay } from './components/HostingHealthDisplay'
import { Outfit } from 'next/font/google'
import { PlayersSection } from './components/PlayersSection'
import { ConnectToPeers } from './components/ConnectToPeers'
import { Providers } from './components/Providers'
import { States } from './components/States'
import { ResetStates } from './components/ResetStates'
import { Navbar } from './components/Navbar'
import { Canvases } from './components/Canvases'
import type { User } from 'lucia'
import { UseTimersWorker } from './components/UseTimersWorker'
import type { Guest } from '@/types/guest'
import { MatchTimer } from './components/MatchTimer'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['600', '700', '500', '400', '300',],
})


const Joined = ({ roomID, user, guest }: Props) => {
  const userID = user?.id ? user.id : guest!.ID

  return (
    <Providers userID={userID} roomID={roomID} user={user ?? guest!}>
      <div
        id="root"
        className={`${outfit.className} h-full w-full overflow-y-scroll`}
      >
        <MatchTimer />
        <UseTimersWorker roomID={roomID} />
        <ResetStates />
        <ConnectToPeers />
        <HostingHealthDisplay />
        <div
          style={{
            backgroundImage: 'radial-gradient(at 100% 0%, hsla(210,53%,50%,0.3) 0px, transparent 50%), radial-gradient(at 0% 0%, hsla(210,73%,57%,0.6) 0px, transparent 50%)'
          }}
          className="flex flex-col items-center gap-4 py-5 min-h-[70rem]">
          <Navbar />
          <PlayersSection />
          <Canvases />

          <States />
        </div>
      </div>
    </Providers>
  )
}

export default Joined

type Props = {
  roomID: string
  guest: Guest | null
  user: User | null
}

