import Spinner from '@/components/Spinner'
import { clsxMerge } from '@/utils/clsxMerge'
import { usePlayersPing } from '@/zustand/store'

export const Ping = ({ userID }: Props) => {
  const ping = usePlayersPing(s => s.pings[userID])

  return (
    <div className={clsxMerge('text-white p-1  bg-[#ffffff1c] flex items-center rounded-full justify-center', {
      'py-1 px-2': ping,
      'text-green-400': ping && ping < 30,
      'text-yellow-400': ping && ping >= 30 && ping < 70,
      'text-red-400 animate-pulse animate-infinite': ping && ping >= 70,
    })}>
      {ping ? (ping).toFixed(1) + 'ms' : <Spinner className='drop-shadow-none size-7' />}
    </div>
  )
}

type Props = {
  userID: string
}