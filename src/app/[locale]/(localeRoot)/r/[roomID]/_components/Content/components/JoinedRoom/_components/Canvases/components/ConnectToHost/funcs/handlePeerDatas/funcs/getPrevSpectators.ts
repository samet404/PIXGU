import { useSpectators } from '@/zustand/store'

export const getPrevSpectators = (data: string[]) =>
  data.forEach((ID) => useSpectators.getState().add(ID))
