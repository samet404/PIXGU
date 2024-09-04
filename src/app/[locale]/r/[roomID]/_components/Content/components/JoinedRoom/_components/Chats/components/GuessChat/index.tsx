'use client'

import { Help } from '../Help'
import { Input } from './components/Input'
import { Messages } from './components/Messages'
import { Change } from '../Change'
import { useGuessChatLayout } from '@/zustand/store'

export const GuessChat = () => {
  const layout = useGuessChatLayout((s) => s.value)

  if (layout.isOpen)
    return (
      <div className="flex w-full animate-fade flex-col gap-2 rounded-lg bg-gradient-to-tr from-[#8acc87] to-[#65cfb9]">
        <div className="relative flex h-full w-full flex-col gap-2 rounded-lg p-2">
          <div className="flex w-full flex-row justify-end gap-2">
            {layout.change ? <Change to="winnersChat" /> : null}
            {layout.info ? (
              <Help text="Connect with the guessrs here! Be aware we do not store your messages, your conversations are private. However, any player can view them to ensure a positive experience. Please refrain from sharing personal information." />
            ) : null}
          </div>

          <div
            style={{
              overflowAnchor: 'auto',
            }}
            id="guessChatMsgContainer"
            className="chatMsgContainer flex h-full w-full grow flex-col gap-2 overflow-y-scroll rounded-md bg-[#ffffff4a] py-1 pl-2 pr-1"
          >
            <Messages />
          </div>
          {layout.input ? <Input /> : null}
        </div>
      </div>
    )
}
