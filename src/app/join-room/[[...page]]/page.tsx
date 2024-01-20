import Image from 'next/image'
import bg from '@/jpg/sabine-freiberger--U3b6E3SEww-unsplash.jpg'
import { Fragment } from 'react'
import { Ubuntu } from 'next/font/google'
import Search from './_components/Search'
import Rooms from './_components/Rooms'
import './_styles/scrollbars.css'

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['500'],
})

const JoinRoom = () => {
  return (
    <Fragment>
      <Image
        src={bg}
        className="absolute z-0 h-full w-full object-cover"
        alt="background image"
      />
      <div className="relative z-20 flex h-full w-full flex-col items-center bg-gradient-to-tl from-[#1ac657] via-[#00ae80] to-transparent p-4">
        <div className="flex h-full animate-fade flex-col gap-3 rounded-lg bg-gradient-to-t from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.5)] p-2 xxs:w-full lg:w-[40rem]">
          <Search />
          <Rooms />
        </div>
      </div>
    </Fragment>
  )
}

export default JoinRoom
