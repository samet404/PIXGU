'use client'

import { api } from '@/trpc/react'
import { useState, type ReactNode } from 'react'
import dynamic from 'next/dynamic'

const ErrDisplay = dynamic(() => import('@/components/ErrDisplay'))

const selectedUserInfoFields = {
  id: true,
  profilePicture: true,
  usernameWithUsernameID: true,
}

const MeetOthers = ({ children }: Props) => {
  const {
    data: userInfo,
    isError: userInfoIsError,
    isSuccess: userInfoIsSuccess,
    error: userInfoError,
    isLoading: isUserInfoLoading,
  } = api.auth.getUserBySelecting.useQuery(selectedUserInfoFields)

  const [isSuccess, setIsSuccess] = useState<boolean | null>(null)

  if (isSuccess == null || isUserInfoLoading)
    return 'Meeting with other players >.< ...'

  return isSuccess && userInfoIsSuccess ? (
    children
  ) : (
    <ErrDisplay
      msg="Failed to meet with other players :( ..."
      reason={userInfoIsError ? userInfoError.message : 'UNKNOWN ERR'}
    />
  )
}

export default MeetOthers

type Props = {
  children: ReactNode
}
