import { atom } from 'jotai'
import type { Player, Players } from './_types'
import type { Realtime } from 'ably'
import type Peer from 'peerjs'

type Rgba = {
  r: number
  g: number
  b: number
  a: number
}

export const canvasColorAtom = atom<Rgba>({
  r: 50,
  g: 0,
  b: 150,
  a: 0.2,
})

export const startedDrawAtom = atom<number>(0)

export const isGridOpenAtom = atom<boolean>(true)

export const canvasPenThicknessAtom = atom<number>(5)

export const roomIDAtom = atom<string | null>(null)

export const userAtom = atom<Player | null>(null)

export const myPeerAtom = atom<Peer | null>(null)

export const ablyClientAtom = atom<Realtime | null>(null)

export const playersAtom = atom<Players | null>(null)

export const setPlayerAtom = atom(null, (get, set, player: Player) => {
  const players = get(playersAtom) ?? []

  set(playersAtom, [...players, player])
})
