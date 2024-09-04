// import Main from './_components/Main'
// import CreateRoomButton from './_components/CreateRoomButton'
// import GradientContainer from './_components/GradientContainer'
// import BackgroundImages from './_components/BackgroundImages'

// import './_styles/scrollbars.css'
// import dynamic from 'next/dynamic'
// import { api } from '@/trpc/server'
// import { Suspense } from 'react'
// import { Waves } from './_components/Waves'

// const ErrDisplay = dynamic(() => import('@/components/ErrDisplay'))

const CreateRoom = async () => {
  // const isLogged = await api.auth.isLogged.query()
  // if (!isLogged) return <ErkrDisplay msg="UNAUTHORZIED" redirectTo="/login" />

  return (
    <div
      id="page-root"
      className={` h-full w-full overflow-y-auto bg-gradient-to-tr from-[hsla(220,39%,10%,1)] via-[#1b2947] to-transparent pt-5`}
    >
      {/* <Nav /> */}

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-start gap-3">
        {/* <Suspense>
          <BackgroundImages />
        </Suspense>
        <GradientContainer>
          <Main />
          <CreateRoomButton />
        </GradientContainer>
        <Suspense>
          <Waves />
        </Suspense> */}
      </div>
    </div>
  )
}

export default CreateRoom
