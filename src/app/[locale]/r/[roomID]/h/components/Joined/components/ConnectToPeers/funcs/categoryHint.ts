import { sendToAllPeers, sendToPeerWithID } from '@/utils'
import { useGuessedPlayers, useHostPainterData, usePlayersPowerups } from '@/zustand/store'
import type { Socket } from 'socket.io-client'

export const categoryHint = (io: Socket) =>
    io.on('category-hint', ({ category, userID }: { category: string, userID: string }) => {
        const painterData = useHostPainterData.getState().value
        console.log('category-hint', category, userID)
        if (
            useGuessedPlayers.getState().isGuessed(userID) ||
            !usePlayersPowerups.getState().users[userID]!.powerups!.categoryHint!.isActive ||
            painterData.status !== 'painterSelectedTheme'
        ) return



        usePlayersPowerups.getState().setPowerupInActive(userID, 'categoryHint')

        sendToPeerWithID(userID, {
            event: 'youUsedPowerup',
            data: {
                name: 'categoryHint',
                data: category
            }
        })

        sendToAllPeers({
            event: 'powerupUsed',
            data: {
                name: 'categoryHint',
                userID
            }
        }, {
            except: [userID]
        })

    })
