import { Outfit } from 'next/font/google'
import { Players } from './components/Players'
import { Marketplace } from './components/Marketplace'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['600'],
})

export const LeftButtons = () => {
  return (
    <div
      className={`${outfit.className} flex w-[25%] flex-col items-start gap-2`}
    >
      <Marketplace />
      <Players />
    </div>
  )
}
