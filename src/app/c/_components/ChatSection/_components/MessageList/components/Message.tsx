type MessageProps = {
  fromID: string
  toFriendID: string
  text: string
  time: string
}

const Message = ({ fromID, toFriendID, text, time }: MessageProps) => {
  return (
    <div className="flex flex-col gap-2 rounded-md bg-[#00000035] p-1">
      <div className="flex flex-row gap-2 p-2">
        <div className="text-[#ffffffb0]">{text}</div>
      </div>
      <div className="flex flex-col gap-1 text-[#ffffff7e]">
        <div className="text-[0.7rem]">{time}</div>
        <div className="text-[0.7rem]">{fromID}</div>
        <div className="text-[0.7rem]">{toFriendID}</div>
      </div>
    </div>
  )
}
export default Message
