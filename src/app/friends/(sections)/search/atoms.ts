import { type RouterOutputs } from '@/src/trpc/shared'
import { atom } from 'jotai'

type usersDataAtomType =
  | RouterOutputs['user']['getUserByUsernameWithUsernameID']
  | undefined
  | null

export const usersDataAtom = atom<usersDataAtomType>(null)

type inputValuesAtomType = {
  username: string
  usernameID: string
}

export const inputValuesAtom = atom<inputValuesAtomType>({
  username: '',
  usernameID: '',
})
