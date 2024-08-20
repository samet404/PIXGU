import { Chat } from './components/Chat'
import { Amatic_SC } from 'next/font/google'

const outfit = Amatic_SC({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const Content = () => {
  return (
    <div
      className={`${outfit.className} absolute z-20 flex h-full w-full animate-fade flex-col items-center gap-2 bg-gradient-to-tr from-[#000000] to-[#212121] pt-2 font-[700] backdrop-blur-md`}
    >
      <div className="flex flex-col items-center gap-1">
        <div className="text-[3rem] text-[#ffffffa7]">WELCOME TO DARK ZONE</div>
        <div className="text-[1.5rem] text-[#ffffffa7]">
          {
            " The impenetrable darkness of the black zone swallowed any light that dared to enter. You can't see anyone"
          }
        </div>

        <Chat />
      </div>
    </div>
  )
}
