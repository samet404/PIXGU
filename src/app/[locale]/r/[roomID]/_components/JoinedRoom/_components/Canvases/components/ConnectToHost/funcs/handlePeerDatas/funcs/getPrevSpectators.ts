import { useSpectators } from '@/zustand/store/useSpectators'

export const getPrevSpectators = (data: string[]) =>
  data.forEach((ID) => useSpectators.getState().add(ID))
