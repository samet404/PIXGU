import { Urbanist } from 'next/font/google'
import { Content } from './components/Content'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['600', '700'],
})

export const PlayingRooms = () => {
  return (
    <div
      className={`${urbanist.className} flex w-full flex-col items-start gap-3 pt-6`}
    >
      <h1 className="text-[#bdf9e4]">Playing rooms</h1>
      <div className="flex flex-col gap-1">
        <Content />
      </div>
    </div>
  )
}
