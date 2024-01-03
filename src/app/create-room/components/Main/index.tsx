import { Inter } from 'next/font/google'
import PlayerCount from './components/PlayerCount'
import BackButton from '@/src/components/BackButton'
import ToHomeButton from '@/src/components/ToHomeButton'
import CreateRoomButton from './components/CreateRoomButton'

const inter500 = Inter({
  subsets: ['latin'],
  weight: ['500'],
})

const inter600 = Inter({
  subsets: ['latin'],
  weight: ['600'],
})

const Main = () => {
  return (
    <main className={`${inter500.className} flex w-full flex-col gap-2 p-2`}>
      <PlayerCount />

      <div className="w-full pt-20 leading-4">
        <CreateRoomButton
          className={`${inter600.className} h-full w-full select-none rounded-xl border-[0.3rem] border-[rgba(0,0,0,0.3)] bg-gradient-to-tr from-[#D8F65D] to-[#f1ff2f] py-3 text-[rgba(0,0,0,0.5)] shadow-[0_0px_10px_5px_rgba(255,255,255,0.3)]`}
        />
      </div>
    </main>
  )
}

export default Main
