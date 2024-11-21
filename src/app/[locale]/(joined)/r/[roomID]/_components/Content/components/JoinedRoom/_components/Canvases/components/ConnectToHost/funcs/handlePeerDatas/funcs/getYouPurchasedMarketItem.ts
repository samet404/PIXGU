import type { YouPurchasedMarketItem } from '@/types/webRTCConnData';
import { useMyCoin, useOwnedPowerups } from '@/zustand/store';

export const getYouPurchasedMarketItem = (data: YouPurchasedMarketItem['data']) => {
    useOwnedPowerups.getState().add(data.name)
    useMyCoin.getState().minus(data.price)
}
