import type { NextFont } from 'next/font'
import { Pixelify_Sans, Tilt_Neon } from 'next/font/google'
import Image from 'next/image'
import pfp from '@/png/pfp2.png'

const pixelifySans: NextFont = Pixelify_Sans({
  subsets: ['latin'],
  weight: '700',
})

const tiltNeon = Tilt_Neon({ subsets: ['latin'] })

type UserProps = {
    name: string
    score: number
}

const User = ({ name, score }: UserProps) => {
    return (
        <div className="flex flex-row items-center justify-between rounded-md bg-[rgba(255,255,255,0.4)] p-2">
            <div className="flex flex-row items-center gap-2 ">
                <div className="rounded-full  bg-[rgba(0,0,0,0.3)] p-1">
                    <Image
                        src={pfp}
                        sizes="calc(1.15vw + 46px)"
                        alt="profilePicture"
                        className="h-[3rem] w-[3rem] rounded-full"
                    />
                </div>w
                <div className={`${pixelifySans.className} text-black`}>
                    {name}
                </div>
            </div>
            <div
                className={`${tiltNeon.className} rounded-full bg-gradient-to-tl from-purple-400 to-cyan-500 p-1 text-white`}
            >
                {score}
            </div>
        </div>
    )
}
export default User
