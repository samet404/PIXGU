'use client'

import { selectedUserInfoIDAtom } from '@/src/app/c/atoms'
import { useAtomValue } from 'jotai'
import { Fragment } from 'react'
import NewMessages from './components/NewMessages'
import PrevMessages from './components/PrevMessages'

const MessageList = () => {
  const selectedUserInfoID = useAtomValue(selectedUserInfoIDAtom)

  if (!selectedUserInfoID) return null
  return (
    <Fragment>
      <PrevMessages />
      <NewMessages />
    </Fragment>
  )
}

export default MessageList
