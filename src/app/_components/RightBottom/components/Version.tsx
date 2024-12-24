import { VERSION } from '@/constants'
import { Outfit } from 'next/font/google'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['500'],
})

export const Version = () => {
  return (
    <div
      className={`${outfit.className} rounded-tl-md animate-fade bg-[#ffffff46] px-2 py-[0.15rem] text-[0.5rem] text-[#0000007c] backdrop-blur-lg hover:opacity-0`}
    >
      {VERSION}
    </div>
  )
}
