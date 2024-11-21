import type { WinnersChatFromClient } from '@/types/webRTCConnData';
import { sendToAllPeers } from '@/utils/sendToAllPeers';
import { sendToPeerWithID } from '@/utils/sendToPeerWithID';
import { strSimilarity } from '@/utils/strSimilarity';
import { useHostPainterData, useWhoIsPainter } from '@/zustand/store';

export const winnersChat = async (
    data: WinnersChatFromClient['data'],
    userID: string,
    msgID: number,
) => {
    const painterData = useHostPainterData.getState().value
    const whoIsPainter = useWhoIsPainter.getState().value
    if (painterData.status !== 'painterSelectedTheme') return

    const theme = painterData.selectedTheme.toLocaleLowerCase().trim()
    if (!theme) return
    const receivedTheme = data.msg.toLocaleLowerCase().trim()


    sendToAllPeers(
        {

            event: 'guessChat',
            data: {
                from: userID,
                msgID,
                msg: data.msg,
                similarity: strSimilarity(theme, receivedTheme),
            },
        },
        { except: [userID] },
    )

    sendToPeerWithID(userID, {

        event: `yourGuessChat`,
        data: {
            msgID,
            msg: data.msg,
            similarity: strSimilarity(theme, receivedTheme),
        },
    })
}