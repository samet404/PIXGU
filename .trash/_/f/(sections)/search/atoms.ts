import { type RouterOutputs } from '@/trpc/shared'
import { atom } from 'jotai'

type User =
  | RouterOutputs['user']['getByUsernameWithUsernameID']
  | undefined
  | null

export const usersDataAtom = atom<User>(null)

type InputValuesAtomType = {
  username: string
  usernameID: string
}

export const inputValuesAtom = atom<InputValuesAtomType>({
  username: '',
  usernameID: '',
})
