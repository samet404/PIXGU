import { api } from '@/src/trpc/react'
import { useAtomValue, useSetAtom } from 'jotai'
import { inputValuesAtom, usersDataAtom } from '../atoms'

export const useSearch = () => {
  console.log('useSearch')
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

  const usersDataWithUsernameID = api.user.getUserByUsernameID.useQuery(
    usernameID,
    {
      enabled: isUsernameIDEnabled,
    },
  )

  const usersDataWithUsername = api.user.getUserByUsername.useQuery(username, {
    enabled: isUsernameEnabled,
  })

  const usersDataWithUsernameAndusernameID =
    api.user.getUserByUsernameWithUsernameID.useQuery(
      {
        username: username,
        usernameID: usernameID,
      },
      {
        enabled: isBothEnabled,
      },
    )

  if (isUsernameEnabled) setUsersData(usersDataWithUsername.data)
  if (isUsernameIDEnabled) setUsersData (usersDataWithUsernameID.data)
  if (isBothEnabled) setUsersData(usersDataWithUsernameAndusernameID.data)
}