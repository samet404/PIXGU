import { atom } from 'jotai'
import type { Realtime } from 'ably'

export const ablyClientAtom = atom<Realtime | null>(null)
