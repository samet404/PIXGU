'use client'

import { api } from '@/trpc/react'
import { useSetAtom } from 'jotai'
import dynamic from 'next/dynamic'
import { type ReactNode } from 'react'
import { userAtom } from '../atoms'
import { type Player } from '../_types'

const ErrDisplay = dynamic(() => import('@/components/ErrDisplay'))

const selectedUserInfoFields = {
  id: true,
  profilePicture: true,
  usernameWithUsernameID: true,
}

const GetUser = ({ children }: Props) => {
  const setUser = useSetAtom(userAtom)
  const { data, isSuccess, isLoading, isError, error } =
    api.auth.getUserBySelecting.useQuery(selectedUserInfoFields, {
      refetchOnWindowFocus: false,
    })

  if (isSuccess) setUser(data as Player)

  if (isSuccess && data) return children
  if (isError)
    <ErrDisplay msg="Failed to get user info" reason={error.message} />
  if (isLoading) return <div className="pt-7">Getting user info ...</div>
  return <div className="pt-7">Getting user info ...</div>
}

export default GetUser

type Props = {
  children: ReactNode
}
