'use client'

import { useRef } from 'react'
import BtnJoin from './components/BtnJoin'
import PassInput from './components/PassInput'
import { type User } from '@/app/room/[roomID]/_types'

const Content = ({ user, roomID }: Props) => {
  const passInputRef = useRef<HTMLInputElement>(null)

  return (
    <main className="flex flex-col gap-3">
      <PassInput ref={passInputRef} />
      <BtnJoin passInputRef={passInputRef} />
    </main>
  )
}

export default Content

type Props = {
  user: User
  roomID: string
}
