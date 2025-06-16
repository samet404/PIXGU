import { clsxMerge } from '@/utils/clsxMerge'
import { usePlayers } from '@/zustand/store/usePlayers'

export const Player = ({ ID, myUserID, index, coin }: Props) => {
  const isMe = myUserID === ID
  const player = usePlayers((s) => s.getPlayer(ID))

  return (
    <div
      className={clsxMerge(
        'flex flex-row justify-between gap-2 border-b-[0.15rem] border-b-[#00000015] p-1 text-[#0000008c]',
        {
          'bg-[#ffffff2e]': isMe,
        },
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <div className="w-10 text-[1.7rem]">#{index + 1}</div>
        <div className="flex flex-row items-center gap-2">
          <div className="size-7 rounded-full bg-blue-200"></div>
          <div className="text-[1.2rem]">{isMe ? 'You' : player?.usernameWithUsernameID}</div>
        </div>
      </div>
      <div className="flex items-center justify-center rounded-full bg-yellow-300 p-1 font-[500]">
        {coin}
      </div>
    </div>
  )
}

type Props = {
  ID: string
  myUserID: string
  index: number
  coin: number
}
