import { truncateStr } from '@/utils/truncateStr'
import { Img } from './components/Img'
import { Urbanist, Inter } from 'next/font/google'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: '700',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['700'],
})

type UserProps = {
  name: string
  className?: string
  profilePicture?: string | null
}

const User = ({ name, className, profilePicture }: UserProps) => {
  return (
    <div className="group group flex w-full flex-row items-center justify-center text-ellipsis rounded-lg bg-[#ffffff2e] p-2">
      <div className="flex w-full flex-row items-center gap-2">
        {profilePicture ? (
          <Img src={profilePicture} />
        ) : (
          <div className="flex-shrink-0 select-none rounded-full bg-white drop-shadow-[0_0px_5px_rgba(0,0,0,0.3)] "></div>
        )}
        <div
          className={`${urbanist.className} line-clamp-1 w-[70%] break-all pr-1 text-sm tracking-wide text-[#ffffffd4] drop-shadow-[0_0px_2px_rgba(0,0,0,0.55)]`}
        >
          {name}
        </div>
      </div>
      <div
        className={`${inter.className} flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 p-2 text-xs tracking-tighter text-white drop-shadow-[0_0px_8px_rgba(0,0,0,0.1)]`}
      >
        <div className="flex items-center justify-center drop-shadow-[0_0px_2px_rgba(0,0,0,0.3)]">
          {2222}
        </div>
      </div>
    </div>
  )
}
export default User
