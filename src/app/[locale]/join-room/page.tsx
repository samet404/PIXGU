import './_styles/scrollbars.css'
import { setLocale } from '@/context/server'
import type { Locale } from '@/types'
import IDBox from './_components/IDBox'
import { Rooms } from './_components/Rooms'
import Logo from '@/png/logo.png'
import Image from 'next/image'

const JoinRoom = ({ params }: Props) => {
  setLocale(params.locale)
  return (
    <div
      style={{
        backgroundColor: 'hsla(222,47%,11%,1)',
        backgroundImage:
          'radial-gradient(at 80% 100%,  hsla(222,47%,16%,1) 0px, transparent 50%),radial-gradient(at 0% 0%, #ff37a578 0px, transparent 50%)',
      }}
      className="relative z-20 flex h-full w-full flex-row items-center justify-center gap-3 bg-gradient-to-tl from-[hsla(220,39%,10%,1)] via-[hsla(220,39%,10%,1)] to-transparent p-4"
    >
      <div className="flex h-full grow">
        <Image
          src={Logo}
          alt="logo"
          className="size-[6rem] select-none object-contain"
          sizes="calc(2.33vw + 90px)"
        ></Image>
      </div>
      <div className="flex h-full animate-fade items-start gap-1 rounded-lg bg-gradient-to-tr from-[#2de77a] via-[#74ffae] to-[#2de77a] p-1 shadow-[0_0px_20px_1px_#7eea7872]">
        <Rooms />
        <IDBox />
      </div>
    </div>
  )
}

export default JoinRoom

type Props = {
  params: {
    locale: Locale
  }
}
