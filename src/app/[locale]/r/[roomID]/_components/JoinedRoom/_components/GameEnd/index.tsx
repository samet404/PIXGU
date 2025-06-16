'use client'

import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import { useGameEndedPanel } from '@/zustand/store/useGameEndedPanel'
import { Player } from './components/Player'
import { Timer } from './components/Timer'
import { Bg } from './components/Bg'


const Confetti = dynamic(() =>
  import('./components/Confetti').then((m) => m.Confetti),
)

export const GameEnd = ({ userID }: Props) => {
  const panelInfo = useGameEndedPanel((s) => s.value)

  if (panelInfo.isOpen) return (
    <Fragment>
      <Confetti />

      <div
        id="gameEnded"
        className={`selection:!bg-[#dfb4b9] p-4 flex absolute  animate-fade-blur z-50  h-full w-full flex-col items-center`}
      >
        <Bg isOpen={!!panelInfo} />
        <Timer />
        <div className='text-[#ffffffe0] animate-fade-blur drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)] text-[3rem] font-[700]'>
          GAME ENDED
        </div>
        <div
          style={{
            scrollbarWidth: 'none'
          }}
          className="z-10 animate-delay-1000 flex grow w-[30rem] overflow-y-scroll animate-fade-up flex-col rounded-lg bg-gradient-to-tr from-gray-200 to-gray-50 p-1 shadow-[0_0px_20px_1px_rgba(0,0,0,0.5)]">
          {panelInfo.coins!.map(([ID, amount], i) => {
            return (
              <Player
                key={ID}
                myUserID={userID}
                ID={ID}
                index={i}
                coin={amount}
              />
            )
          })}
        </div>
      </div>
    </Fragment>
  )
}

type Props = {
  userID: string
}
