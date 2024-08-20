import { Help } from '../Help'
import { Input } from './components/Input'
import { Messages } from './components/Messages'
import { IsOpenWrapper } from './components/IsOpenWrapper'
import { Urbanist } from 'next/font/google'
import { Change } from '../Change'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: '700',
})

export const GuessChat = () => {
  return (
    <IsOpenWrapper>
      <div
        className={`${urbanist.className} sticky top-0 flex h-[90vh]  w-[20rem] animate-fade flex-col rounded-lg bg-gradient-to-r from-[#69c366] to-[#65D6C0]`}
      >
        <div className="relative flex w-full flex-col gap-2 rounded-lg p-2">
          <div className="flex flex-row items-center justify-between">
            <div className="text-[0.9rem] leading-3 text-white drop-shadow-[0_0px_2px_rgba(0,0,0,0.2)]">
              Guess Chat
            </div>
            <div className="flex flex-row gap-2">
              <Change to="winnersChat" />
              <Help text="Connect with the guessrs here! Be aware we do not store your messages, your conversations are private. However, any player can view them to ensure a positive experience. Please refrain from sharing personal information." />
            </div>
          </div>
          <div className="flex flex-row items-center rounded-md bg-[#ffffff73]">
            <Input />
          </div>
          <div className="flex h-full w-full grow flex-col gap-2 overflow-y-scroll rounded-md bg-[#ffffff4a] py-1 pl-2 pr-1">
            <Messages />
          </div>
        </div>
      </div>
    </IsOpenWrapper>
  )
}
