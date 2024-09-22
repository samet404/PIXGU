import type { RouterInputs } from '@/trpc/shared'
import { atom } from 'jotai'

export const sortByAtom = atom<
  RouterInputs['gameRoom']['getActiveRoomsID']['sortBy']
>({
  type: 'distance',
  direction: 'asc',
})
