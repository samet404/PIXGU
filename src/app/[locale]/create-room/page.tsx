import Main from './_components/Main'
import CreateRoomButton from './_components/CreateRoomButton'
import GradientContainer from './_components/GradientContainer'
import BackgroundImages from './_components/BackgroundImages'

import './_styles/scrollbars.css'
import dynamic from 'next/dynamic'
import { api } from '@/trpc/server'
import { Suspense } from 'react'
import { Waves } from './_components/Waves'
import { CreatedRooms } from './_components/CreatedRooms'
import Image from 'next/image'
import Logo from '@/png/logo.png'
import Spinner from '@/components/Spinner'

const ErrDisplay = dynamic(() => import('@/components/ErrDisplay'))

const CreateRoom = async () => {
  const isLogged = await api.auth.isLogged.query()
  if (!isLogged) return <ErrDisplay msg="UNAUTHORZIED" redirectTo="/login" />

  return (
    <div
      id="page-root"
      className={` flex h-full w-full flex-col items-center overflow-y-scroll bg-gradient-to-tr from-[hsla(220,39%,10%,1)] via-[#1b2947] to-transparent pt-5`}
    >
      {/* <Nav /> */}

      <Suspense>
        <BackgroundImages />
      </Suspense>
      <div className="relative z-10 flex h-full animate-fade flex-col items-center justify-start gap-3 lg:w-[40rem]">
        <Image
          src={Logo}
          alt="logo"
          className="size-[6rem] select-none object-contain"
          sizes="calc(2.33vw + 90px)"
        ></Image>
        <Suspense fallback={<Spinner />}>
          <GradientContainer>
            <Main />
            <CreateRoomButton />
          </GradientContainer>
          <CreatedRooms />
        </Suspense>
      </div>
      {/* <Waves /> */}
    </div>
  )
}

export default CreateRoom
