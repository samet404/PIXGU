'use client'

import { useRef } from 'react'
import BtnJoin from './components/BtnJoin'
import PassInput from './components/PassInput'

const Content = () => {
  const passInputRef = useRef<HTMLInputElement>(null)

  return (
    <main className="flex flex-col items-center gap-3">
      <PassInput ref={passInputRef} />
      <BtnJoin passInputRef={passInputRef} />
    </main>
  )
}

export default Content
