import { atom } from 'jotai'
import type { PlayerDisplayData } from './types'

export const playersAtom = atom<PlayerDisplayData[]>([])

export const setPlayerAtom = atom(
  null,
  (get, set, player: PlayerDisplayData) => {
    const players = get(playersAtom)

    set(playersAtom, [...players, player])
  },
)
