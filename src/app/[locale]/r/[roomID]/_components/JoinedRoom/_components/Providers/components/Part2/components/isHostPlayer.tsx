import { IsHostPlayerCtx } from '@/context/client'
import type { PropsWithChildren } from 'react'

export const IsHostPlayer = ({ isHostPlayer, children }: Props) => (
  <IsHostPlayerCtx.Provider value={isHostPlayer}>
    {children}
  </IsHostPlayerCtx.Provider>
)

type Props = {
  isHostPlayer: boolean
} & PropsWithChildren
