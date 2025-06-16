import type { Spectator } from '@/types/webRTCConnData'
import { useSpectators } from '@/zustand/store/useSpectators'

export const getSpectator = (data: Spectator['data']) =>
  useSpectators.getState().add(data.ID)
