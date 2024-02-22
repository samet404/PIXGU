import { atom } from 'jotai'

export const userInfoAtom = atom<{
  ID: string | undefined
  name: string | undefined
  pfp: string | undefined | null
} | null>(null)

export const userInfoPfpAtom = atom<string | undefined>(
  (get) => get(userInfoAtom)?.pfp,
)
export const userInfoNameAtom = atom<string | undefined>(
  (get) => get(userInfoAtom)?.name,
)
export const userInfoIDAtom = atom<string | undefined>(
  (get) => get(userInfoAtom)?.ID,
)
