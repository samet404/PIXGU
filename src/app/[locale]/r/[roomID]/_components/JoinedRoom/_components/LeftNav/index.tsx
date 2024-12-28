import { Outfit } from 'next/font/google'
import { Download } from './components/Download'
import { Powerups } from './components/Powerups'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['600'],
})

export const LeftNav = () => {
  return (
    <nav
      className={`${outfit.className} flex flex-row items-start gap-2 rounded-md bg-[#ffffff27] p-1`}
    >
      <Download />
      <Powerups />
    </nav>
  )
}
