import UserSection from './_components/UserSection'
import ChatSection from './_components/ChatSection'
import ClientWrapper from './_components/ClientWrapper'

const Chat = () => {
  return (
    <ClientWrapper>
      <div className="absolute z-0 flex h-full w-full flex-row gap-3 bg-gradient-to-tl from-[rgba(189,255,185,0.4)] via-[rgba(184,244,255,0.4)] to-[rgba(242,255,187,0.4)] p-4">
        <UserSection />
        <ChatSection />
      </div>
    </ClientWrapper>
  )
}

export default Chat
