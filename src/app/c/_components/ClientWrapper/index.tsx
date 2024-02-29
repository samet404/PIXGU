'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { useIfInıtSearchParamExits } from './hooks/useIfInıtSearchParamExits'
import { useIfInıtSearchParamNotExits } from './hooks/useIfInıtSearchParamNotExits'
import { getSearchParam } from '@/src/utils/getSearchParam'
import { api } from '@/src/trpc/react'
import { useSetAtom } from 'jotai'
import { user2InfoAtom } from '../../atoms'

type ClientWrapperProps = {
  children: ReactNode
}

const ClientWrapper = ({ children }: ClientWrapperProps) => {
  const searchParamU_LineToTag = useRef<string | undefined | null>(null)
  const session = api.user.getSession.useQuery()
  const setUser2Info = useSetAtom(user2InfoAtom)

  setUser2Info({
    pfp: session.data?.user.profilePicture,
  })

  useEffect(() => {
    searchParamU_LineToTag.current = getSearchParam('u')?.replace('-', '@')
  }, [])

  useIfInıtSearchParamNotExits()
  useIfInıtSearchParamExits(searchParamU_LineToTag.current)

  return children
}
export default ClientWrapper
