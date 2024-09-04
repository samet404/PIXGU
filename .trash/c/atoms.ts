import { atom } from 'jotai'

export const selectedUserInfoAtom = atom<{
  ID: string
  name: string | undefined | null
  pfp: string | undefined | null
  isFriend: boolean | undefined | null
} | null>(null)

export const selectedUserInfoPfpAtom = atom<string | undefined | null>((get) => {
  if (get(selectedUserInfoAtom)?.isFriend) return get(selectedUserInfoAtom)?.pfp
})
export const selectedUserInfoNameAtom = atom<string | undefined | null>((get) => {
  if (get(selectedUserInfoAtom)?.isFriend) return get(selectedUserInfoAtom)?.name
})
export const selectedUserInfoIDAtom = atom<string | undefined>((get) => {
  if (get(selectedUserInfoAtom)?.isFriend) return get(selectedUserInfoAtom)?.ID
})
export const selectedUserInfoIsFriendAtom = atom<boolean | undefined | null>(
  (get) => get(selectedUserInfoAtom)?.isFriend,
)
export const isUserInfoBlurredAtom = atom<boolean | undefined | null>((get) => {
  if (!get(selectedUserInfoAtom)) return true
  if (!get(selectedUserInfoAtom)?.isFriend) return true
  return false
})

export const user2InfoAtom = atom<{
  pfp: string | undefined | null
} | null>(null)

export const user2InfoPfpAtom = atom<string | undefined | null>(
  (get) => get(user2InfoAtom)?.pfp,
)
