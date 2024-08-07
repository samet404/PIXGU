import { Urbanist } from 'next/font/google'
import { GuessChat } from './components/GuessChat'
import { WinnersChat } from './components/WinnersChat'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: '700',
})

export const Chats = () => {
  return (
    <div className="w-full rounded-lg bg-white p-1">
      <div
        className={`${urbanist.className} flex h-80 w-full flex-row rounded-lg bg-gradient-to-r from-[#65D6C0] to-[rgb(255,229,135)]`}
      >
        <GuessChat />
        <WinnersChat />
      </div>
    </div>
  )
}
