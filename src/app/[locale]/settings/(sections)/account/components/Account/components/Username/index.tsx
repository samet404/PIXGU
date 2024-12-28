'use client'

import { Inter } from 'next/font/google'
import Input from './components/Input'
import { ChangeButton } from './components/ChangeButton'
import type { LangObj } from '../../lang'

const inter = Inter({
  subsets: ['latin'],
  weight: ['500'],
})

export const Username = ({ username, buttonText, changeDesc }: Props) => {
  return (
    <div className={`${inter.className} flex flex-col gap-1`}>
      <div className="flex flex-row gap-2">
        <Input username={username} />
        <ChangeButton {...buttonText} />
      </div>
      <div className="text-sm text-[rgba(255,255,255,0.8)]">
        {changeDesc}
      </div>
    </div>
  )
}

type Props = { username: string } & LangObj['username']