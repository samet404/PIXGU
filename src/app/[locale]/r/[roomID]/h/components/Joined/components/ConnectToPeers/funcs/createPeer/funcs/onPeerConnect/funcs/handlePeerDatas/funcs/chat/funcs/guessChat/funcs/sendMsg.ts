import { sendToAllPeers, sendToPeerWithID } from '@/utils'
import { useHostPlayersMsgs } from '@/zustand/store'

export const sendMsg = (msgID: number, msg: string, userID: string, similarity: number) => {
    if (similarity <= 0.6) sendToAllPeers(
        {

            event: 'guessChat',
            data: {
                from: userID,
                msgID,
                msg,
            },
        },
        { except: [userID,] },
    )

    sendToPeerWithID(userID, {
        event: `yourGuessChat`,
        data: {
            msgID,
            msg,
            similarity: similarity,
        },
    })

    useHostPlayersMsgs.getState().increaseGuessChatMsgCount(userID)
}