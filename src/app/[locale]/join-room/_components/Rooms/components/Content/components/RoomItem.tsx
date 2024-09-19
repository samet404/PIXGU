import Link from 'next/link'
import { createPortal } from 'react-dom'
export const RoomItem = ({ ID, name, isPublic }: Props) => {
  return (
    <Link
      href={`/r/${ID}`}
      className="flex w-full flex-row rounded-md bg-gradient-to-tr from-[#ffffff7e] via-[#ffffff40] to-[#ffffff7e] p-3 shadow-lg duration-300 hover:opacity-80"
    >
      <div className={` grid grid-flow-col gap-2`}>
        <div className="flex rounded-md bg-gradient-to-tr from-[#73d36e90] to-[#80e27bb1] px-2 py-1 text-[0.9rem] text-[rgba(255,255,255,0.8)] shadow-[0_0px_10px_1px_rgba(0,0,0,0.2)]">
          {name}
        </div>
        <div className="rounded-md bg-[#cb46a1b0] px-2 py-1 text-[0.8rem] text-[rgba(255,255,255,0.8)] shadow-[0_0px_10px_1px_rgba(0,0,0,0.2)]">
          {ID}
        </div>

        <div className="rounded-md bg-[#cb46a1b0] px-2 py-1 text-[0.8rem] text-[rgba(255,255,255,0.8)] shadow-[0_0px_10px_1px_rgba(0,0,0,0.2)]">
          Public: {isPublic ? 'Yes' : 'No'}
        </div>
      </div>
    </Link>
  )
}

type Props = {
  ID: string
  name: string | null
  isPublic: boolean
}
