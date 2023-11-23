'use client'

import { useRouter } from 'next/navigation'
import { useEventListener } from 'usehooks-ts'
import Key from './components/Key'
import { useRef } from 'react'

const LeftSidebar = () => {
  const router = useRouter()
  const documentRef = useRef<Document>(null)

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key == '1') router.back()
  }

  useEventListener('keydown', handleKeyDown, documentRef)

  return (
    <div className="xxs:hidden lg:flex  h-full flex-col gap-3 p-5">
      <Key name="Home" keyName="1" />
      <Key name="Comments" keyName="2" />
    </div>
  )
}

export default LeftSidebar
