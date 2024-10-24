'use client'

import { useAtom } from 'jotai'
import { isClosedAtom } from './atoms'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import dynamic from 'next/dynamic'

const Content = dynamic(() => import('./Content').then((m) => m.Content))

export const SmallScreenAlert = () => {
  const [isClosed, setIsClosed] = useAtom(isClosedAtom)

  useEffectOnce(() => {
    if (
      localStorage.getItem('small-screen-alert') !== 'false' &&
      window.innerWidth < 1024
    )
      setIsClosed(false)
  })

  switch (isClosed) {
    case true:
      return null
    case null:
      return null
    case false:
      return <Content />
  }
}
