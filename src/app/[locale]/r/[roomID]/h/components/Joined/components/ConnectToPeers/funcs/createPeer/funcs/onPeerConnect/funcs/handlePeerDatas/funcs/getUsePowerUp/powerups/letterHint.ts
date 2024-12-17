import { sendToPeerWithID, randomOneCharacterFromStr, sendToAllPeers } from '@/utils'
import { useHostPainterData, usePlayersOwnedPowerups, useWhoIsPainter } from '@/zustand/store'

export const letterHint = (userID: string) => {
    console.log('letterHint')
    const painterData = useHostPainterData.getState().value
    if (painterData.status !== 'painterSelectedTheme') {
        console.log('letterHint0')
        return
    }
    if (useWhoIsPainter.getState().isPainter(userID)) {
        console.log('letterHint1')
        return
    }

    const theme = painterData.selectedTheme.toLocaleLowerCase().trim()
    if (!theme) {
        console.log('letterHint2')
        return
    }

    const letterHintCount = usePlayersOwnedPowerups.getState().value[userID]?.letterHint
    if (!letterHintCount) return
    if (letterHintCount < 1) return

    usePlayersOwnedPowerups.getState().remove(userID, 'letterHint')
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