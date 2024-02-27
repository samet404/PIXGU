import Pfp from './components/Pfp'
import Username from './components/Username'

const ChatUserInfo = () => {
  return (
    <div className="w-full flex flex-row gap-3 items-center rounded-t-lg bg-[#0000001f] p-2">
      <Pfp />
      <Username />
    </div>
  )
}
export default ChatUserInfo
