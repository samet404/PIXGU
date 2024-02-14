import Image from 'next/image'
import Link from 'next/link'
import chatIcon from '@/png/icons8-chat-48.png'

const ChatLink = ({ name }: { name: string }) => (
  <Link
    href={`/chat/${name}`}
    className={
      'flex h-10 w-10 items-center justify-center rounded-full bg-[#ffffff7e] p-2 duration-150 hover:bg-[#ffffffba]'
    }
  >
    <Image className="h-full w-full" src={chatIcon} alt="chat-icon" />
  </Link>
)

export default ChatLink
