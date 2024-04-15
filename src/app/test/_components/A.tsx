'use client'

import { useSetAtom } from 'jotai'
import { useInterval } from 'usehooks-ts'
import { setSearchParamColorAtom } from '../atoms'
import { useRef } from 'react'
import { api } from '@/trpc/react'

const A = () => {
  const firstFriendByName =
    api.user.getFirstFriendByUsernameWithUsernameID.useQuery('', {
      enabled: true,
    })

  console.log('A rendered')
  const count = useRef(0)
  const setSearchParamColor = useSetAtom(setSearchParamColorAtom)

  useInterval(() => {
    console.log(console.log(firstFriendByName.data))
    setSearchParamColor(count.current.toString())
    count.current++
  }, 1000)

  return <div>{}</div>
}
export default A
