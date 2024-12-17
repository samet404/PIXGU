import { Img } from './components/Img'
import { useCoins, useSpectators } from '@/zustand/store'
import { BlockBtn } from './components/BlockBtn'
import { MessagesBtn } from './components/MessagesBtn'
import { Messages } from './components/Messages'
import { Ping } from './components/Ping'
import { Svg } from '@/components/Svg'

export const Player = ({
  ID,
  usernameWithUsernameID,
  profilePicture,
}: Props) => {
  const isSpectator = useSpectators((s) => s.isSpectator(ID))
  const coin = useCoins((s) => s.get(ID))

  return (
    <div className="flex w-full animate-fade flex-col gap-1 relative rounded-l-full bg-gradient-to-r from-[#ffffff7c] to-[95%] to-transparent p-1 ">
      <div className="flex flex-row gap-2">
        <Img ID={ID} src={profilePicture} />
        <div className="flex grow flex-row items-center justify-between gap-4 pr-2">
          <div className="flex flex-col gap-1 leading-3 ">
            <div className="text-white">{usernameWithUsernameID}</div>
            <div className="text-[0.7rem] text-white">{ID}</div>
          </div>

          <div className="flex flex-row items-center gap-2 drop-shadow-[0_0px_2px_rgba(0,0,0,0.2)]">
            <Ping userID={ID} />
            <div className="flex items-center h-10 justify-center rounded-full bg-gradient-to-tr from-yellow-400 to-yellow-300 p-1 text-white ">
              <div className="drop-shadow-[0_0px_2px_rgba(0,0,0,0.7)]">
                {coin}
              </div>
            </div>
            {isSpectator && (
              <button className="rounded-full bg-[#ffffff] p-1 duration-300 hover:opacity-80">
                <Svg src='eye-svgrepo-com.svg' alt="spectator" className="h-full w-full opacity-50" />
              </button>
            )}

            <BlockBtn userID={ID} />
            <div className='relative'>
              <MessagesBtn userID={ID} />
              <Messages userID={ID} />

            </div>
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
