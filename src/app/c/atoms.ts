import { atom } from 'jotai'

export const userInfoAtom = atom<{
  ID: string
  name: string | undefined | null
  pfp: string | undefined | null
  isFriend: boolean | undefined | null
} | null>(null)

export const userInfoPfpAtom = atom<string | undefined | null>((get) => {
  if (get(userInfoAtom)?.isFriend) return get(userInfoAtom)?.pfp
})
export const userInfoNameAtom = atom<string | undefined | null>((get) => {
  if (get(userInfoAtom)?.isFriend) return get(userInfoAtom)?.name
})
export const userInfoIDAtom = atom<string | undefined>((get) => {
  if (get(userInfoAtom)?.isFriend) return get(userInfoAtom)?.ID
})
export const userInfoIsFriendAtom = atom<boolean | undefined | null>(
  (get) => get(userInfoAtom)?.isFriend,
)
export const isUserInfoBlurredAtom = atom<boolean | undefined | null>((get) => {
  if (!get(userInfoAtom)) return true
  if (!get(userInfoAtom)?.isFriend) return true
  return false
})

export const user2InfoAtom = atom<{
  pfp: string | undefined | null
} | null>(null)

export const user2InfoPfpAtom = atom<string | undefined | null>(
  (get) => get(user2InfoAtom)?.pfp,
)
