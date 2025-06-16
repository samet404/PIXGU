import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { sendToPeerWithID } from '@/utils/sendToPeerWithID'
import { useCoins } from '@/zustand/store/useCoins'

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
        }, {
            except: [ID]
        })

        sendToPeerWithID(ID, {
            event: 'yourCoin',
            data: {
                amount: useCoins.getState().coins[ID]!
            }
        })
    })


}