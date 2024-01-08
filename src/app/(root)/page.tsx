import { Fragment } from 'react'
import Navbar from './components/Navbar'
import Main from './components/Main'
import Shortcuts from './components/Shortcuts'
import HoverEffectDiv from './components/HoverEffectDiv'
import Image from 'next/image'
import Wave from './components/Waves'


const Home = () => {
  return (
    <Fragment>
      <Shortcuts />
      <div
        style={{
          backgroundColor: 'hsla(220,39%,10%,1)',
          backgroundImage:
            'radial-gradient(at 100% 100%, hsla(41,100%,54%,0.1) 0px, transparent 50%), radial-gradient(at 2% 0%, hsla(343,100%,76%,0.16) 0px, transparent 50%)',
        }}
        className={` h-full w-full `}
      >
        <HoverEffectDiv>
          <div
            className="flex animate-fade flex-col gap-10 p-4 duration-[100ms]
    animate-duration-1000"
          >
            <Navbar />
            <Main />
          </div>
        </HoverEffectDiv>
      <Waves />
      </div>
    </Fragment>
  )
}

export default Home
