import { atom } from 'jotai'

export const hostingHealth = atom<Health>({
  isLoading: true,
  isSuccess: false,
  isErr: false,
  msg: 'Loading, please wait',
})

type Health = (
  | { isSuccess: true; isErr: false; isLoading: false }
  | { isErr: true; isSuccess: false; isLoading: false }
  | { isLoading: true; isSuccess: false; isErr: false }
) & {
  msg: string
}
