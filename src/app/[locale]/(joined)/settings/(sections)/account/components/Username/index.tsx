'use client'

import { Inter } from 'next/font/google'
import Input from './components/Input'
import ChangeButton from './components/ChangeButton'

const inter = Inter({
  subsets: ['latin'],
  weight: ['500'],
})

const Username = ({ username }: { username: string }) => {
  console.log('Username rendered')

  return (
    <div className={`${inter.className} flex flex-col gap-1`}>
      <div className="flex flex-row gap-2">
        <Input username={username} />
        <ChangeButton />
      </div>
      <div className="text-sm text-[rgba(255,255,255,0.8)]">
        Username should min 1 and max 64 characters long.
      </div>
    </div>
  )
}

export default Username
