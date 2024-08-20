'use client'

import { useSetAtom } from 'jotai'
import { isPlayersOpenAtom } from '../../PlayersSection/atoms'
import { Button } from './Button'

export const Players = () => {
  const setIsPlayersOpen = useSetAtom(isPlayersOpenAtom)
  return <Button text="Players" onClick={() => setIsPlayersOpen(true)} />
}
