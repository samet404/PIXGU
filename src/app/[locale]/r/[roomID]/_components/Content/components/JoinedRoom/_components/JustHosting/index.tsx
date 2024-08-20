import { HostingHealthDisplay } from './components/HostingHealthDisplay'
import { Outfit } from 'next/font/google'
import './styles/scrollbars.css'
import { Players } from './components/Players'
import ConnectToPeers from './components/ConnectToPeers'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['600'],
})

export const JustHosting = () => {
  return (
    <div
      id="root"
      className={`${outfit.className} h-full w-full overflow-y-scroll`}
    >
      <ConnectToPeers />
      <HostingHealthDisplay />
      <div className="flex flex-col items-center py-14">
        <Players />
      </div>
    </div>
  )
}
