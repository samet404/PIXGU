import { POWERUP_PRICES } from '@/constants'
import { sendCoinInfo } from '@/helpers/room'
import { getRandomNum, sendToAllPeers, sendToPeerWithID } from '@/utils'
import { useCoins, useGuessedPlayers, usePlayersPowerups } from '@/zustand/store'

const getRandomColorNum = () => getRandomNum(0, 255)
const getRandomCoords = () => getRandomNum(0, 80)

const createPixels = () => {
    const pixels: {
        color: Uint8ClampedArray
        x: number
        y: number
    }[] = []

    for (let i = 0; i < 5; i++) {
        pixels.push({
            color: new Uint8ClampedArray([getRandomColorNum(), getRandomColorNum(), getRandomColorNum(), 255]),
            x: getRandomCoords(),
            y: getRandomCoords()
        })
    }

    return pixels
}

export const rainingColors = (userID: string) => {
    if (
        !useGuessedPlayers.getState().isGuessed(userID) ||
        !usePlayersPowerups.getState().users[userID]?.powerups.colorChaos.isActive ||
        useCoins.getState().coins[userID]! < POWERUP_PRICES.rainingColors
    ) return

    useCoins.getState().decrease(userID, POWERUP_PRICES.rainingColors)
    sendCoinInfo([userID])
    usePlayersPowerups.getState().setPowerupInActive(userID, 'rainingColors')

    const data = createPixels()

    sendToAllPeers({
        event: 'powerupUsed',
        data: {
            name: 'rainingColors',
            userID,
            data
        }
    }, {
        except: [userID]
    })

    sendToPeerWithID(userID, {
        event: 'youUsedPowerup',
        data: {
            name: 'rainingColors',
            data
        }
    })
}