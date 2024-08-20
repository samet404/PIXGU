'use client'

import { WinnersChat } from './components/WinnersChat'
import { GuessChat } from './components/GuessChat'
import { Fragment } from 'react'

export const Chats = () => {
  return (
    <Fragment>
      <GuessChat />
      <WinnersChat />
    </Fragment>
  )
}
