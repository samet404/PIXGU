import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { useCoins } from '@/zustand/store'

export const sendCoinInfo = (
    userIDs: string[],
) => {
    userIDs.forEach((ID) => {
        sendToAllPeers({
            event: 'coin',
            data: {
                to: ID,
                amount: useCoins.getState().coins[ID]!
            }
        })
    })
}