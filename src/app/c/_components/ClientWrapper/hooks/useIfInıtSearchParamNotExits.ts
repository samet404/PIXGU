import { useSetAtom } from 'jotai'
import { selectedUserInfoAtom } from '../../../atoms'
import { useEffect } from 'react'
import { api } from '@/src/trpc/react'
import { setSearchParam } from '@/utils/setSearchParam'
import { getSearchParam } from '@/utils/getSearchParam'

export const useIfInıtSearchParamNotExits = () => {
  const setSelectedUserInfo = useSetAtom(selectedUserInfoAtom)

  // get the first friend of the user
  const firstFriend = api.user.getFirstFriend.useQuery(undefined, {
    enabled: false,
  })
  // get the latest spoken user
  const latestSpokenUserID = api.chat.getLatestSpokenUser.useQuery(undefined, {
    enabled: false,
  })

  const getFriendByLatestSpokenUserID = api.user.getFriendByFriendID.useQuery(
    latestSpokenUserID.data as string | undefined | null,
    {
      enabled: false,
    },
  )

  useEffect(() => {
    // if user not specified user in the url

    if (!getSearchParam('u')) {
      // fetch latestSpokenUser
      if (!latestSpokenUserID.isFetched) latestSpokenUserID.refetch()

      // if latestSpokenUser searched and found then set the searchParam and selectedUserInfo to selectedUserInfoAtom
      if (latestSpokenUserID?.data) {
        if (!getFriendByLatestSpokenUserID.isFetched)
          getFriendByLatestSpokenUserID.refetch()

        if (getFriendByLatestSpokenUserID?.data) {
          const { id, usernameWithUsernameID, profilePicture } =
            getFriendByLatestSpokenUserID.data

          setSelectedUserInfo({
            ID: id,
            name: usernameWithUsernameID,
            pfp: profilePicture,
            isFriend: true,
          })

          setSearchParam('u', `${usernameWithUsernameID}`.replace('@', '-'))
        }
      }

      // if latestSpokenUser searched and not found
      if (latestSpokenUserID?.data === null) {
        // fetch the first friend of the user
        if (!firstFriend.isFetched) firstFriend.refetch()

        // if firstFriend searched and found then set the searchParam and selectedUserInfo to selectedUserInfoAtom
        if (firstFriend?.data) {
          const { id, usernameWithUsernameID, profilePicture } =
            firstFriend.data

          setSelectedUserInfo({
            ID: id,
            name: usernameWithUsernameID,
            pfp: profilePicture,
            isFriend: true,
          })

          setSearchParam('u', `${usernameWithUsernameID}`.replace('@', '-'))
        }

        // if firstFriend searched and not found
        if (!firstFriend?.data) setSelectedUserInfo(null)
      }
    }
  }, [
    firstFriend,
    getFriendByLatestSpokenUserID,
    latestSpokenUserID,
    setSelectedUserInfo,
  ])
}
