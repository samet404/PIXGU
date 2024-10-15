import Image from 'next/image'
import { Img } from './components/Img'
import { useCoins, useSpectators } from '@/zustand/store'
import blockImg from '@/svg/block-svgrepo-com.svg'
import MsgImg from '@/svg/message-2-svgrepo-com.svg'
import eye from '@/svg/eye-svgrepo-com.svg'

export const Player = ({
  ID,
  usernameWithUsernameID,
  profilePicture,
}: Props) => {
  const isSpectator = useSpectators((s) => s.isSpectator(ID))
  const coin = useCoins((s) => s.get(ID))

  return (
    <div className="flex w-full animate-fade flex-col gap-1 rounded-full bg-gradient-to-tr from-[#ffffff7c] to-[#ffffffbd] p-1 shadow-[0_0px_10px_1px_rgba(255,255,255,0.5)]">
      <div className="flex flex-row gap-2">
        <Img ID={ID} src={profilePicture} />
        <div className="flex grow flex-row items-center justify-between gap-4 pr-2">
          <div className="flex flex-col gap-1 leading-3 ">
            <div className="text-white">{usernameWithUsernameID}</div>
            <div className="text-[0.7rem] text-white">{ID}</div>
          </div>

          <div className="flex flex-row gap-2 drop-shadow-[0_0px_2px_rgba(0,0,0,0.2)]">
            <div className="flex items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 to-yellow-300 p-1 text-white ">
              <div className="drop-shadow-[0_0px_2px_rgba(0,0,0,0.55)]">
                {coin}
              </div>
            </div>
            {isSpectator && (
              <button className="rounded-full bg-[#ffffff] p-1 duration-300 hover:opacity-80">
                <Image src={eye} alt="eye" className="size-7 opacity-65" />
              </button>
            )}
            <div className="rounded-full bg-[#ffffffa7] p-1 duration-300">
              <Image src={eye} alt="eye" className="size-7 opacity-30" />
            </div>
            <button className="rounded-full bg-[#ff8a9f] p-1 duration-300 hover:opacity-80">
              <Image src={blockImg} alt="block" className="size-7 opacity-65" />
            </button>
            <button className="rounded-full bg-[#7f7f7f96] p-[0.30rem] duration-300 hover:opacity-80">
              <Image
                src={MsgImg}
                alt="messages"
                className="size-7 opacity-65"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

type Props = {
  ID: string
  usernameWithUsernameID: string
  profilePicture: string | null
}
