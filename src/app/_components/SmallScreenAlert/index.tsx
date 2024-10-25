'use client'

import { useAtom } from 'jotai'
import { isClosedAtom } from './atoms'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import dynamic from 'next/dynamic'
import type { PropsWithChildren } from 'react'

const Content = dynamic(() => import('./Content').then((m) => m.Content))

export const SmallScreenAlert = ({ children }: PropsWithChildren) => {
  const [isClosed, setIsClosed] = useAtom(isClosedAtom)

  useEffectOnce(() => {
    if (
      localStorage.getItem('small-screen-alert') !== 'false' &&
      window.innerWidth < 1024
    ) {
      setIsClosed(false)
    } else setIsClosed(null)
  })

  switch (isClosed) {
    case true:
      return children
    case null:
      return children
    case undefined:
      return null
    case false:
      return <Content />
  }
}
