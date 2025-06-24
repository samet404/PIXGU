import { useAtomValue } from 'jotai'
import dynamic from 'next/dynamic'
import type { PropsWithChildren } from 'react'
import { roomNeedsPassword } from '../../atoms'
import Spinner from '@/components/Spinner'

const Content = dynamic(() => import('./Content').then((m) => m.Content))

export const Password = ({ children }: PropsWithChildren) => {
  const isNeeded = useAtomValue(roomNeedsPassword)

  if (isNeeded == null)
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 font-[700] text-white">
        <div>Can you wait a second?</div>
        <Spinner />
      </div>
    )
  if (isNeeded) return <Content>{children}</Content>
  return children
}
