import { Outfit } from 'next/font/google'
import { Button } from './components/Button'
import { Players } from './components/Players'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['600'],
})

export const LeftButtons = () => {
  return (
    <div className={`${outfit.className} flex w-[10rem] flex-col gap-2`}>
      <Button text="Marketplace" />
      <Players />
    </div>
  )
}
