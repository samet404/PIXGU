import './_styles/scrollbars.css'
import type { Locale } from '@/types'
import { Rooms } from './_components/Rooms'
import Logo from '@/png/logo.png'
import Image from 'next/image'
import { Outfit } from 'next/font/google'
import type { Metadata } from 'next'
import Link from 'next/link'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '700', '600'],
})

export const metadata: Metadata = {
  title: 'JOIN',
  description: 'Find rooms and start to play!'
}


const JoinRoom = async ({ params }: Props) => {
  return (
    <div
      style={{
        backgroundColor: 'hsla(222,47%,11%,1)',
        backgroundImage:
          'radial-gradient(at 80% 100%,  hsla(222,47%,16%,1) 0px, transparent 50%),radial-gradient(at 0% 0%, #ff37a578 0px, transparent 50%)',
      }}
      className={`${outfit.className} relative z-20 flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-tl from-[hsla(220,39%,10%,1)] via-[hsla(220,39%,10%,1)] to-transparent p-4`}
    >
      <div className="flex flex-row items-end justify-between xxs:w-full lg:w-[50rem] ">
        <Link href='/'>
          <Image
            src={Logo}
            alt="logo"
            className="size-[6rem] select-none object-contain"
            sizes="calc(2.33vw + 90px)"
          ></Image>
        </Link>
        <div className="text-[#be2796]">Don't forget, join rooms near you to reduce ping</div>
      </div>
      <Rooms />
    </div>
  )
}

export default JoinRoom

type Props = {
  params: Promise<{
    locale: Locale
  }>
}
