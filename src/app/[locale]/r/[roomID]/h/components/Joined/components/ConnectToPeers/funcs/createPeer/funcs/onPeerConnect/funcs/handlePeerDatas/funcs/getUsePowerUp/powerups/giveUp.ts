import { POWERUP_PRICES } from '@/constants'
import { createMatch } from '@/helpers/room'
import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { sendToPeerWithID } from '@/utils/sendToPeerWithID'
import { useCoins, useGuessedPlayers, useGuessersWhoGaveUp, usePlayersPowerups, useWhoIsPainter } from '@/zustand/store'

export const giveUp = (userID: string, roomID: string) => {
    if (
        !usePlayersPowerups.getState().users[userID]?.powerups.giveUp.isActive ||
        useCoins.getState().coins[userID]! < POWERUP_PRICES.giveUp
    ) return

    const isPainter = useWhoIsPainter.getState().isPainter(userID)

    if (isPainter) {
        if (useGuessedPlayers.getState().playersIDs.length !== 0) return

        usePlayersPowerups.getState().setPowerupInActive(userID, 'giveUp')
        sendToAllPeers({
            event: 'powerupUsed',
            data: {
                name: 'giveUp',
                userID
            }
        }, {
            except: [userID]
        })

        sendToPeerWithID(userID, {
            event: 'youUsedPowerup',
            data: {
                name: 'giveUp'
            }
        })

        createMatch(roomID)
        return
    }

    if (useGuessedPlayers.getState().isGuessed(userID)) return
    if (useGuessersWhoGaveUp.getState().isGaveUp(userID)) return

    useGuessersWhoGaveUp.getState().add(userID)
    usePlayersPowerups.getState().setPowerupInActive(userID, 'giveUp')

    sendToAllPeers({
        event: 'powerupUsed',
        data: {
            name: 'giveUp',
            userID
        }
    }, {
        except: [userID]
    })

    sendToPeerWithID(userID, {
        event: 'youUsedPowerup',
        data: {
            name: 'giveUp'
        }
    })
}