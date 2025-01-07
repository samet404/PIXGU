import { Main } from './_components/Main'
import BackgroundImages from './_components/BackgroundImages'
import './_styles/scrollbars.css'
import { Suspense } from 'react'
import Image from 'next/image'
import Logo from '@/png/logo.png'
import Spinner from '@/components/Spinner'
import { Content } from './_components/Content'
import { SocketIOProvider } from './_components/SocketIOProvider'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getLangObj } from './lang'
import type { Locale } from '@/types/locale'

export const metadata: Metadata = {
  title: 'CREATE',
  description: 'Create and rule the room'
}

type Props = {
  params: Promise<{
    locale: Locale
  }>
}

const CreateRoom = async ({ params }: Props) => {
  const { locale } = await params
  const langObj = await getLangObj(locale)

  console.log('langObj roomsDAta', langObj.roomsData)

  return (
    <div
      style={{
        backgroundImage: 'radial-gradient(at 25% 0%, hsla(56, 89%, 62%, 0.715) 0px, transparent 50%), radial-gradient(at 100% 36%, hsla(56,74%,68%,0.2) 0px, transparent 50%)'
      }}
      id="page-root"
      className={` flex h-full w-full flex-col items-center overflow-y-scroll bg-gradient-to-tr from-[hsla(220,39%,10%,1)] via-[#1b2947] to-transparent pt-5`}
    >
      <Suspense>
        <BackgroundImages />
      </Suspense>
      <div className="relative z-10 flex h-full animate-fade flex-col items-center justify-start gap-3 lg:w-[40rem]">
        <Link href='/'>
          <Image
            src={Logo}
            alt="logo"
            className="size-[6rem] select-none object-contain"
            sizes="calc(2.33vw + 90px)"
          ></Image>
        </Link>
        <SocketIOProvider>
          <Suspense fallback={<Spinner />}>
            <Content createRoomBtnText={langObj.createRoomBtnText} createdRoomsCount={langObj.createdRoomsCount} createdRoomsText={langObj.createdRoomsText} roomsDataLang={langObj.roomsData}>
              <Main langObj={langObj.main} />
            </Content>
          </Suspense>
        </SocketIOProvider>
      </div>
    </div>
  )
}

export default CreateRoom
