import Image from 'next/image'
import sendIcon from '@/png/icons8-send-24.png'
import ChatUserInfo from './_components/ChatUserInfo'
import { Fragment } from 'react'

const ChatSection = () => {
  return (
    <Fragment>
      <ChatUserInfo />
      <div className="flex grow flex-col gap-2 p-2">
        <div className="grow"></div>
        <div className="flex h-[2.5rem] flex-row rounded-lg bg-[#ffffff5e] shadow-[0_0px_10px_1px_rgba(0,0,0,0.2)]">
          <input type="text" className="grow p-2 text-[#0000009e]" />
          <button className="flex h-full w-[4rem] items-center justify-center rounded-r-lg bg-gradient-to-br from-[rgba(16,185,129,0.2)] to-emerald-300  duration-200 hover:shadow-[0_0px_30px_10px_rgba(5,252,170,0.3)]">
            <Image
              src={sendIcon}
              className="size-5 opacity-75"
              alt="send_icon"
            />
          </button>
        </div>
      </div>
    </Fragment>
  )
}
export default ChatSection
