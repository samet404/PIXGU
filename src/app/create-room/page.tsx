import Main from './_components/Main'
import Nav from './_components/Nav'
import CreateRoomButton from './_components/CreateRoomButton'
import GradientContainer from './_components/GradientContainer'
import { Fragment } from 'react'

function createRoom() {
  console.log('createRoom')

  return (
    <Fragment>
     
      <div
        className={`overflow-y-auto relative z-10 flex h-full w-full flex-col items-center gap-3 bg-gradient-to-tr from-[hsla(220,39%,10%,1)] via-[hsla(220,39%,10%,1)] to-transparent py-[1rem]`}
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
