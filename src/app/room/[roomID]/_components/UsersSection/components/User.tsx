import { Pixelify_Sans, Tilt_Neon } from 'next/font/google'
import Image from 'next/image'
import pfp from '@/png/pfp2.png'

const pixelifySans = Pixelify_Sans({
  subsets: ['latin'],
  weight: '700',
})

const tiltNeon = Tilt_Neon({ subsets: ['latin'] })

type UserProps = {
  name: string
  score: number
  className?: string
}

const User = ({ name, score, className }: UserProps) => {
  return (
    <div
      className={`${className} flex w-full flex-row items-center  justify-between border-b-[0.25rem] border-[#0000002e] bg-[rgba(255,255,255,0.54)] p-2`}
    >
      <div className="flex w-full flex-row items-center gap-2 ">
        <Image
          src={pfp}
          sizes="calc(1.15vw + 46px)"
          alt="profilePicture"
          className="h-[2rem] w-[2rem] rounded-full drop-shadow-[0_0px_5px_rgba(0,0,0,0.3)] select-none"
        />
        <div
          className={`${pixelifySans.className} text-md text-[#ffffffc3] drop-shadow-[0_0px_2px_rgba(0,0,0,0.55)]`}
        >
          {name}
        </div>
      </div>
      <div
        className={`${tiltNeon.className} rounded-full  bg-gradient-to-br from-[#ffff00cb] to-[#ffa600ca] p-2 text-sm text-[#00000048] drop-shadow-[0_0px_5px_rgba(0,0,0,0.2)]`}
      >
        {score}
      </div>
    </div>
  )
}
export default User
