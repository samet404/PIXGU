import { POWERUP_PRICES } from '@/constants'
import { createMatch } from '@/helpers/room'
import type { Locale } from '@/types/locale'
import { arrsEqual } from '@/utils'
import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { sendToPeerWithID } from '@/utils/sendToPeerWithID'
import { useCoins, useGuessedPlayers, usePlayersWhoGaveUp, usePlayers, usePlayersPowerups, useWhoIsPainter } from '@/zustand/store'

export const giveUp = (userID: string, locale: Locale) => {
    if (
        !usePlayersPowerups.getState().users[userID]!.powerups!.giveUp!.isActive ||
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

        createMatch(locale)
        return
    }

    if (
        useGuessedPlayers.getState().isGuessed(userID) ||
        usePlayersWhoGaveUp.getState().isGaveUp(userID)
    ) return

    useGuessedPlayers.getState().guessed(userID)

    usePlayersWhoGaveUp.getState().add(userID)
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

    const usersWhoGaveUp = usePlayersWhoGaveUp.getState().users
    const users = usePlayers.getState().getPlayersIDs()

    if (arrsEqual(usersWhoGaveUp, users, true)) createMatch(locale)
}