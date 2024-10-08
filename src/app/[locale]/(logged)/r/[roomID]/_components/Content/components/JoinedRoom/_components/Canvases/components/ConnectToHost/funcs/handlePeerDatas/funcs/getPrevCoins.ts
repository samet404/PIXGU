import type { PrevCoins } from '@/types/webRTCConnData'
import { useCoins } from '@/zustand/store'

export const getPrevCoins = (data: PrevCoins['data']) => {
  Object.keys(data).forEach((ID) => {
    const amount = data[ID]
    if (amount) useCoins.getState().add(ID, amount)
  })
}
