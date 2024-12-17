import { Outfit } from 'next/font/google'
import { CloseBtn } from './components/CloseBtn'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['700'],
})

export const Content = () => {
  return (
    <div className={`${outfit.className} selection:!bg-[#ffff0073] absolute left-0 top-0 z-[80] flex justify-center items-center  h-full w-full animate-fade bg-[#ffff0069] backdrop-blur-md p-1`}>
      <CloseBtn />
      <div className='animate-fade w-[90%] leading-7 text-[1.4rem] text-white text-center drop-shadow-lg'>
        PIXGU is developing a new modding feature to let everyone safely contribute to the game. Our upcoming tools will make creating and sharing mods easy and optimized. Stay tuned!
      </div>
    </div>
  )
}
