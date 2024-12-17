'use client'

import { useWinnersChatLayout } from '@/zustand/store'
import { ChatWrapper } from '../ChatWrapper'
import { Messages } from './components/Messages'

export const WinnersChat = () => {
  const layout = useWinnersChatLayout((s) => s.value)


  if (layout.isOpen)
    return <ChatWrapper name='winnersChat' input={layout.input} haveAccess={layout.haveAccess}>
      <Messages />
    </ChatWrapper>
}
