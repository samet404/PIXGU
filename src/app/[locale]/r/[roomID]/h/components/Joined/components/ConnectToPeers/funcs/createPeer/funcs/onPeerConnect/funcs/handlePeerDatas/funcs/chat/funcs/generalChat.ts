import type { GeneralChatFromClient } from '@/types/webRTCConnData';
import { sendToAllPeers } from '@/utils/sendToAllPeers';
import { sendToPeerWithID } from '@/utils/sendToPeerWithID';
import { useGuessedPlayers, useHostPainterData, usePlayersWhoGaveUp, useWhoIsPainter } from '@/zustand/store';

export const generalChat = (
    data: GeneralChatFromClient['data'],
    userID: string,
    msgID: number,
) => {
    if (useHostPainterData.getState().value.status !== 'painterSelectedTheme') return
    const guessedPlayersCount = useGuessedPlayers.getState().playersIDs
    const gaveUpPlayersCount = usePlayersWhoGaveUp.getState().users

    if (useGuessedPlayers.getState().isGuessed(userID) || usePlayersWhoGaveUp.getState().isGaveUp(userID) || useWhoIsPainter.getState().isPainter(userID)) {
        sendToAllPeers(
            {

                event: 'generalChat',
                data: {
                    from: userID,
                    msgID,
                    msg: data.msg,
                },
            },
            { except: [userID, ...guessedPlayersCount, ...gaveUpPlayersCount] },
        )

        sendToPeerWithID(userID, {

            event: `yourGeneralChat`,
            data: {
                msgID,
                msg: data.msg,
            },
        })
    }
}