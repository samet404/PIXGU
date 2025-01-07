'use client'

import { useGeneralChatLayout } from '@/zustand/store'
import { ChatWrapper } from '../ChatWrapper'
import { Messages } from './components/Messages'

export const GeneralChat = ({ displayName }: Props) => {
  const layout = useGeneralChatLayout((s) => s.value)

  if (layout.isOpen)
    return <ChatWrapper displayName={displayName} name='generalChat' input={layout.input} haveAccess={layout.haveAccess}>
      <Messages />
    </ChatWrapper>
}

type Props = {
  displayName: string
}