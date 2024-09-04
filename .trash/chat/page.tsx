import { faMessage, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Urbanist } from 'next/font/google'
import Image from 'next/image'
import sendImg from '@/png/icons8-send-30-black.png'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: '600',
})

const RoomChatTest = () => {
  return (
    <div className="w-full bg-white p-1">
      <div
        className={`${urbanist.className} flex h-80 w-full flex-row rounded-lg bg-gradient-to-r from-[#65D6C0] to-[rgb(255,229,135)]`}
      >
        <div className="flex w-[50%] flex-col gap-2 rounded-lg p-2">
          <div className="flex flex-row items-center justify-end"></div>
          <div className="flex flex-row items-center rounded-md bg-[#ffffff73]">
            <input
              spellCheck={false}
              type="text"
              className="w-full px-2 py-1 text-[#00000081]"
            />
            <button className="h-full rounded-r-md bg-[#ffffff84] px-2 py-1 shadow-[0_0px_10px_1px_rgba(0,0,0,0.1)]">
              <Image src={sendImg} alt="send" className="size-6 opacity-20" />
            </button>
          </div>
          <div className="flex h-full w-full grow flex-col gap-2 overflow-y-scroll rounded-md bg-[#ffffff4a] py-1 pl-2 pr-1">
            <div className="flex flex-row gap-[0.40rem]">
              <div className="pt-2">
                <div className="flex size-8 flex-shrink-0 rounded-full bg-white"></div>
              </div>
              <div className="flex w-[90%] flex-col gap-2">
                <div className="pt-2 text-[1.2rem] leading-3 text-white">
                  404
                </div>
                <div className="flex break-all rounded-md bg-gradient-to-r from-[#ffffff5f] to-transparent px-2 py-1 leading-5 text-[#0000006d]">
                  Lorem
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-[0.40rem]">
              <div className="pt-2">
                <div className="flex size-8 flex-shrink-0 rounded-full bg-white"></div>
              </div>
              <div className="flex w-[90%] flex-col gap-2">
                <div className="pt-2 text-[1.2rem] leading-3 text-white">
                  404
                </div>
                <div className="flex break-all rounded-md bg-gradient-to-r from-[#ffffff5f] to-transparent px-2 py-1 leading-5 text-[#0000006d]">
                  Lorem
                </div>
              </div>
            </div>
          </div>
          <div className="pt-1 text-[2rem] text-white">Guess Chat</div>
        </div>
        <div className="flex grow flex-col gap-2 rounded-xl bg-[#ffd90026] p-2 shadow-[0_0px_20px_20px_rgba(0,0,0,0.1)]">
          <div className="flex flex-row items-center rounded-md bg-[#ffffff73]">
            <input
              spellCheck={false}
              type="text"
              className="w-full px-2 py-1 text-[#00000081]"
            />
            <button className="h-full rounded-r-md bg-[#ffffff84] px-2 py-1 shadow-[0_0px_10px_1px_rgba(0,0,0,0.1)]">
              <Image src={sendImg} alt="send" className="size-6 opacity-20" />
            </button>
          </div>

          <div className="flex h-full w-full grow flex-col overflow-y-visible rounded-md bg-[#ffffff4a]"></div>
          <div className="pt-1 text-[2rem] text-white">Winners Chat</div>
        </div>
      </div>
    </div>
  )
}

export default RoomChatTest
