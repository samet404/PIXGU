import { Inter } from 'next/font/google'
import Password from './components/Passsword'
import Name from './components/Name'
import { IsHostPlayer } from './components/IsHostPlayer'

const inter500 = Inter({
  subsets: ['latin'],
  weight: ['600', '500'],
})

const Main = () => {
  return (
    <main
      className={`${inter500.className} z-20 flex h-full w-full flex-col gap-2 p-2`}
    >
      <Name />
      <IsHostPlayer />
      <Password />
    </main>
  )
}

export default Main
