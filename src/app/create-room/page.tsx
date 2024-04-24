import Main from './_components/Main'
import Nav from './_components/Nav'
import CreateRoomButton from './_components/CreateRoomButton'
import GradientContainer from './_components/GradientContainer'
import BackgroundImages from './_components/BackgroundImages'
import waves from '@/png/waves.png'
import Image from 'next/image'
import './_styles/scrollbars.css'

const CreateRoom = () => {
  return (
    <div
      id="page-root"
      className={` h-full w-full overflow-y-auto bg-gradient-to-tr from-[hsla(220,39%,10%,1)] via-[#1b2947] to-transparent pt-5`}
    >
      {/* <Nav /> */}

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-start gap-3">
        <BackgroundImages />
        <GradientContainer>
          <Main />
          <CreateRoomButton />
        </GradientContainer>
      </div>
      <Image className="w-full pt-24 opacity-55" src={waves} alt="waves" />
    </div>
  )
}

export default CreateRoom
