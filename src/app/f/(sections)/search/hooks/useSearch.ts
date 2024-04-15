import { api } from '@/trpc/react'
import { useAtomValue, useSetAtom } from 'jotai'
import { inputValuesAtom, usersDataAtom } from '../atoms'
import { useEffect } from 'react'

export const useSearch = () => {
  const { username, usernameID } = useAtomValue(inputValuesAtom)
  const setUsersData = useSetAtom(usersDataAtom)

  const isUsernameIDEnabled = (() => {
    if (usernameID != '') return true
    return false
  })()

  const isUsernameEnabled = (() => {
    if (username != '') return true
    return false
  })()

  const isBothEnabled = (() => {
    if (usernameID != '' && username != '') return true

    return false
  })()

  const usersDataWithUsernameID = api.user.getByUsernameID.useQuery(
    usernameID,
    {
      enabled: isUsernameIDEnabled,
    },
  )

  const usersDataWithUsername = api.user.getByUsername.useQuery(username, {
    enabled: isUsernameEnabled,
  })

  const usersDataWithUsernameAndusernameID =
    api.user.getByUsernameWithUsernameID.useQuery(
      {
        username: username,
        usernameID: usernameID,
      },
      {
        enabled: isBothEnabled,
      },
    )

  useEffect(() => {
    if (isUsernameEnabled) setUsersData(usersDataWithUsername.data)
    if (isUsernameIDEnabled) setUsersData(usersDataWithUsernameID.data)
    if (isBothEnabled) setUsersData(usersDataWithUsernameAndusernameID.data)
  }, [
    isBothEnabled,
    isUsernameEnabled,
    isUsernameIDEnabled,
    setUsersData,
    usersDataWithUsername.data,
    usersDataWithUsernameAndusernameID.data,
    usersDataWithUsernameID.data,
  ])

  const isLoading = (() => {
    if (isUsernameEnabled) return usersDataWithUsername.isLoading
    if (isUsernameIDEnabled) return usersDataWithUsernameID.isLoading
    if (isBothEnabled) return usersDataWithUsernameAndusernameID.isLoading
    return false
  })()

  const error = (() => {
    if (isUsernameEnabled) return usersDataWithUsername.error
    if (isUsernameIDEnabled) return usersDataWithUsernameID.error
    if (isBothEnabled) return usersDataWithUsernameAndusernameID.error
    return null
  })()

  return { isLoading, error }
}
