import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { sendToPeerWithID } from '@/utils/sendToPeerWithID'
import { useGuessedPlayers } from '@/zustand/store/useGuessedPlayers'
import { usePlayersPowerups } from '@/zustand/store/usePlayersPowerups'

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