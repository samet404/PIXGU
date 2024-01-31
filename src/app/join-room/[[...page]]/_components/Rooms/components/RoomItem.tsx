import { Inter } from 'next/font/google'
import Link from 'next/link';
const inter = Inter({
  subsets: ['latin'],
  weight: ['500'],
})

type RoomItemProps = { name: string; id: string }

const RoomItem = ({ name, id }: RoomItemProps) => {
  return (
    <Link href={`/room/${id}`} className="flex w-full flex-row rounded-md bg-[#ffffff83] p-3 shadow-md duration-300 hover:opacity-60">
      <div className={`${inter.className} flex flex-col items-start gap-2`}>
        <div className="flex rounded-md   bg-[rgba(0,0,0,0.08)] px-2 py-1 text-[rgba(0,0,0,0.5)] shadow-md">
          {name}
        </div>
        <div className="text-xs text-[rgba(0,0,0,0.3)]">{id}</div>
      </div>
    </Link>
  )
}

export default RoomItem
