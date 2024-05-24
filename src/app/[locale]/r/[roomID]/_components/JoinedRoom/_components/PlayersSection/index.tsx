import { getRoomID, getUserID } from '@/context/server'
import Me from './components/Me'
import dynamic from 'next/dynamic'

const Others = dynamic(() => import('./components/Others'), {
  ssr: false,
})

const PlayersSection = () => {
  const roomID = getRoomID()
  const userID = getUserID()

  return (
    <section id="playersSection" className="h-full overflow-y-scroll pr-2">
      <div className="flex w-[12rem] flex-col shadow-xl">
        <Me />
        <Others roomID={roomID} userID={userID} />
      </div>
    </section>
  )
}

export default PlayersSection
