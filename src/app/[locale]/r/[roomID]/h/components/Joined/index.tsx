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
import type { Locale } from '@/types/locale'
import type { LangObj } from '../../lang'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['600', '700', '500', '400', '300',],
})


const Joined = ({ roomID, user, langObj, guest, locale }: Props) => {
  const userID = user?.id ? user.id : guest!.ID

  return (
    <div
      id="root"
      className={`${outfit.className} h-full w-full overflow-y-scroll`}
    >
      <Providers locale={locale} userID={userID} roomID={roomID} user={user ?? guest!}>
        <ConnectToPeers locale={locale} />
        <UseTimersWorker locale={locale} />
        <HostingHealthDisplay langObj={langObj.health} locale={locale} />
        <MatchTimer />
        <ResetStates />
        <div
          className="flex flex-col bg-[#ffffff13] items-center gap-4 pt-5 pb-[20rem]">
          <Navbar langObj={langObj.navbar} />
          <PlayersSection />
          <Canvases />
          <States />
        </div>
      </Providers>
    </div>
  )
}

export default Joined

type Props = {
  langObj: LangObj
  roomID: string
  locale: Locale
  guest: Guest | null
  user: User | null
}

