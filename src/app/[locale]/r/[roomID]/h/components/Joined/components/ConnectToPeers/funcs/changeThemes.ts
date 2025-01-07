import { sendToPainterPeer } from '@/utils'
import { useHostPainterData, usePlayersPowerups, useWhoIsPainter } from '@/zustand/store'
import type { Socket } from 'socket.io-client'

export const changeThemes = (io: Socket) =>
    io.on('change-themes', ({ themes, userID }: { userID: string, themes: [string, string] }) => {
        if (
            !useWhoIsPainter.getState().isPainter(userID) ||
            !usePlayersPowerups.getState().users[userID]!.powerups!.changeThemes!.isActive ||
            useHostPainterData.getState().value.status !== 'painterSelectingTheme'
        ) {
            console.log('changethemes io exit')
            return
        }

        sendToPainterPeer({
            event: 'selectTheme',
            data: themes,
        })

        return
    })
