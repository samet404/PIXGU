import { type ReactNode } from 'react'
import UserSection from './_components/UserSection'
import ChatSection from './_components/ChatSection'

const ChatLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full w-full bg-slate-900">
      <div className="absolute z-0 flex h-full w-full flex-row gap-3 bg-gradient-to-tl from-[rgba(189,255,185,0.4)] via-[rgba(184,244,255,0.4)] to-[rgba(242,255,187,0.4)] p-4">
        <UserSection />
        <ChatSection>{children}</ChatSection>
      </div>
    </div>
  )
}
export default ChatLayout
