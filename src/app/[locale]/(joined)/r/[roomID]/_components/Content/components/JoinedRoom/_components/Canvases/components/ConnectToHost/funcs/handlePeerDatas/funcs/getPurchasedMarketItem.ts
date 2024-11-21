import type { PurchasedMarketItem } from '@/types'
import { useCoins } from '@/zustand/store'
import { grayLog } from '@/utils'

export const getPurchasedMarketItem = (data: PurchasedMarketItem['data']) => {
    const { name, price, userID } = data

    useCoins.getState().decrease(userID, price)
    grayLog(`USER ${userID} PURCHASED ${name} FOR ${price} COINS`)
}