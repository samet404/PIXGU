import type { PrevCoins } from '@/types/webRTCConnData'
import { useCoins } from '@/zustand/store/useCoins'

export const getPrevCoins = (data: PrevCoins['data']) => {
  const entries = Object.entries(data)
  for (let i = 0; i < entries.length; i++) {
    const [ID, amount] = entries[i]!
    if (amount) useCoins.getState().add(ID, amount)
  }
}
