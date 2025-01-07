import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { sendToPeerWithID } from '@/utils/sendToPeerWithID'
import { useGuessedPlayers, usePlayersPowerups } from '@/zustand/store'

export const zaWarudo = (userID: string) => {
    if (
        !useGuessedPlayers.getState().isGuessed(userID) ||
        !usePlayersPowerups.getState().users[userID]!.powerups!.zaWarudo!.isActive
    ) return

    usePlayersPowerups.getState().setPowerupInActive(userID, 'invisiblePencil')
    sendToAllPeers({
        event: 'powerupUsed',
        data: {
            name: 'zaWarudo',
            userID
        }
    }, {
        except: [userID]
    })

    sendToPeerWithID(userID, {
        event: 'youUsedPowerup',
        data: {
            name: 'zaWarudo'
        }
    })
}