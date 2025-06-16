import { POWERUP_PRICES } from '@/constants'
import { fillOnePixel, sendCoinInfo } from '@/helpers/room'
import { getRandomNum, sendToAllPeers, sendToPeerWithID } from '@/utils'
import { useCoins } from '@/zustand/store/useCoins'
import { useGuessedPlayers } from '@/zustand/store/useGuessedPlayers'
import { useHostCanvasesData } from '@/zustand/store/useHostCanvasesData'
import { usePlayersPowerups } from '@/zustand/store/usePlayersPowerups'

const getRandomColorNum = () => getRandomNum(0, 255)
const getRandomCoords = () => getRandomNum(0, 80)

const createPixels = () => {
    const pixels: [
        Uint8ClampedArray,
        [x: number, y: number]
    ][] = []

    for (let i = 0; i < 5; i++) {
        pixels.push([
            new Uint8ClampedArray([getRandomColorNum(), getRandomColorNum(), getRandomColorNum(), 255]),
            [getRandomCoords(), getRandomCoords()]
        ])
    }

    return pixels
}

export const rainingColors = (userID: string) => {
    if (
        !useGuessedPlayers.getState().isGuessed(userID) ||
        !usePlayersPowerups.getState().users[userID]!.powerups!.rainingColors!.isActive ||
        useCoins.getState().coins[userID]! < POWERUP_PRICES.rainingColors
    ) return

    const { mctx, cellPixelLength } = useHostCanvasesData.getState()

    const data = createPixels()

    for (let i = 0; i < data.length; i++) {
        const [color, coors] = data[i]!
        fillOnePixel(mctx!, coors[0], coors[1], cellPixelLength!, color)
    }


    useCoins.getState().decrease(userID, POWERUP_PRICES.rainingColors)
    sendCoinInfo([userID])
    usePlayersPowerups.getState().setPowerupInActive(userID, 'rainingColors')


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