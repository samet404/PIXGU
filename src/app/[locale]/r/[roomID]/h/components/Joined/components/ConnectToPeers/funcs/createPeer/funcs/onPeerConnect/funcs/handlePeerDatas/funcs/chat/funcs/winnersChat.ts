import type { WinnersChatFromClient } from '@/types/webRTCConnData';
import { sendToAllPeers } from '@/utils/sendToAllPeers';
import { sendToPeerWithID } from '@/utils/sendToPeerWithID';
import { useGuessedPlayers, useHostPainterData } from '@/zustand/store';

export const winnersChat = (
    data: WinnersChatFromClient['data'],
    userID: string,
    msgID: number,
) => {
    if (useHostPainterData.getState().value.status !== 'painterSelectedTheme') return
    if (!useGuessedPlayers.getState().isGuessed(userID)) return

    sendToAllPeers(
        {

            event: 'winnersChat',
            data: {
                from: userID,
                msgID,
                msg: data.msg,
            },
        },
        { except: [userID] },
    )

    sendToPeerWithID(userID, {

        event: `yourWinnersChat`,
        data: {
            msgID,
            msg: data.msg,
        },
    })
}