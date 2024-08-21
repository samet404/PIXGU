'use client'

import { WinnersChat } from './components/WinnersChat'
import { GuessChat } from './components/GuessChat'
import { Urbanist } from 'next/font/google'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: '700',
})

export const Chats = () => {
  return (
    <div className={`${urbanist.className} sticky top-0 flex h-[90vh] w-[25%]`}>
      <GuessChat />
      <WinnersChat />
    </div>
  )
}
