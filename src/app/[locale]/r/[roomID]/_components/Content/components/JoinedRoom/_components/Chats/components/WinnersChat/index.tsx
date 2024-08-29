'use client'

import { useWinnersChatLayout } from '@/zustand/store'
import { Change } from '../Change'
import { Help } from '../Help'
import { Input } from './components/Input'
import { Messages } from './components/Messages'

export const WinnersChat = () => {
  const layout = useWinnersChatLayout((s) => s.value)

  // if (!layout.haveAccess)
  //   return (
  //     <div className="flex w-full animate-fade flex-col gap-2 rounded-lg bg-gradient-to-r from-[#c3c366] to-[#5ddec4] p-2">
  //       <Change to="guessChat" />
  //       <div className="text-lg text-white">
  //         You need to find answer to unlock here
  //       </div>
  //     </div>
  //   )

  if (layout.isOpen)
    return (
      <div className="flex w-full animate-fade flex-col gap-2 rounded-lg bg-gradient-to-r from-[#69c366] to-[#65D6C0]">
        <div className="relative flex h-[90vh] w-full flex-col gap-2 rounded-xl bg-[#ffd90026] p-2 shadow-[0_0px_20px_20px_rgba(0,0,0,0.1)]">
          <div className="flex flex-row gap-2">
            {layout.change ? <Change to="guessChat" /> : null}
            {layout.info ? (
              <Help text="Connect with the winners here! Be aware we do not store your messages, your conversations are private. However, any player can view them to ensure a positive experience. Please refrain from sharing personal information." />
            ) : null}
          </div>

          <div className="chatMsgContainer flex h-full w-full grow flex-col gap-2 overflow-y-scroll rounded-md bg-[#ffffff4a] py-1 pl-2 pr-1">
            <Messages />
          </div>
        </div>
        {layout.input ? (
          <div className="flex flex-row items-center rounded-md bg-[#ffffff73]">
            <Input />
          </div>
        ) : null}
      </div>
    )
}
