'use client'

import { useAtomValue } from 'jotai'
import { isModalOpenAtom } from '../../atoms'
import dynamic from 'next/dynamic'
import { createPortal } from 'react-dom'

const Content = dynamic(() => import('./Content').then((m) => m.Content))

export const Modal = () => {
  const isOpen = useAtomValue(isModalOpenAtom)

  if (isOpen) return createPortal(isOpen && <Content />, document.body)
}
