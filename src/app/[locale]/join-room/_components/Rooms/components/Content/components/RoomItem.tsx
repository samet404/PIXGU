import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({
  subsets: ['latin'],
  weight: ['500'],
})

type RoomItemProps = { name: string; id: string }

const RoomItem = ({ name, id }: RoomItemProps) => {
  return (
    <Link
      href={`/r/${id}`}
      className="flex w-full flex-row rounded-md bg-gradient-to-tr from-[#ffffff7e] via-[#ffffff40] to-[#ffffff7e] p-3 shadow-lg duration-300 hover:opacity-80"
    >
      <div className={`${inter.className} flex flex-col items-start gap-2`}>
        <div className="flex rounded-md bg-gradient-to-tr from-[#73d36e90] to-[#80e27bb1] px-2 py-1 text-[0.9rem] text-[rgba(255,255,255,0.8)] shadow-[0_0px_10px_1px_rgba(0,0,0,0.2)]">
          {name}
        </div>
        <div className="rounded-md bg-[#cb46a1b0] px-2 py-1 text-[0.8rem] text-[rgba(255,255,255,0.8)] shadow-[0_0px_10px_1px_rgba(0,0,0,0.2)]">
          {id}
        </div>
      </div>
    </Link>
  )
}

export default RoomItem
