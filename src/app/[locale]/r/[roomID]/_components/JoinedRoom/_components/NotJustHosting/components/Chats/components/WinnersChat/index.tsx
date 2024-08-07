import Image from 'next/image'
import sendImg from '@/png/icons8-send-30-black.png'
import { Help } from '../Help'

export const WinnersChat = () => {
  return (
    <div className="flex grow flex-col gap-2 rounded-xl bg-[#ffd90026] p-2 shadow-[0_0px_20px_20px_rgba(0,0,0,0.1)]">
      <div className="flex flex-row items-center justify-between">
        <div className="text-[0.9rem] leading-3 text-white drop-shadow-[0_0px_2px_rgba(0,0,0,0.2)]">
          Winners Chat
        </div>
        <Help text="You can chat with the winners here." />
      </div>
      <div className="flex flex-row items-center rounded-md bg-[#ffffff73]">
        <input
          spellCheck={false}
          type="text"
          className="w-full px-2 py-1 text-[#00000081]"
        />
        <button className="h-full rounded-r-md bg-[#ffffff84] px-2 py-1 shadow-[0_0px_10px_1px_rgba(0,0,0,0.1)]">
          <Image src={sendImg} alt="send" className="size-6 opacity-20" />
        </button>
      </div>

      <div className="flex h-full w-full grow flex-col overflow-y-visible rounded-md bg-[#ffffff4a]"></div>
    </div>
  )
}
