import type { GuessChatFromClient } from '@/types/webRTCConnData'
import {
  useCoins,
  useGuessedPlayers,
  useHostPainterData,
  useMatchStatus,
  useWhoIsPainter,
} from '@/zustand/store'
import { createMatch } from '../../../../createMatch'
import { mToMs, sendToAllPeers, sendToPeerWithID } from '@/utils'

export const guessChat = async (
  data: GuessChatFromClient['data'],
  userID: string,
  roomID: string,
) => {
  const painterData = useHostPainterData.getState().value
  if (painterData.status !== 'painterSelectedTheme') return

  console.log('guessChat', {
    theme: useMatchStatus.getState().value.matchInterval
      ? painterData.selectedTheme.toLocaleLowerCase()
      : null,
    msg: data.msg,
  })
  if (
    useMatchStatus.getState().value.matchInterval &&
    painterData.selectedTheme?.toLocaleLowerCase() ===
      data.msg.toLocaleLowerCase()
  ) {
    const { sendManyToAllPeers, sendManyToPeerWithID } = await import('@/utils')
    const whoIsPainter = useWhoIsPainter.getState().value
    if (whoIsPainter.status === 'thereIsNoPainter') return

    const painterID = whoIsPainter.painterID

    const guessingTimeLimitMinutes = 4
    const totalCoinBonus = guessingTimeLimitMinutes * 60
    const passedTime =
      useMatchStatus.getState().value.lastMatchStartedAt! - Date.now()
    const currentCoin = parseFloat(
      (totalCoinBonus - passedTime / 1000).toFixed(2),
    )

    sendManyToAllPeers([
      [
        {
          from: 'host',
          event: 'guessed',
          data: {
            ID: userID,
          },
        },
        {
          except: [userID],
        },
      ],
      [
        {
          from: 'host',
          event: 'coin',
          data: {
            to: userID,
            amount: currentCoin,
          },
        },
        {
          except: [userID],
        },
      ],
      [
        {
          from: 'host',
          event: 'coin',
          data: {
            to: painterID,
            amount: currentCoin,
          },
        },
        {
          except: [painterID],
        },
      ],
    ])

    sendManyToPeerWithID(userID, [
      {
        from: 'host',
        event: 'yourCoin',
        data: {
          amount: currentCoin,
        },
      },
      {
        from: 'host',
        event: 'youGuessed',
      },
    ])

    sendToPeerWithID(painterID, {
      from: 'host',
      event: 'yourCoin',
      data: {
        amount: currentCoin,
      },
    })

    useCoins.getState().add(userID, currentCoin)
    useCoins.getState().add(painterID, currentCoin)
    useGuessedPlayers.getState().guessed(userID)
    const isEveryoneGuessed = useGuessedPlayers.getState().isEveryoneGuessed()

    if (isEveryoneGuessed) {
      createMatch(roomID)
      useMatchStatus
        .getState()
        .newMatch(setInterval(() => createMatch(roomID), mToMs(4)))

      sendToAllPeers({
        from: 'host',
        event: 'everyoneGuessed',
      })
    }
  }
}
