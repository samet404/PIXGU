import { Inter } from 'next/font/google'
import MessageInputContent from './components/MessageInputContent'
import MessageList from './components/MessageList'
import ChatUserInfo from './components/ChatUserInfo'
import Blur from './components/Blur'

const inter = Inter({
  subsets: ['latin'],
  weight: ['500', '900'],
})

const ChatSection = () => {
  return (
    <section
      className={`${inter.className} relative flex h-full flex-col rounded-lg bg-[#00000054] shadow-[0_0px_10px_1px_rgba(0,0,0,0.3)] xxs:w-full lg:w-[80%]`}
    >
      <Blur />
      <ChatUserInfo />
      <div
        id="messageList"
        className="flex h-full w-full animate-fade flex-col gap-4 overflow-x-hidden overflow-y-scroll xxs:p-1 lg:p-2 "
      >
        <MessageList />
      </div>
      <MessageInputContent />
    </section>
  )
}
export default ChatSection
