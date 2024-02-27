'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { useIfInıtSearchParamExits } from './hooks/useIfInıtSearchParamExits'
import { useIfInıtSearchParamNotExits } from './hooks/useIfInıtSearchParamNotExits'
import { getSearchParam } from '@/src/utils/getSearchParam'

type ClientWrapperProps = {
  children: ReactNode
}

const ClientWrapper = ({ children }: ClientWrapperProps) => {
  const searchParamU_LineToTag = useRef<string | undefined | null>(null)

  useEffect(() => {
    searchParamU_LineToTag.current = getSearchParam('u')?.replace('-', '@')
  }, [])

  useIfInıtSearchParamNotExits()
  useIfInıtSearchParamExits(searchParamU_LineToTag.current)

  return children
}
export default ClientWrapper
