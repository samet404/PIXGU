import { type ReactNode } from 'react'

const ChatLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full w-full bg-slate-900">
      <div className="absolute z-0 flex h-full w-full flex-row gap-3 bg-gradient-to-tl from-[rgba(189,255,185,0.4)] via-[rgba(184,244,255,0.4)] to-[rgba(242,255,187,0.4)] p-4">
        <div className="h-full w-[13rem] rounded-lg bg-[#ffffff57] shadow-[0_0px_10px_1px_rgba(0,0,0,0.3)]"></div>
        <div className="flex h-full grow flex-col rounded-lg bg-[#ffffff7b] shadow-[0_0px_10px_1px_rgba(0,0,0,0.3)]">
          {children}
        </div>
      </div>
    </div>
  )
}
export default ChatLayout
