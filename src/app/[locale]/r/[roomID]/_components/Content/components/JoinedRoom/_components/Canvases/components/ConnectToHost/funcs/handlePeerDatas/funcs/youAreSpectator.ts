import { useAmISpectator } from '@/zustand/store'

export const youAreSpectator = () => useAmISpectator.getState().iAmSpectator()
