import {
  user2InfoPfpAtom,
  userInfoIDAtom,
  userInfoPfpAtom,
} from '@/src/app/c/atoms'
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
  const date = new Date(time)
  const friendPfp = useAtomValue(userInfoPfpAtom)
  const friendID = useAtomValue(userInfoIDAtom)

  const userPfp = useAtomValue(user2InfoPfpAtom)

  useEffect(() => {
    const messageList = document.getElementById('messageList')
    const scrollHeight = messageList!.scrollHeight
    const clientHeight = messageList!.clientHeight

    messageList!.scrollTop = scrollHeight - clientHeight
  }, [])
  return (
    <div>
      <div className="flex animate-fade-up flex-row items-center gap-2 rounded-md p-1">
        <Image
          width={45}
          height={45}
          //@ts-expect-error
          src={fromID === friendID ? friendPfp : userPfp}
          alt="profile_picture"
          sizes="(min-width: 720px) 54px, (min-width: 420px) calc(11.43vw - 27px), (min-width: 340px) calc(11.67vw - 27px), calc(10vw - 22px)"
          className="animate-fade rounded-full bg-gray-400 shadow-[0_0px_10px_1px_rgba(0,0,0,0.3)]"
        ></Image>
        <div className="flex flex-col items-start gap-[0.1rem]">
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
    </div>
  )
}
export default Message
