'use client'

import { useAtomValue } from 'jotai'
import { usersDataAtom } from '../../atoms'
import { useSearch } from '../../hooks/useSearch'

const Users = () => {
  const usersData = useAtomValue(usersDataAtom)

  if (usersData?.length != 0) return <div className="text-white">{}</div>
}

export default Users
