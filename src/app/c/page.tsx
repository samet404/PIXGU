import { api } from '@/src/trpc/server'
import UserSection from './_components/UserSection'
import ChatSection from './_components/ChatSection'
import ClientWrapper from './_components/ClientWrapper'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['500', '900'],
})

const Chat = async () => {
  
  return (
    <ClientWrapper>
      <div className="absolute z-0 flex h-full w-full flex-row gap-3 bg-gradient-to-tl from-[rgba(189,255,185,0.4)] via-[rgba(184,244,255,0.4)] to-[rgba(242,255,187,0.4)] p-4">
        <UserSection />
        <section
          className={`${inter.className} relative flex h-full grow flex-col rounded-lg bg-[#ffffff7b] shadow-[0_0px_10px_1px_rgba(0,0,0,0.3)]`}
        >
          {/* {firstFriend ? <ChatSection /> : null} */}
        </section>
      </div>
    </ClientWrapper>
  )
}

export default Chat
