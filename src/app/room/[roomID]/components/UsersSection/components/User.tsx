import { Pixelify_Sans, Inter } from 'next/font/google'
import Image from 'next/image'
import pfp from '@/png/pfp2.png'
import { type ComponentProps } from 'react'

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
  score: number
  className?: string
}
const User = ({ name, score, className }: UserProps) => {
  return (
    <div
      className={`${className} group group flex w-full flex-row items-center justify-between bg-[rgba(255,255,255,0.1)] p-2 hover:bg-gradient-to-r hover:from-[#ffffff79] hover:to-[#ffffff3b]`}
    >
      <div className="flex w-full flex-row items-center gap-2 peer-hover:bg-red-200 ">
        <Image
          src={pfp}
          sizes="calc(1.15vw + 46px)"
          alt="profilePicture"
          className="h-[2rem] w-[2rem] select-none rounded-full opacity-50 drop-shadow-[0_0px_5px_rgba(0,0,0,0.3)] group-hover:opacity-100"
        />
        <div
          className={`${pixelifySans.className} text-sm text-[#ffffff79] drop-shadow-[0_0px_2px_rgba(0,0,0,0.55)] group-hover:text-[#ffffffd4]`}
        >
          {name}
        </div>
      </div>
      <div
        className={`${inter.className} flex  items-center justify-center rounded-full bg-gradient-to-br from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0.2)] text-xs tracking-tighter text-[#ffffff5c] drop-shadow-[0_0px_8px_rgba(0,0,0,0.1)] group-hover:from-yellow-200 group-hover:to-yellow-400 group-hover:text-white p-2`}
      >
        <div className="flex group-hover:drop-shadow-[0_0px_2px_rgba(0,0,0,0.3)]">
          {score}
        </div>
      </div>
    </div>
  )
}
export default User
