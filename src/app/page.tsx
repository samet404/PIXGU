import { Fragment } from 'react'
import Navbar from './_components/Navbar'
import Main from './_components/Main'
import Shortcuts from './_components/Shortcuts'
import HoverEffectDiv from './_components/HoverEffectDiv'
import Image from 'next/image'
import Waves from './_components/Waves'

const Home = () => {
  return (
    <Fragment>
      <Shortcuts />
      <div
        style={{
          backgroundColor: 'hsla(220,39%,10%,1)',
          backgroundImage:
            'radial-gradient(at 100% 100%, hsla(140, 100%, 50%, 0.1) 0px, transparent 50%), radial-gradient(at 2% 0%, hsla(177, 100%, 50%, 0.1) 0px, transparent 50%)',
        }}
        className={` h-full w-full `}
      >
        <HoverEffectDiv>
          <div className="flex animate-fade flex-col gap-10 p-4 duration-[100ms] animate-duration-1000">
            <Navbar />
            <Main />
          </div>
        </HoverEffectDiv>
      </div>
    </Fragment>
  )
}

export default Home
