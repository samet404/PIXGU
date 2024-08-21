'use client'

import Me from './components/Me'
import { Others } from './components/Others'
import { IsOpen } from './components/IsOpen'

const PlayersSection = () => {
  return (
    <IsOpen>
      <div className="flex h-full w-full flex-col p-2">
        <div className="flex flex-col gap-1">
          <div className="text-[3rem] leading-[4rem] text-[#ffffffdb]  drop-shadow-[0_0px_2px_rgba(0,0,0,0.70)]">
            Players
          </div>
          <div className="pb-[0.40rem] text-[1.2rem] text-[#ffffffdb]  drop-shadow-[0_0px_2px_rgba(0,0,0,0.40)]">
            You can see who is in the room and their status, profile and role.
          </div>
        </div>
        <div className="grid grid-cols-5 grid-rows-5 gap-2 ">
          <Me />
          <Others />
        </div>
      </div>
    </IsOpen>
  )
}

export default PlayersSection
