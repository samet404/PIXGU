import type { RouterOutputs } from '@/trpc/shared'
import type { Unarray } from '@/types'
import Link from 'next/link'

export const Room = ({ ID, name, amIHost, isPublic, createdAt }: Props) => {
  return (
    <div className="flex flex-row gap-2 rounded-lg bg-gradient-to-tr from-[#ffffff40] via-[#ffffff17] to-[#ffffff40]  p-2">
      <div className="rounded-md bg-[#ffffff52] px-2 py-1 text-white">
        ID: {ID}
      </div>
      <div className="rounded-md bg-[#ffffff52] px-2 py-1 text-white">
        name: {name}
      </div>
      <div className="rounded-md bg-[#ffffff52] px-2 py-1 text-white">
        {amIHost ? 'You are also host' : 'You are player'}
      </div>

      <div className="rounded-md bg-[#ffffff52] px-2 py-1 text-white">
        {isPublic ? 'Public' : 'Private'}
      </div>
      <div className="rounded-md bg-[#ffffff52] px-2 py-1 text-white">
        date: {createdAt.toString()}
      </div>
    </div>
  )
}

type Props = Unarray<RouterOutputs['gameRoom']['killRoom']>
