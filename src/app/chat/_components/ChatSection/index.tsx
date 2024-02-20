import { type ReactNode } from 'react'

const ChatSection = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex h-full grow flex-col rounded-lg bg-[#ffffff7b] shadow-[0_0px_10px_1px_rgba(0,0,0,0.3)]">
      {children}
    </div>
  )
}
export default ChatSection
