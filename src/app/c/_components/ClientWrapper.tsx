'use client'

import { setSearchParam } from '@/utils/setSearchParam'
import { useEffect, type ReactNode } from 'react'
import { userInfoAtom } from '../atoms'
import { useSetAtom } from 'jotai'
import { api } from '@/src/trpc/react'
import { getSearchParam } from '@/utils/getSearchParam'

type ClientWrapperProps = {
  children: ReactNode
}

const ClientWrapper = ({ children }: ClientWrapperProps) => {
  const firstFriend = api.user.getFirstFriend.useQuery(undefined, {
    enabled: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  })

  const setUserInfo = useSetAtom(userInfoAtom)

  useEffect(() => {
    const queryParamU = getSearchParam('u')
    if (queryParamU) {
      console.log('queryParamU:', queryParamU)
    }
    if (!queryParamU) firstFriend.refetch()

    if (firstFriend?.data?.usernameWithUsernameID) {
      setSearchParam(
        'u',
        firstFriend.data?.usernameWithUsernameID.replace('@', '-'),
      )

      setUserInfo({
        ID: firstFriend?.data?.id,
        name: firstFriend?.data?.usernameWithUsernameID,
        pfp: firstFriend?.data?.profilePicture,
      })
    }
  }, [firstFriend, setUserInfo])

  return children
}
export default ClientWrapper
