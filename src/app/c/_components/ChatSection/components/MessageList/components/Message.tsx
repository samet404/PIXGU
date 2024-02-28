import { useEffect, type RefObject } from 'react'

type MessageProps = {
  fromID: string
  toFriendID: string
  fromUsernameWithUsernameID: string
  toFriendUsernameWithUsernameID: string
  text: string
  time: string
}

const Message = ({
  fromID,
  toFriendID,
  text,
  time,
  fromUsernameWithUsernameID,
  toFriendUsernameWithUsernameID,
}: MessageProps) => {
  const date = new Date(time)

  useEffect(() => {
    const messageList = document.getElementById('messageList')
    const scrollHeight = messageList!.scrollHeight
    const clientHeight = messageList!.clientHeight

    messageList!.scrollTop = scrollHeight - clientHeight
  }, [])

  return (
    <div>
      <div className="flex animate-fade-up flex-col items-start gap-1 rounded-md p-1">
        <div className="flex flex-row items-center gap-2 rounded-md text-[0.8rem] text-[#ffffff8c]">
          {fromUsernameWithUsernameID}
          <div className="text-[0.5rem]">
            {`${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
          </div>
        </div>

        <div className="flex flex-row gap-2 rounded-md bg-[#0000001b] px-2 py-1">
          <div className="text-[#ffffff9a]">{text}</div>
        </div>
      </div>
    </div>
  )
}
export default Message
