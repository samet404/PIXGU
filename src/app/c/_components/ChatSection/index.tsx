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
      className={`${inter.className} relative flex h-full grow flex-col rounded-lg bg-[#00000054] shadow-[0_0px_10px_1px_rgba(0,0,0,0.3)]`}
    >
      <Blur />
      <ChatUserInfo />
      <MessageList />
      <MessageInputContent />
    </section>
  )
}
export default ChatSection
