import { Inter } from 'next/font/google'
import PlayerCount from './components/PlayerCount'
import BackButton from '@/src/components/BackButton'
import ToHomeButton from '@/src/components/ToHomeButton'
import CreateRoomButton from '../CreateRoomButton.'
import Password from './components/Passsword'

const inter500 = Inter({
  subsets: ['latin'],
  weight: ['500'],
})

const Main = () => {
  return (
    <main
      className={`${inter500.className} flex h-full w-full flex-col gap-2 p-2`}
    >
      <PlayerCount
        name="Oyuncu sayısı"
        info="Minimum değere ulasılmadığı taktirde oyun baslamayacaktır."
      />
      <Password />
    </main>
  )
}

export default Main
