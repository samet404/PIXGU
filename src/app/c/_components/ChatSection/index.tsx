import ChatUserInfo from './_components/ChatUserInfo'
import { Inter } from 'next/font/google'
import Blur from './_components/Blur'
import MessageBoxContent from './_components/MessageBoxContent'
import MesssageList from './_components/MessageList'

const inter = Inter({
  subsets: ['latin'],
  weight: ['500', '900'],
})

const ChatSection = async () => {
  return (
    <section
      className={`${inter.className} relative flex h-full grow flex-col rounded-lg bg-[#00000054] shadow-[0_0px_10px_1px_rgba(0,0,0,0.3)]`}
    >
      <Blur />
      <ChatUserInfo />
      <div
        style={{
          overflowAnchor: 'none',
        }}
        className="flex grow flex-col gap-1 overflow-y-scroll p-2"
      >
        <MesssageList />
      </div>
      <div className="flex h-[2.5rem] flex-row rounded-lg bg-[#00000039] shadow-[0_0px_30px_1px_rgba(0,0,0,0.1)]">
        <MessageBoxContent />
      </div>
    </section>
  )
}
export default ChatSection
