import { Fragment } from 'react'
import CanvasSection from './_components/CanvasSection'
import UsersSection from './_components/UsersSection'
import { Tilt_Neon, MuseoModerno } from 'next/font/google'

const tiltNeon = Tilt_Neon({ subsets: ['latin'] })
const museoModerno = MuseoModerno({ subsets: ['latin'], weight: '500' })
const Game = () => {
  return (
    <Fragment>
      <div
        style={{
          backgroundColor: 'hsla(204, 100%, 11%, 1)',
          backgroundImage:
            'radial-gradient(at 100% 100%, hsla(54, 100%, 50%, 0.215) 0px, transparent 50%), radial-gradient(at 2% 0%, hsla(50, 100%, 50%, 0.255) 0px, transparent 50%)',
        }}
        id="rootDiv"
        className="h-full w-full overflow-y-scroll p-3"
      >
        <div className="flex h-full w-full animate-fade-down flex-row gap-2">
          <UsersSection />
          <div className="flex w-full flex-col items-center gap-3 ">
            <div className=" rounded-lg bg-[#ffffff68] p-2 shadow-[0_0px_13px_0px_rgba(0,0,0,0.4)] ">
              <CanvasSection />
            </div>
          </div>
        </div>
      </div>

      <div></div>
    </Fragment>
  )
}

export default Game
