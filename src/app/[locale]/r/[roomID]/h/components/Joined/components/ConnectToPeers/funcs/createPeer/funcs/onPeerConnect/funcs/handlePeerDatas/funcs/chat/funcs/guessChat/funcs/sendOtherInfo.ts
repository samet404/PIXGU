import { sendManyToAllPeers, sendManyToPeerWithID, sendToPeerWithID } from '@/utils'
import { useCoins } from '@/zustand/store/useCoins'

export const sendOtherInfo = (userID: string, currentCoin: number, painterID: string) => {
    useCoins.getState().add(userID, currentCoin)
    useCoins.getState().add(painterID, currentCoin)

    sendManyToAllPeers([
        [
            {

                event: 'guessed',
                data: {
                    ID: userID,
                },
            },
            {
                except: [userID],
            },
        ],
        [
            {

                event: 'coin',
                data: {
                    to: userID,
                    amount: useCoins.getState().coins[userID]!,
                },
            },
            {
                except: [userID],
            },
        ],
        [
            {

                event: 'coin',
                data: {
                    to: painterID,
                    amount: useCoins.getState().coins[painterID]!,
                },
            },
            {
                except: [painterID],
            },
        ],
    ])

    sendManyToPeerWithID(userID, [
        {

            event: 'yourCoin',
            data: {
                amount: useCoins.getState().coins[userID]!,
            },
        },
        {
            event: 'youGuessed',
        },
    ])

    sendToPeerWithID(painterID, {

        event: 'yourCoin',
        data: {
            amount: useCoins.getState().coins[painterID]!,
        },
    })
}