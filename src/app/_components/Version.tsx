import { Outfit } from 'next/font/google'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['500'],
})

export const Version = () => {
  return (
    <div
      className={`${outfit.className} pointer-events-none absolute bottom-0 rounded-tl-md right-0 z-[99] animate-fade bg-[#ffffff46] px-2 py-[0.15rem] text-[0.5rem] text-[#0000007c] backdrop-blur-lg hover:opacity-0`}
    >
      ALPHA 0.0.8
    </div>
  )
}
