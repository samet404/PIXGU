import { Input } from './components/Input'
import { Messages } from './components/Messages'
import { Outfit } from 'next/font/google'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const Chat = () => {
  return (
    <div
      className={`${outfit.className} relative  flex w-[50%] animate-fade-down flex-col gap-2 rounded-lg p-2`}
    >
      <div className="flex flex-row items-center rounded-md border-b-2 border-b-white ">
        <Input />
      </div>
      <div className="flex h-full w-full grow flex-col gap-2 overflow-y-hidden py-1 pl-2 pr-1">
        <Messages />
      </div>
    </div>
  )
}
