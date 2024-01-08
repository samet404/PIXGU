'use client'

import { useRouter } from 'next/navigation'
import { Fragment, useRef } from 'react'
import { useEventListener } from 'usehooks-ts'

const Shortcuts = () => {
  const router = useRouter()
  const documentRef = useRef<Document>(null)

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case '1':
        router.push('/join-room')
        break
      case '2':
        router.push('/create-room')
        break
      case '3':
        router.push('/article/how-to-play')
        break
      case '4':
        router.push('/login')
        break
    }
  }

  useEventListener('keydown', handleKeyDown, documentRef)

  return <Fragment></Fragment>
}

export default Shortcuts
