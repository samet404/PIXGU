import type { BuyMarketItem } from '@/types/webRTCConnData';
import { sendToAllPeers, sendToPeerWithID } from '@/utils';
import { useCoins, useMarketplacePrices, usePlayersOwnedPowerups } from '@/zustand/store';

export const getBuyMarketItem = (data: BuyMarketItem['data'], userID: string) => {
    const userCoin = useCoins.getState().coins[userID]
    const itemPrice = useMarketplacePrices.getState().value[data.name]

    if (typeof itemPrice !== 'number') return
    if (!userCoin || userCoin < itemPrice) return

    useCoins.getState().decrease(userID, itemPrice)
    usePlayersOwnedPowerups.getState().add(userID, data.name)

    sendToPeerWithID(userID, {
        event: 'youPurchasedMarketItem',
        data: {
            name: data.name,
            price: itemPrice
        }
    })

    sendToAllPeers({
        event: 'purchasedMarketItem',
        data: {
            userID,
            name: data.name,
            price: itemPrice
        }
    }, {
        except: [userID]
    })

}