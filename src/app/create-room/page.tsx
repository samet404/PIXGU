import Main from './_components/Main'
import Nav from './_components/Nav'
import CreateRoomButton from './_components/CreateRoomButton'
import GradientContainer from './_components/GradientContainer'
import Title from './_components/Title'
import bgImg from '@/jpg/andrii-leonov-5hsI5wXJTQs-unsplash.jpg'
import Image from 'next/image'
import { Fragment } from 'react'

function createRoom() {
  console.log('createRoom')

  return (
    <Fragment>
      <Image
        src={bgImg}
        alt="bgImg"
        className="absolute z-0 h-full w-full object-cover"
      />
      <div
        className={`relative z-10 flex h-full w-full flex-col items-center gap-3 bg-gradient-to-tr from-yellow-600 via-yellow-500 to-transparent py-[1rem]`}
      >
        {/* <Nav /> */}

        <GradientContainer>
          <Main />
          <CreateRoomButton />
        </GradientContainer>
      </div>
    </Fragment>
  )
}

export default createRoom
