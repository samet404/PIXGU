'use client'

import { Messages } from './components/Messages'
import { useGuessChatLayout } from '@/zustand/store'
import { ChatWrapper } from '../ChatWrapper'

export const GuessChat = ({ displayName }: Props) => {
  const layout = useGuessChatLayout((s) => s.value)

  if (layout.isOpen)
    return (
      <ChatWrapper displayName={displayName} name='guessChat' input={layout.input} haveAccess={true}>
        <Messages />
      </ChatWrapper>
    )
}

type Props = {
  displayName: string
}