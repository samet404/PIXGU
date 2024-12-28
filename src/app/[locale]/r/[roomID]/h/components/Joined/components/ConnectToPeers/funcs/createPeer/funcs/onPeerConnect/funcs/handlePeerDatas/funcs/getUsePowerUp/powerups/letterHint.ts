
import { POWERUP_PRICES } from '@/constants'
import { sendCoinInfo } from '@/helpers/room'
import { sendToPeerWithID, randomOneCharacterFromStr, sendToAllPeers } from '@/utils'
import { useCoins, useHostPainterData, usePlayersPowerups, useWhoIsPainter } from '@/zustand/store'

export const letterHint = (userID: string) => {
    const painterData = useHostPainterData.getState().value
    if (
        useWhoIsPainter.getState().isPainter(userID) ||
        painterData.status !== 'painterSelectedTheme' ||
        useCoins.getState().coins[userID]! < POWERUP_PRICES.letterHint
    ) return


    const theme = painterData.selectedTheme.toLocaleLowerCase().trim()
    if (!theme) return
    if (!usePlayersPowerups.getState().users[userID]?.powerups.letterHint.isActive) return

    useCoins.getState().decrease(userID, POWERUP_PRICES.letterHint)
    sendCoinInfo([userID])

    usePlayersPowerups.getState().setPowerupInActive(userID, 'letterHint')
    sendToPeerWithID(userID, {
        event: 'youUsedPowerup',
        data: {
            name: 'letterHint',
            data: randomOneCharacterFromStr(theme)
        }
    })
    sendToAllPeers({
        event: 'powerupUsed',
        data: {
            name: 'letterHint',
            userID
        }
    }, {
        except: [userID]
    })

}