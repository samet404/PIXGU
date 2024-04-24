import { Pixelify_Sans, Inter } from 'next/font/google'
import Image from 'next/image'
import pfp from '@/png/pfp2.png'
import { truncateStr } from '@/utils/truncateStr'

const pixelifySans = Pixelify_Sans({
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
    <div
      className={`${className} group group flex w-full flex-row items-center justify-between bg-[rgba(255,255,255,0.1)] p-2 hover:bg-gradient-to-r hover:from-[#ffffff79] hover:to-[#ffffff3b]`}
    >
      <div className="flex w-full flex-row items-center gap-2 peer-hover:bg-red-200 ">
        <Image
          width={46}
          height={46}
          src={profilePicture ?? pfp}
          sizes="calc(1.15vw + 46px)"
          alt="profilePicture"
          className="select-none rounded-full opacity-50 drop-shadow-[0_0px_5px_rgba(0,0,0,0.3)] group-hover:opacity-100"
        />
        <div
          className={`${pixelifySans.className} text-sm tracking-wide text-[#ffffff79] drop-shadow-[0_0px_2px_rgba(0,0,0,0.55)] group-hover:text-[#ffffffd4]`}
        >
          {truncateStr(name, 10)}
        </div>
      </div>
      <div
        className={`${inter.className} flex  items-center justify-center rounded-full bg-gradient-to-br from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0.2)] p-2 text-xs tracking-tighter text-[#ffffff5c] drop-shadow-[0_0px_8px_rgba(0,0,0,0.1)] group-hover:from-yellow-200 group-hover:to-yellow-400 group-hover:text-white`}
      >
        <div className="flex group-hover:drop-shadow-[0_0px_2px_rgba(0,0,0,0.3)]">
          {2}
        </div>
      </div>
    </div>
  )
}
export default User
