import { Change } from '../Change'
import { Help } from '../Help'
import { Input } from './components/Input'
import { IsOpenWrapper } from './components/IsOpenWrapper'
import { Messages } from './components/Messages'

export const WinnersChat = () => {
  return (
    <IsOpenWrapper>
      <div className="flex h-full w-full  animate-fade flex-col  rounded-lg bg-gradient-to-r from-[#65D6C0] to-[rgb(255,229,135)]">
        <div className="relative flex h-[90vh] w-full flex-col gap-2 rounded-xl bg-[#ffd90026] p-2 shadow-[0_0px_20px_20px_rgba(0,0,0,0.1)]">
          <div className="flex flex-row items-center justify-between">
            <div className="text-[0.9rem] leading-3 text-white drop-shadow-[0_0px_2px_rgba(0,0,0,0.2)]">
              Winners Chat
            </div>

            <div className="flex flex-row gap-2">
              <Change to="guessChat" />
              <Help text="Connect with the winners here! Be aware we do not store your messages, your conversations are private. However, any player can view them to ensure a positive experience. Please refrain from sharing personal information." />
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
