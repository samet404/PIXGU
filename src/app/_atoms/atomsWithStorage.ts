import { atomWithStorage } from 'jotai/utils'

export const musicAtom = atomWithStorage<boolean | null>('music', null)
