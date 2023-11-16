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
    <div className="w-[25rem] bg-[rgb(212,214,216)]">
      <div className="fixed flex w-full flex-col gap-5 p-5">
        <Key name="Home" keyName="1" />
        <Key name="Comments" keyName="2" />
      </div>
    </div>
  )
}

export default LeftSidebar
