import { clsxMerge } from '@/utils/clsxMerge'
import { usePlayersPing } from '@/zustand/store'

export const Ping = ({ userID }: Props) => {
  const ping = usePlayersPing(s => s.pings[userID])

  if (ping) return (
    <div className={clsxMerge('text-white py-1 px-2  bg-[#ffffff1c] flex items-center rounded-full justify-center', {
      'text-green-400': ping && ping < 70,
      'text-red-400': ping && ping >= 70,

    })}>{ping.toFixed(1)}ms</div>
  )
}

type Props = {
  userID: string
}