'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { useIfInıtSearchParamExits } from './hooks/useIfInıtSearchParamExits'
import { useIfInıtSearchParamNotExits } from './hooks/useIfInıtSearchParamNotExits'
import { getSearchParam } from '@/utils/getSearchParam'
import { api } from '@/trpc/react'
import { useSetAtom } from 'jotai'
import { user2InfoAtom } from '../../atoms'

type ClientWrapperProps = {
  children: ReactNode
}

const ClientWrapper = ({ children }: ClientWrapperProps) => {
  const searchParamU_LineToTag = useRef<string | undefined | null>(null)
  const user = api.auth.getUser.useQuery()
  const setUser2Info = useSetAtom(user2InfoAtom)

  setUser2Info({
    pfp: user.data?.profilePicture,
  })

  useEffect(() => {
    searchParamU_LineToTag.current = getSearchParam('u')?.replace('-', '@')
  }, [])

  useIfInıtSearchParamNotExits()
  useIfInıtSearchParamExits(searchParamU_LineToTag.current)

  return children
}
export default ClientWrapper
