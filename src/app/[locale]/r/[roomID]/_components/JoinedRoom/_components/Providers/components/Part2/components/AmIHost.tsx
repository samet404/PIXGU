import { AmIHostCtx } from '@/context/client'
import type { PropsWithChildren } from 'react'

export const AmIHostProvider = ({ hostID, userID, children }: Props) => {
  const amIHost = hostID === userID

  return <AmIHostCtx.Provider value={amIHost}>{children}</AmIHostCtx.Provider>
}

type Props = {
  hostID: string
  userID: string
} & PropsWithChildren
