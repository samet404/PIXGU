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

export const removePlayerAtom = atom(null, (get, set, playerID: string) => {
  const players = get(playersAtom)

  set(
    playersAtom,
    players.filter((player) => player.ID !== playerID),
  )
})

export const deleteAllPlayersAtom = atom(null, (get, set) => {
  set(playersAtom, [])
})
