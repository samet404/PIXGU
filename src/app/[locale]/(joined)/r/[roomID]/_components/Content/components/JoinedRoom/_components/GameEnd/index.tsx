'use client'

import { clsxMerge } from '@/utils/clsxMerge'
import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import { useGameEndedPanel } from '@/zustand/store'
import { Player } from './components/Player'
import { Timer } from './components/Timer'

const Confetti = dynamic(() =>
  import('./components/Confetti').then((m) => m.Confetti),
)

export const GameEnd = ({ userID }: Props) => {
  const panelInfo = useGameEndedPanel((s) => s.value)

  panelInfo
  return (
    <Fragment>
      {panelInfo.isOpen ? <Confetti /> : null}

      <div
        id="gameEnded"
        className={`relative flex overflow-y-scroll pb-10 ${panelInfo.isOpen ? 'animate-fade-blur' : 'hidden animate-hide'} z-50 flex h-full w-full animate-fade flex-col items-center bg-gradient-to-tr from-[#bef5fe] via-[#ebffc5] to-[#bffcd9] pt-[20%]`}
      >
        {panelInfo.isOpen ? <Timer /> : null}
        <div
          className={clsxMerge(
            `relative w-[40rem] text-8xl font-bold text-[#00000034]`,
          )}
        >
          <div className="absolute bottom-7 left-0 flex h-full w-full items-center justify-center">
            GAME ENDED
          </div>
        </div>
        <div className="z-10 flex min-h-[30rem] w-[30rem] animate-fade-up flex-col rounded-lg bg-gradient-to-tr from-gray-200 to-gray-50 p-1 shadow-[0_0px_20px_1px_rgba(0,0,0,0.5)]">
          {panelInfo.isOpen &&
            panelInfo.coins!.map(([ID, amount], i) => {
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
