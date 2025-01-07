import { sendToAllPeers, sendToPainterPeer, sToMs } from '@/utils'
import { postMsgToHostTimerWorker } from '@/workers'
import { useHostPainterData, usePlayers, usePlayersPowerups, useWhoIsPainter } from '@/zustand/store'
import type { Socket } from 'socket.io-client'

export const randomThemes = (io: Socket, roomID: string) => io.on('random-themes', (themes: [string, string]) => {
    const painterID = useWhoIsPainter.getState().value.painterID!

    useHostPainterData.getState().painterSelectingTheme(themes, roomID)
    postMsgToHostTimerWorker({
        ID: 'PAINTER_TIME_IS_UP',
        type: 'timeout',
        event: 'start',
        ms: sToMs(20),
    })

    sendToAllPeers(
        {
            event: 'painterSelectingTheme',
        },
        {
            except: [painterID],
        },
    )

    sendToPainterPeer({

        event: 'selectTheme',
        data: themes,
    })

    usePlayersPowerups.getState().setPainterCardsWhileThemeIsSelecting(painterID)
    usePlayers.getState().getPlayersIDs().forEach(ID => {
        if (ID === painterID) return
        usePlayersPowerups.getState().setGuessrCardsWhileThemeIsSelecting(ID)
    })
})