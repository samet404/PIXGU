import {
  user2InfoPfpAtom,
  selectedUserInfoIDAtom,
  selectedUserInfoPfpAtom,
} from '@/app/c/atoms'
import { useAtomValue } from 'jotai'
import { useEffect, type RefObject } from 'react'
import Image from 'next/image'

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
  console.log(fromUsernameWithUsernameID, text)
  const date = new Date(time)
  const friendPfp = useAtomValue(selectedUserInfoPfpAtom)
  const friendID = useAtomValue(selectedUserInfoIDAtom)

  const userPfp = useAtomValue(user2InfoPfpAtom)

  useEffect(() => {
    const messageList = document.getElementById('messageList')
    const scrollHeight = messageList!.scrollHeight
    const clientHeight = messageList!.clientHeight

    messageList!.scrollTop = scrollHeight - clientHeight
  }, [])
  return (
    <div>
      <div className="flex animate-fade flex-row items-center rounded-md p-1 animate-duration-300 xxs:gap-1 lg:gap-2">
        <Image
          width={0}
          height={0}
          src={
            fromID === friendID
              ? friendPfp!
              : userPfp
                ? userPfp
                : '/image/png/login.png'
          }
          alt="profile_picture"
          sizes="(min-width: 720px) 54px, (min-width: 420px) calc(11.43vw - 27px), (min-width: 340px) calc(11.67vw - 27px), calc(10vw - 22px)"
          className="size-8 flex-shrink-0 animate-fade rounded-full bg-gray-400 shadow-[0_0px_10px_1px_rgba(0,0,0,0.3)]"
        ></Image>
        <div className="flex flex-col items-start gap-[0.1rem]">
          <div className="flex flex-row items-center gap-2 rounded-md text-[0.8rem] text-[#ffffff8c]">
            {fromUsernameWithUsernameID}
            <div className="text-[0.5rem]">
              {`${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
            </div>
          </div>

          <div className="flex flex-row gap-2 break-all rounded-md bg-[#0000001b] px-2 py-1 text-[#ffffff9a]">
            {text}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Message
