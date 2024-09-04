import { Img } from './components/Img'
import { Urbanist, Inter } from 'next/font/google'
import {
  useGuessedPlayers,
  useSpectators,
  useWhoIsPainterClient,
  type Player,
} from '@/zustand/store'
import Link from 'next/link'
import { clsxMerge } from '@/utils/clsxMerge'
import { Coin } from './components/Coin'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: '700',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['700'],
})

type Props = Omit<Player, 'username' | 'usernameID'>

const User = ({ id, usernameWithUsernameID, profilePicture }: Props) => {
  const isPainter = useWhoIsPainterClient((s) => s.isPainter(id))
  const isGuessed = useGuessedPlayers((s) => s.isGuessed(id))
  const isSpectator = useSpectators((s) => s.isSpectator(id))

  return (
    <Link
      href={`u/${id}`}
      prefetch={false}
      target="_blank"
      className={clsxMerge(
        'group group flex w-full flex-row items-center justify-center text-ellipsis rounded-lg bg-[#ffffff2e] p-2 duration-300',
        {
          'bg-[rgba(254,240,41,0.22)]': isGuessed,
          'bg-[rgba(179,104,255,0.33)]': isPainter,
          'opacity-50': isSpectator,
        },
      )}
    >
      <div className="flex w-full flex-row items-center gap-2">
        {profilePicture ? (
          <Img src={profilePicture} />
        ) : (
          <div className="flex-shrink-0 select-none rounded-full bg-white drop-shadow-[0_0px_5px_rgba(0,0,0,0.3)] "></div>
        )}
        <div
          className={`${urbanist.className} line-clamp-1 w-[70%] break-all pr-1 text-sm tracking-wide text-[#ffffffd4] drop-shadow-[0_0px_2px_rgba(0,0,0,0.55)]`}
        >
          {usernameWithUsernameID}
        </div>
      </div>
      <div
        className={`${inter.className} flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 p-2 text-xs tracking-tighter text-white drop-shadow-[0_0px_8px_rgba(0,0,0,0.1)]`}
      >
        <div className="flex w-14 items-center justify-center leading-3 drop-shadow-[0_0px_2px_rgba(0,0,0,0.3)]">
          <Coin ID={id} />
        </div>
      </div>
    </Link>
  )
}
export default User
