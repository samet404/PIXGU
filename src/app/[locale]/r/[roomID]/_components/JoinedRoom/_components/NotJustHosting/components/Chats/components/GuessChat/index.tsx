import { Help } from '../Help'
import { Input } from './components/Input'

export const GuessChat = () => {
  return (
    <div className="flex grow flex-col gap-2 rounded-lg p-2">
      <div className="flex flex-row items-center justify-between">
        <div className="text-[0.9rem] leading-3 text-white drop-shadow-[0_0px_2px_rgba(0,0,0,0.2)]">
          Guess Chat
        </div>
        <Help text="You try to guess by writing here what the painter drew." />
      </div>
      <div className="flex flex-row items-center rounded-md bg-[#ffffff73]">
        <Input />
      </div>
      <div className="flex h-full w-full grow flex-col gap-2 overflow-y-scroll rounded-md bg-[#ffffff4a]"></div>
    </div>
  )
}
