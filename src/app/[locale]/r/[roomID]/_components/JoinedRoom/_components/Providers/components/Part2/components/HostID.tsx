import { HostIDCtx } from '@/context/client'
import type { PropsWithChildren } from 'react'

export const HostID = ({ hostID, children }: Props) => (
  <HostIDCtx.Provider value={hostID}>{children}</HostIDCtx.Provider>
)

type Props = {
  hostID: string
} & PropsWithChildren
