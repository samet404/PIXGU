'use client'

import { Messages } from './components/Messages'
import { useGuessChatLayout } from '@/zustand/store'
import { ChatWrapper } from '../ChatWrapper'

export const GuessChat = () => {
  const layout = useGuessChatLayout((s) => s.value)

  if (layout.isOpen)
    return (
      <ChatWrapper name='guessChat' input={layout.input} haveAccess={true}>
        <Messages />
      </ChatWrapper>
    )
}
