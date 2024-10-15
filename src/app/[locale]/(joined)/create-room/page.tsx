import Main from './_components/Main'
import BackgroundImages from './_components/BackgroundImages'
import './_styles/scrollbars.css'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Image from 'next/image'
import Logo from '@/png/logo.png'
import Spinner from '@/components/Spinner'
import { Content } from './_components/Content'
import { SocketIO } from './_components/SocketIO'

const CreateRoom = async () => {
  return (
    <SocketIO>
      <div
        id="page-root"
        className={` flex h-full w-full flex-col items-center overflow-y-scroll bg-gradient-to-tr from-[hsla(220,39%,10%,1)] via-[#1b2947] to-transparent pt-5`}
      >
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
            <Content>
              <Main />
            </Content>
          </Suspense>
        </div>
      </div>
    </SocketIO>
  )
}

export default CreateRoom
